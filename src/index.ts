import { triangulate } from './delaunay';
import { createSeededRandom } from './prng';
import type { ActiveRendererName, ExportOptions, RendererName, TrianglesLight, TrianglesOptions, TrianglesSnapshot } from './types';

export type { ActiveRendererName, ExportOptions, RendererName, TrianglesLight, TrianglesOptions, TrianglesSnapshot } from './types';
export { createSeededRandom } from './prng';

type Rgb = [number, number, number];
type Point = { x: number; y: number; z: number };
type Triangle = { points: [Point, Point, Point]; color: Rgb };
type Scene = { width: number; height: number; triangles: Triangle[] };

const DEFAULT_LIGHTS: TrianglesLight[] = [
  { ambient: '#8a1b61', diffuse: '#ff9f1c', x: -0.35, y: 0.4, z: 180 },
  { ambient: '#274c77', diffuse: '#62b6cb', x: 0.45, y: -0.35, z: 130 }
];

const DEFAULTS: Required<Omit<TrianglesOptions, 'seed'>> = {
  renderer: 'auto',
  density: 180,
  depth: 80,
  meshAmbient: '#555555',
  meshDiffuse: '#ffffff',
  lights: DEFAULT_LIGHTS,
  pixelRatio: 0,
  maxPixelRatio: 2,
  animate: false,
  pointer: false
};

function copyLights(lights: TrianglesLight[]): TrianglesLight[] {
  return lights.map((light) => ({ ...light }));
}

function cloneOptions(options: TrianglesOptions): TrianglesOptions {
  return { ...options, lights: options.lights ? copyLights(options.lights) : undefined };
}

function parseColor(color: string): Rgb {
  const value = color.trim().replace('#', '');
  const expanded = value.length === 3 ? value.split('').map((part) => part + part).join('') : value;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) throw new Error(`Expected a hexadecimal color, received "${color}".`);
  return [
    Number.parseInt(expanded.slice(0, 2), 16) / 255,
    Number.parseInt(expanded.slice(2, 4), 16) / 255,
    Number.parseInt(expanded.slice(4, 6), 16) / 255
  ];
}

function formatColor([red, green, blue]: Rgb): string {
  const channel = (value: number) => Math.round(Math.max(0, Math.min(1, value)) * 255).toString(16).padStart(2, '0');
  return `#${channel(red)}${channel(green)}${channel(blue)}`;
}

function vectorNormal(a: Point, b: Point, c: Point): Point {
  const ux = b.x - a.x;
  const uy = b.y - a.y;
  const uz = b.z - a.z;
  const vx = c.x - a.x;
  const vy = c.y - a.y;
  const vz = c.z - a.z;
  const x = uy * vz - uz * vy;
  const y = uz * vx - ux * vz;
  const z = ux * vy - uy * vx;
  const length = Math.hypot(x, y, z) || 1;
  return { x: x / length, y: y / length, z: z / length };
}

function calculateColor(triangle: [Point, Point, Point], options: RenderOptions): Rgb {
  const normal = vectorNormal(...triangle);
  const centroid = triangle.reduce((total, point) => ({ x: total.x + point.x / 3, y: total.y + point.y / 3, z: total.z + point.z / 3 }), { x: 0, y: 0, z: 0 });
  const meshAmbient = parseColor(options.meshAmbient);
  const meshDiffuse = parseColor(options.meshDiffuse);
  const color: Rgb = [0, 0, 0];

  for (const light of options.lights) {
    const ambient = parseColor(light.ambient);
    const diffuse = parseColor(light.diffuse);
    const lightX = options.width * (light.x + 1) * 0.5;
    const lightY = options.height * (1 - light.y) * 0.5;
    const rayX = lightX - centroid.x;
    const rayY = lightY - centroid.y;
    const rayZ = light.z - centroid.z;
    const rayLength = Math.hypot(rayX, rayY, rayZ) || 1;
    const illumination = Math.max(0, (normal.x * rayX + normal.y * rayY + normal.z * rayZ) / rayLength);
    for (let channel = 0; channel < 3; channel += 1) {
      color[channel] += meshAmbient[channel] * ambient[channel] + meshDiffuse[channel] * diffuse[channel] * illumination;
    }
  }
  return color;
}

