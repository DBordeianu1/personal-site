import type {
  Photo,
  LayoutTree,
  LayoutNode,
  Split,
  RenderResult,
  PixelRect,
  AspectRatio,
} from "./types";

const MIN_TILE_SHORT_EDGE = 200;

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
// depth drives the direction alternation; photos is the slice for this subtree.
function buildNode(
  photos: readonly Photo[],
  depth: number,
  viewportWidth: number
): LayoutNode {
  if (photos.length === 1) {
    return { kind: "leaf", photoId: photos[0].id, ratio: photos[0].ratio };
  }

  const a = Math.floor(photos.length / 2);
  const firstPhotos = photos.slice(0, a);
  const secondPhotos = photos.slice(a);

  // Narrow viewports always stack vertically (horizontal splits).
  // Wide viewports alternate: even depth → vertical (side-by-side), odd → horizontal (stacked).
  const direction: Split["direction"] =
    viewportWidth < 600 || depth % 2 === 1 ? "horizontal" : "vertical";

  const first = buildNode(firstPhotos, depth + 1, viewportWidth);
  const second = buildNode(secondPhotos, depth + 1, viewportWidth);

  const r1 = effectiveRatio(first);
  const r2 = effectiveRatio(second);

  // Choose proportion so both children have equal dimension along the shared axis.
  // Vertical split: both share the same height h.
  //   w1 = h * r1, w2 = h * r2 → p = w1/(w1+w2) = r1/(r1+r2)
  // Horizontal split: both share the same width w.
  //   h1 = w/r1, h2 = w/r2 → p = h1/(h1+h2) = (1/r1)/(1/r1+1/r2) = r2/(r1+r2)
  const proportion =
    direction === "vertical" ? r1 / (r1 + r2) : r2 / (r1 + r2);

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
  const root = buildNode(photos, 0, viewportWidth);
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

function renderNode(
  node: LayoutNode,
  x: number,
  y: number,
  w: number,
  gutter: number,
  rects: PixelRect[],
  photoIndexMap: Map<string, number>
): number /* returns height of this region */ {
  if (node.kind === "leaf") {
    const h = w / RATIO_VALUES[node.ratio];
    const index = photoIndexMap.get(node.photoId);
    if (index === undefined) {
      throw new Error(`renderNode: unknown photoId "${node.photoId}"`);
    }
    rects[index] = { photoId: node.photoId, x, y, w, h };
    return h;
  }

  if (node.direction === "vertical") {
    // Subtract half the gutter from each side of the shared edge.
    const w1 = Math.round(w * node.proportion - gutter / 2);
    const w2 = w - w1 - gutter; // exact — avoids rounding accumulation
    const x2 = x + w1 + gutter;
    const h1 = renderNode(node.first, x, y, w1, gutter, rects, photoIndexMap);
    const h2 = renderNode(node.second, x2, y, w2, gutter, rects, photoIndexMap);
    // With gutter, the two heights won't be exactly equal; take the max.
    return Math.max(h1, h2);
  }

  // Horizontal split: first is on top, second is below.
  const h1 = renderNode(node.first, x, y, w, gutter, rects, photoIndexMap);
  const y2 = y + h1 + gutter;
  const h2 = renderNode(node.second, x, y2, w, gutter, rects, photoIndexMap);
  return h1 + gutter + h2;
}

export function render(
  tree: LayoutTree,
  containerWidth: number,
  gutter = 8
): RenderResult {
  const photoIndexMap = buildPhotoIndexMap(tree.root);
  const rects: PixelRect[] = new Array(tree.totalPhotos);
  const containerHeight = renderNode(
    tree.root,
    0,
    0,
    containerWidth,
    gutter,
    rects,
    photoIndexMap
  );
  return { rects, containerHeight };
}
