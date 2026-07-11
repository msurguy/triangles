export type RendererName = 'auto' | 'canvas' | 'webgl' | 'svg';
export type ActiveRendererName = Exclude<RendererName, 'auto'>;

export interface TrianglesLight {
  ambient: string;
  diffuse: string;
  x: number;
  y: number;
  z: number;
}

export interface TrianglesOptions {
  seed?: string | number;
  renderer?: RendererName;
  density?: number;
  depth?: number;
  meshAmbient?: string;
  meshDiffuse?: string;
  lights?: TrianglesLight[];
  pixelRatio?: number;
  maxPixelRatio?: number;
  animate?: boolean;
  pointer?: boolean;
}

export interface ExportOptions {
  width: number;
  height: number;
  type?: string;
  quality?: number;
}

export interface TrianglesSnapshot {
  seed: string | number;
  options: TrianglesOptions;
}