type RenderOptions = Required<Omit<TrianglesOptions, 'seed'>> & { seed: string | number; width: number; height: number };

function buildScene(width: number, height: number, options: RenderOptions): Scene {
  const random = createSeededRandom(options.seed);
  const points: [number, number][] = [];
  const count = Math.max(18, Math.round(options.density * Math.max(width * height, 1) / 250000));
  for (let index = 0; index < count; index += 1) points.push([random() * width, random() * height]);

  const border: [number, number][] = [[0, 0], [width * 0.5, 0], [width, 0], [width, height * 0.5], [width, height], [width * 0.5, height], [0, height], [0, height * 0.5]];
  points.push(...border);
  for (let index = 0; index < 7; index += 1) {
    points.push([random() * width, 0], [random() * width, height], [0, random() * height], [width, random() * height]);
  }

  const vertices = points.map(([x, y]) => ({ x, y, z: random() * options.depth }));
  const indices = triangulate(points);
  const triangles: Triangle[] = [];
  for (let index = 0; index < indices.length; index += 3) {
    const triangle: [Point, Point, Point] = [vertices[indices[index]], vertices[indices[index + 1]], vertices[indices[index + 2]]];
    triangles.push({ points: triangle, color: calculateColor(triangle, options) });
  }
  return { width, height, triangles };
}

interface Renderer {
  readonly name: ActiveRendererName;
  readonly element: HTMLElement | SVGElement;
  resize(width: number, height: number, pixelRatio: number): void;
  render(scene: Scene): void;
  destroy(): void;
}

class CanvasRenderer implements Renderer {
  readonly name = 'canvas' as const;
  readonly element = document.createElement('canvas');
  private readonly context: CanvasRenderingContext2D;
  private pixelRatio = 1;

  constructor() {
    const context = this.element.getContext('2d');
    if (!context) throw new Error('Canvas 2D rendering is unavailable in this browser.');
    this.context = context;
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.pixelRatio = pixelRatio;
    this.element.width = Math.max(1, Math.round(width * pixelRatio));
    this.element.height = Math.max(1, Math.round(height * pixelRatio));
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  render(scene: Scene): void {
    const context = this.context;
    context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    context.clearRect(0, 0, scene.width, scene.height);
    for (const triangle of scene.triangles) {
      context.beginPath();
      context.moveTo(triangle.points[0].x, triangle.points[0].y);
      context.lineTo(triangle.points[1].x, triangle.points[1].y);
      context.lineTo(triangle.points[2].x, triangle.points[2].y);
      context.closePath();
      context.fillStyle = formatColor(triangle.color);
      context.fill();
    }
  }

  destroy(): void {}
}

class SvgRenderer implements Renderer {
  readonly name = 'svg' as const;
  readonly element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    this.element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.element.setAttribute('aria-hidden', 'true');
  }

  resize(width: number, height: number): void {
    this.element.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.element.setAttribute('width', String(width));
    this.element.setAttribute('height', String(height));
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  render(scene: Scene): void {
    this.element.replaceChildren(...scene.triangles.map((triangle) => {
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', triangle.points.map((point) => `${point.x},${point.y}`).join(' '));
      polygon.setAttribute('fill', formatColor(triangle.color));
      return polygon;
    }));
  }

  destroy(): void {}
}

class WebGlRenderer implements Renderer {
  readonly name = 'webgl' as const;
  readonly element = document.createElement('canvas');
  private readonly context: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly positionBuffer: WebGLBuffer;
  private readonly colorBuffer: WebGLBuffer;
  private width = 1;
  private height = 1;

