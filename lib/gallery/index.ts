import type {
  Photo,
  LayoutTree,
  LayoutNode,
  Split,
  RenderResult,
  PixelRect,
  AspectRatio,
} from "./types";

const MIN_TILE_SHORT_EDGE = 400;

const RATIO_VALUES: Record<AspectRatio, number> = {
  portrait: 2 / 3,    // w/h = 2:3 → w < h, short edge = w
  landscape: 3 / 2,   // w/h = 3:2 → w > h, short edge = h
  square: 1,
};

// Returns the effective aspect ratio (w/h) of a subtree,
// treating a vertical split as widths-added and a horizontal split as heights-added.
// Gutters are ignored in this computation (they are applied at pixel level in render()).
function effectiveRatio(node: LayoutNode): number {
  if (node.kind === "leaf") return RATIO_VALUES[node.ratio];
  const r1 = effectiveRatio(node.first);
  const r2 = effectiveRatio(node.second);
  if (node.direction === "vertical") {
    // Both children share the same height; their widths add.
    // r_combined = (w1 + w2) / h = r1 + r2
    return r1 + r2;
  }
  // Horizontal: both children share the same width; their heights add.
  // r_combined = w / (h1 + h2) = w / (w/r1 + w/r2) = r1*r2 / (r1 + r2)
  return (r1 * r2) / (r1 + r2);
}

// Recursively builds the layout tree.
// availableWidth tracks the pixel width of this region so vertical splits can be
// vetoed after computing the actual proportion (not just the 50/50 estimate).
function buildNode(
  photos: readonly Photo[],
  depth: number,
  viewportWidth: number,
  availableWidth: number,
): LayoutNode {
  if (photos.length === 1) {
    return { kind: "leaf", photoId: photos[0].id, ratio: photos[0].ratio };
  }

  const a = Math.floor(photos.length / 2);
  const firstPhotos = photos.slice(0, a);
  const secondPhotos = photos.slice(a);

  // Whether a vertical split is a candidate at this depth/viewport.
  const candidateVertical = viewportWidth >= 600 && depth % 2 === 1;

  // Build children with a conservative width estimate. If the candidate direction
  // ends up rejected below, children received a slightly narrow estimate — this
  // causes them to be more conservative about their own vertical splits, which
  // is acceptable over-enforcement rather than under-enforcement.
  const estimatedChildWidth = candidateVertical
    ? availableWidth / 2
    : availableWidth;

  const first = buildNode(firstPhotos, depth + 1, viewportWidth, estimatedChildWidth);
  const second = buildNode(secondPhotos, depth + 1, viewportWidth, estimatedChildWidth);

  const r1 = effectiveRatio(first);
  const r2 = effectiveRatio(second);

  // Compute the proportion for each candidate direction.
  // Vertical: p = r1/(r1+r2)  → first child gets fraction p of the width.
  // Horizontal: p = r2/(r1+r2) → first child gets fraction p of the height.
  const verticalP = r1 / (r1 + r2);
  const horizontalP = r2 / (r1 + r2);

  // Accept vertical only if BOTH actual child widths exceed the minimum.
  // Using availableWidth * verticalP (not the /2 estimate) is the key fix:
  // a portrait tile next to many landscapes might get only ~30% of the width.
  const verticalOk =
    candidateVertical &&
    availableWidth * verticalP >= MIN_TILE_SHORT_EDGE &&
    availableWidth * (1 - verticalP) >= MIN_TILE_SHORT_EDGE;

  const direction: Split["direction"] = verticalOk ? "vertical" : "horizontal";
  const proportion = verticalOk ? verticalP : horizontalP;

  return { kind: "split", direction, proportion, first, second };
}

export function generate(photos: Photo[], viewportWidth: number): LayoutTree {
  if (photos.length === 0) {
    throw new Error("generate() requires at least one photo");
  }
  // Rough minimum-size sanity check: on a vertical split, each photo needs at
  // least MIN_TILE_SHORT_EDGE px. For portrait photos on a narrow viewport this
  // is the binding constraint. We warn rather than throw so the caller can decide.
  const roughMinWidth = MIN_TILE_SHORT_EDGE;
  if (viewportWidth < roughMinWidth) {
    console.warn(
      `generate(): viewportWidth ${viewportWidth}px is below the minimum tile size (${roughMinWidth}px). Layout may violate the minimum-size constraint.`
    );
  }
  const root = buildNode(photos, 0, viewportWidth, viewportWidth);
  return { root, totalPhotos: photos.length };
}

// Walks the tree DFS (first before second) and assigns consecutive indices.
// This matches the original photos array order because buildNode() always puts
// photos[0..a-1] in first and photos[a..n-1] in second.
function buildPhotoIndexMap(root: LayoutNode): Map<string, number> {
  const map = new Map<string, number>();
  let i = 0;
  function walk(node: LayoutNode): void {
    if (node.kind === "leaf") {
      map.set(node.photoId, i++);
      return;
    }
    walk(node.first);
    walk(node.second);
  }
  walk(root);
  return map;
}

// Height is passed top-down so every split is exact — no mismatch accumulation.
function renderNode(
  node: LayoutNode,
  x: number,
  y: number,
  w: number,
  h: number,
  gutter: number,
  rects: PixelRect[],
  photoIndexMap: Map<string, number>
): void {
  if (node.kind === "leaf") {
    const index = photoIndexMap.get(node.photoId);
    if (index === undefined) {
      throw new Error(`renderNode: unknown photoId "${node.photoId}"`);
    }
    rects[index] = { photoId: node.photoId, x, y, w, h };
    return;
  }

  if (node.direction === "vertical") {
    // Both children share the same height h; widths are split by proportion.
    const w1 = Math.round(w * node.proportion - gutter / 2);
    const w2 = w - w1 - gutter; // exact — no rounding accumulation
    renderNode(node.first, x, y, w1, h, gutter, rects, photoIndexMap);
    renderNode(node.second, x + w1 + gutter, y, w2, h, gutter, rects, photoIndexMap);
  } else {
    // Both children share the same width w; heights are split by proportion.
    const h1 = Math.round(h * node.proportion - gutter / 2);
    const h2 = h - h1 - gutter; // exact
    renderNode(node.first, x, y, w, h1, gutter, rects, photoIndexMap);
    renderNode(node.second, x, y + h1 + gutter, w, h2, gutter, rects, photoIndexMap);
  }
}

export function render(
  tree: LayoutTree,
  containerWidth: number,
  gutter = 8
): RenderResult {
  // Total height derived once from the root's effective ratio, then passed top-down.
  // This ensures every split is pixel-exact — no sub-pixel mismatches between siblings.
  const containerHeight = Math.round(containerWidth / effectiveRatio(tree.root));
  const photoIndexMap = buildPhotoIndexMap(tree.root);
  const rects: PixelRect[] = new Array(tree.totalPhotos);
  renderNode(tree.root, 0, 0, containerWidth, containerHeight, gutter, rects, photoIndexMap);
  return { rects, containerHeight };
}
