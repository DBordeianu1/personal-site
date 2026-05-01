export type AspectRatio = "portrait" | "landscape" | "square";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  ratio: AspectRatio;
  squareCropAvailable?: boolean;
};

export type PixelRect = {
  photoId: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Leaf = {
  kind: "leaf";
  photoId: string;
  ratio: AspectRatio;
};

export type Split = {
  kind: "split";
  direction: "horizontal" | "vertical";
  // 0 < proportion < 1; first child gets this fraction of the region's split axis
  proportion: number;
  first: LayoutNode;
  second: LayoutNode;
};

export type LayoutNode = Leaf | Split;

export type LayoutTree = {
  root: LayoutNode;
  totalPhotos: number;
};

export type RenderResult = {
  rects: PixelRect[];      // parallel to the photos array passed to generate()
  containerHeight: number; // total height of the root region, in pixels
};