  constructor() {
    const context = this.element.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!context) throw new Error('WebGL rendering is unavailable in this browser.');
    this.context = context;
    const program = this.createProgram();
    const positionBuffer = context.createBuffer();
    const colorBuffer = context.createBuffer();
    if (!program || !positionBuffer || !colorBuffer) throw new Error('WebGL setup failed.');
    this.program = program;
    this.positionBuffer = positionBuffer;
    this.colorBuffer = colorBuffer;
    context.clearColor(0, 0, 0, 0);
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.width = width;
    this.height = height;
    this.element.width = Math.max(1, Math.round(width * pixelRatio));
    this.element.height = Math.max(1, Math.round(height * pixelRatio));
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.context.viewport(0, 0, this.element.width, this.element.height);
  }

  render(scene: Scene): void {
    const context = this.context;
    const positions = new Float32Array(scene.triangles.length * 6);
    const colors = new Float32Array(scene.triangles.length * 9);
    let positionIndex = 0;
    let colorIndex = 0;
    for (const triangle of scene.triangles) {
      for (const point of triangle.points) {
        positions[positionIndex++] = point.x / this.width * 2 - 1;
        positions[positionIndex++] = 1 - point.y / this.height * 2;
        colors[colorIndex++] = triangle.color[0];
        colors[colorIndex++] = triangle.color[1];
        colors[colorIndex++] = triangle.color[2];
      }
    }
    context.clear(context.COLOR_BUFFER_BIT);
    context.useProgram(this.program);
    const positionLocation = context.getAttribLocation(this.program, 'position');
    const colorLocation = context.getAttribLocation(this.program, 'color');
    context.bindBuffer(context.ARRAY_BUFFER, this.positionBuffer);
    context.bufferData(context.ARRAY_BUFFER, positions, context.STATIC_DRAW);
    context.enableVertexAttribArray(positionLocation);
    context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);
    context.bindBuffer(context.ARRAY_BUFFER, this.colorBuffer);
    context.bufferData(context.ARRAY_BUFFER, colors, context.STATIC_DRAW);
    context.enableVertexAttribArray(colorLocation);
    context.vertexAttribPointer(colorLocation, 3, context.FLOAT, false, 0, 0);
    context.drawArrays(context.TRIANGLES, 0, scene.triangles.length * 3);
  }

  destroy(): void {
    this.context.deleteBuffer(this.positionBuffer);
    this.context.deleteBuffer(this.colorBuffer);
    this.context.deleteProgram(this.program);
  }

  private createProgram(): WebGLProgram {
    const context = this.context;
    const vertex = this.createShader(context.VERTEX_SHADER, 'attribute vec2 position; attribute vec3 color; varying vec3 vColor; void main() { gl_Position = vec4(position, 0.0, 1.0); vColor = color; }');
    const fragment = this.createShader(context.FRAGMENT_SHADER, 'precision mediump float; varying vec3 vColor; void main() { gl_FragColor = vec4(vColor, 1.0); }');
    const program = context.createProgram();
    if (!program) throw new Error('WebGL program creation failed.');
    context.attachShader(program, vertex);
    context.attachShader(program, fragment);
    context.linkProgram(program);
    context.deleteShader(vertex);
    context.deleteShader(fragment);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) throw new Error(context.getProgramInfoLog(program) ?? 'WebGL program linking failed.');
    return program;
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.context.createShader(type);
    if (!shader) throw new Error('WebGL shader creation failed.');
    this.context.shaderSource(shader, source);
    this.context.compileShader(shader);
    if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) throw new Error(this.context.getShaderInfoLog(shader) ?? 'WebGL shader compilation failed.');
    return shader;
  }
}

function createRenderer(name: ActiveRendererName): Renderer {
  if (name === 'canvas') return new CanvasRenderer();
  if (name === 'svg') return new SvgRenderer();
  return new WebGlRenderer();
}

function resolveRenderer(requested: RendererName): ActiveRendererName {
  if (requested !== 'auto') return requested;
  try {
    const canvas = document.createElement('canvas');
    return canvas.getContext('webgl') ? 'webgl' : 'canvas';
  } catch {
    return 'canvas';
  }
}

