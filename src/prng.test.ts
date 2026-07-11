import { describe, expect, it } from 'vitest';
import { triangulate } from './delaunay';
import { createSeededRandom } from './prng';

describe('createSeededRandom', () => {
  it('repeats the same sequence for the same seed', () => {
    const first = createSeededRandom('same-seed');
    const second = createSeededRandom('same-seed');
    expect(Array.from({ length: 6 }, first)).toEqual(Array.from({ length: 6 }, second));
  });

  it('changes the sequence for a different seed', () => {
    expect(createSeededRandom('one')()).not.toEqual(createSeededRandom('two')());
  });
});

describe('triangulate', () => {
  it('returns index triplets for a point cloud', () => {
    const points: [number, number][] = [[0, 0], [100, 0], [100, 100], [0, 100], [50, 50]];
    const triangles = triangulate(points);
    expect(triangles.length).toBeGreaterThan(0);
    expect(triangles.length % 3).toBe(0);
    expect(triangles.every((index) => index >= 0 && index < points.length)).toBe(true);
  });
});
