import { afterEach, describe, expect, it, vi } from 'vitest';
import TrianglesBackground from './index';

const backgrounds: TrianglesBackground[] = [];

afterEach(() => {
  backgrounds.splice(0).forEach((background) => background.destroy());
  document.body.replaceChildren();
  vi.restoreAllMocks();
});

describe('TrianglesBackground', () => {
  it('mounts behind host content, exposes a snapshot, and cleans up', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      setTransform: vi.fn(), clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(), fill: vi.fn()
    } as unknown as CanvasRenderingContext2D);
    const host = document.createElement('section');
    host.innerHTML = '<p>Content stays here</p>';
    Object.defineProperty(host, 'getBoundingClientRect', { value: () => ({ width: 640, height: 360 }) });
    document.body.append(host);

    const background = new TrianglesBackground(host, { renderer: 'canvas', seed: 'fixed-seed' });
    backgrounds.push(background);

    expect(host.firstElementChild?.getAttribute('data-triangles-background')).toBe('canvas');
    expect(host.textContent).toContain('Content stays here');
    expect(background.getSnapshot().seed).toBe('fixed-seed');
    background.setOptions({ seed: 'next-seed', density: 90 });
    expect(background.getSeed()).toBe('next-seed');
    background.setRenderer('svg');
    expect(background.rendererName).toBe('svg');
    expect(host.firstElementChild?.getAttribute('data-triangles-background')).toBe('svg');

    background.destroy();
    expect(host.querySelector('[data-triangles-background]')).toBeNull();
  });

  it('serializes deterministic SVG output for a fixed seed and size', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      setTransform: vi.fn(), clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(), fill: vi.fn()
    } as unknown as CanvasRenderingContext2D);
    const host = document.createElement('section');
    Object.defineProperty(host, 'getBoundingClientRect', { value: () => ({ width: 320, height: 180 }) });
    document.body.append(host);
    const background = new TrianglesBackground(host, { renderer: 'canvas', seed: 42 });
    backgrounds.push(background);
    expect(background.toSVGString({ width: 320, height: 180 })).toEqual(background.toSVGString({ width: 320, height: 180 }));
  });

  it('does not repeatedly probe WebGL when auto renderer settings are updated', () => {
    const canvasContext = {
      setTransform: vi.fn(), clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(), fill: vi.fn()
    } as unknown as CanvasRenderingContext2D;
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation((contextId) => {
      return contextId === 'webgl' ? null : canvasContext;
    });
    const host = document.createElement('section');
    Object.defineProperty(host, 'getBoundingClientRect', { value: () => ({ width: 640, height: 360 }) });
    document.body.append(host);

    const background = new TrianglesBackground(host, { renderer: 'auto' });
    backgrounds.push(background);
    for (let density = 40; density <= 50; density += 1) {
      background.setOptions({ renderer: 'auto', density });
    }

    expect(getContext.mock.calls.filter(([contextId]) => contextId === 'webgl')).toHaveLength(1);
  });

  it('uses layout dimensions for a transformed preview and exact pixel dimensions for PNG exports', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      setTransform: vi.fn(), clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(), fill: vi.fn()
    } as unknown as CanvasRenderingContext2D);
    const toBlob = vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(function (callback) {
      expect(this.width).toBe(2400);
      expect(this.height).toBe(1400);
      callback(new Blob());
    });
    const host = document.createElement('section');
    Object.defineProperty(host, 'offsetWidth', { value: 2400 });
    Object.defineProperty(host, 'offsetHeight', { value: 1400 });
    Object.defineProperty(host, 'getBoundingClientRect', { value: () => ({ width: 600, height: 350 }) });
    document.body.append(host);

    const background = new TrianglesBackground(host, { renderer: 'svg', pixelRatio: 2, seed: 'fixed-seed' });
    backgrounds.push(background);

    expect(background.toSVGString()).toContain('viewBox="0 0 2400 1400"');
    await background.toBlob({ width: 2400, height: 1400 });
    expect(toBlob).toHaveBeenCalledOnce();
  });
});