function renderSceneToCanvas(scene: Scene, pixelRatio = 1): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(scene.width * pixelRatio));
  canvas.height = Math.max(1, Math.round(scene.height * pixelRatio));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas export is unavailable in this browser.');
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  for (const triangle of scene.triangles) {
    context.beginPath();
    context.moveTo(triangle.points[0].x, triangle.points[0].y);
    context.lineTo(triangle.points[1].x, triangle.points[1].y);
    context.lineTo(triangle.points[2].x, triangle.points[2].y);
    context.closePath();
    context.fillStyle = formatColor(triangle.color);
    context.fill();
  }
  return canvas;
}

function sceneToSvg(scene: Scene): string {
  const polygons = scene.triangles.map((triangle) => `<polygon points="${triangle.points.map((point) => `${point.x},${point.y}`).join(' ')}" fill="${formatColor(triangle.color)}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${scene.width} ${scene.height}" width="${scene.width}" height="${scene.height}">${polygons}</svg>`;
}

/** A deterministic, renderer-switchable triangulated background mounted behind host content. */
export class TrianglesBackground {
  private readonly host: HTMLElement;
  private readonly originalPosition: string;
  private readonly originalIsolation: string;
  private seed: string | number;
  private options: Required<Omit<TrianglesOptions, 'seed'>>;
  private renderer: Renderer;
  private observer?: ResizeObserver;
  private animationFrame?: number;
  private pointerPosition?: { x: number; y: number };
  private animationTime = 0;
  private destroyed = false;
  private currentSize = { width: 0, height: 0 };

  constructor(host: HTMLElement, options: TrianglesOptions = {}) {
    if (!(host instanceof HTMLElement)) throw new TypeError('TrianglesBackground requires an HTMLElement host.');
    this.host = host;
    this.seed = options.seed ?? Math.floor(Math.random() * 2 ** 32);
    this.options = this.mergeOptions(options);
    this.originalPosition = host.style.position;
    this.originalIsolation = host.style.isolation;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.style.isolation = 'isolate';
    this.renderer = this.createRequestedRenderer(this.options.renderer);
    this.prepareElement();
    this.host.prepend(this.renderer.element);
    this.observe();
    this.host.addEventListener('pointermove', this.onPointerMove);
    this.resize();
    this.startAnimation();
  }

  get element(): HTMLElement | SVGElement { return this.renderer.element; }
  get rendererName(): ActiveRendererName { return this.renderer.name; }

  getSeed(): string | number { return this.seed; }

  getOptions(): TrianglesOptions { return cloneOptions({ ...this.options, seed: this.seed, lights: copyLights(this.options.lights) }); }

  getSnapshot(): TrianglesSnapshot { return { seed: this.seed, options: this.getOptions() }; }

  setOptions(options: Partial<TrianglesOptions>): this {
    this.assertActive();
    const requestedRenderer = options.renderer;
    const rendererChanged = requestedRenderer !== undefined && requestedRenderer !== this.options.renderer;
    if (options.seed !== undefined) this.seed = options.seed;
    this.options = this.mergeOptions({ ...this.options, ...options, lights: options.lights ?? this.options.lights });
    if (rendererChanged && requestedRenderer !== undefined) this.setRenderer(requestedRenderer);
    if (options.animate !== undefined) this.restartAnimation();
    return this.render();
  }

  setRenderer(renderer: RendererName): this {
    this.assertActive();
    const next = this.createRequestedRenderer(renderer);
    const previous = this.renderer;
    this.renderer = next;
    this.options.renderer = renderer;
    this.prepareElement();
    previous.element.replaceWith(next.element);
    previous.destroy();
    this.resize();
    return this;
  }

  resize(): this {
    this.assertActive();
    const bounds = this.host.getBoundingClientRect();
    this.currentSize = {
      width: Math.max(1, this.host.offsetWidth || Math.round(bounds.width)),
      height: Math.max(1, this.host.offsetHeight || Math.round(bounds.height))
    };
    this.renderer.resize(this.currentSize.width, this.currentSize.height, this.effectivePixelRatio());
    return this.render();
  }

  render(): this {
    this.assertActive();
    const scene = this.createScene(this.currentSize.width, this.currentSize.height);
    this.renderer.render(scene);
    return this;
  }

  toSVGString(options: Partial<ExportOptions> = {}): string {
    this.assertActive();
    return sceneToSvg(this.createScene(options.width ?? this.currentSize.width, options.height ?? this.currentSize.height));
  }

  toBlob(options: Partial<ExportOptions> = {}): Promise<Blob> {
    this.assertActive();
    const width = options.width ?? this.currentSize.width;
    const height = options.height ?? this.currentSize.height;
    const type = options.type ?? 'image/png';
    if (type === 'image/svg+xml') return Promise.resolve(new Blob([this.toSVGString({ width, height })], { type }));
    const canvas = renderSceneToCanvas(this.createScene(width, height));
    return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Unable to encode the background image.')), type, options.quality));
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.observer?.disconnect();
    this.host.removeEventListener('pointermove', this.onPointerMove);
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.renderer.destroy();
    this.renderer.element.remove();
    this.host.style.position = this.originalPosition;
    this.host.style.isolation = this.originalIsolation;
  }

  private mergeOptions(options: TrianglesOptions): Required<Omit<TrianglesOptions, 'seed'>> {
    const { seed: _seed, ...resolved } = options;
    return {
      ...DEFAULTS,
      ...resolved,
      lights: copyLights(resolved.lights ?? DEFAULTS.lights),
      density: Math.max(10, resolved.density ?? DEFAULTS.density),
      depth: Math.max(0, resolved.depth ?? DEFAULTS.depth),
      maxPixelRatio: Math.max(1, resolved.maxPixelRatio ?? DEFAULTS.maxPixelRatio),
      pixelRatio: Math.max(0, resolved.pixelRatio ?? DEFAULTS.pixelRatio)
    };
  }

  private createRequestedRenderer(requested: RendererName): Renderer {
    const name = resolveRenderer(requested);
    try {
      return createRenderer(name);
    } catch (error) {
      if (requested === 'auto' && name === 'webgl') return createRenderer('canvas');
      throw error;
    }
  }

  private prepareElement(): void {
    const element = this.renderer.element as HTMLElement;
    element.setAttribute('aria-hidden', 'true');
    element.setAttribute('data-triangles-background', this.renderer.name);
    Object.assign(element.style, { position: 'absolute', inset: '0', zIndex: '-1', display: 'block', pointerEvents: 'none' });
  }

  private observe(): void {
    if (typeof ResizeObserver === 'undefined') return;
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.host);
  }

  private createScene(width: number, height: number): Scene {
    const lights = copyLights(this.options.lights);
    if (this.options.pointer && this.pointerPosition && lights[0]) {
      lights[0].x = this.pointerPosition.x;
      lights[0].y = this.pointerPosition.y;
    }
    const depth = this.options.animate ? this.options.depth * (0.82 + Math.sin(this.animationTime) * 0.18) : this.options.depth;
    return buildScene(width, height, { ...this.options, depth, lights, seed: this.seed, width, height });
  }

  private effectivePixelRatio(): number {
    const deviceRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1;
    return Math.min(this.options.pixelRatio || deviceRatio, this.options.maxPixelRatio);
  }

  private startAnimation(): void {
    if (!this.options.animate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const tick = (time: number) => {
      if (this.destroyed) return;
      this.animationTime = time / 1200;
      this.render();
      this.animationFrame = requestAnimationFrame(tick);
    };
    this.animationFrame = requestAnimationFrame(tick);
  }

  private restartAnimation(): void {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = undefined;
    this.startAnimation();
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.options.pointer) return;
    const bounds = this.host.getBoundingClientRect();
    this.pointerPosition = {
      x: Math.max(-1, Math.min(1, (event.clientX - bounds.left) / Math.max(bounds.width, 1) * 2 - 1)),
      y: Math.max(-1, Math.min(1, 1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1) * 2))
    };
    this.render();
  };

  private assertActive(): void {
    if (this.destroyed) throw new Error('TrianglesBackground has been destroyed.');
  }
}

export default TrianglesBackground;
