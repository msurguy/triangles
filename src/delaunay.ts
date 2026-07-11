type Point = [number, number];

interface Circumcircle {
  i: number;
  j: number;
  k: number;
  x: number;
  y: number;
  r: number;
}

const EPSILON = 1 / 1048576;

function supertriangle(vertices: Point[]): Point[] {
  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;

  for (const [x, y] of vertices) {
    xmin = Math.min(xmin, x);
    ymin = Math.min(ymin, y);
    xmax = Math.max(xmax, x);
    ymax = Math.max(ymax, y);
  }

  const dx = xmax - xmin;
  const dy = ymax - ymin;
  const dmax = Math.max(dx, dy);
  const xmid = xmin + dx * 0.5;
  const ymid = ymin + dy * 0.5;
  return [[xmid - 20 * dmax, ymid - dmax], [xmid, ymid + 20 * dmax], [xmid + 20 * dmax, ymid - dmax]];
}

function circumcircle(vertices: Point[], i: number, j: number, k: number): Circumcircle {
  const [x1, y1] = vertices[i];
  const [x2, y2] = vertices[j];
  const [x3, y3] = vertices[k];
  const first = Math.abs(y1 - y2);
  const second = Math.abs(y2 - y3);
  let xc: number;
  let yc: number;

  if (first < EPSILON && second < EPSILON) throw new Error('Cannot triangulate coincident points.');
  if (first < EPSILON) {
    const slope = -((x3 - x2) / (y3 - y2));
    const midpointX = (x2 + x3) / 2;
    const midpointY = (y2 + y3) / 2;
    xc = (x2 + x1) / 2;
    yc = slope * (xc - midpointX) + midpointY;
  } else if (second < EPSILON) {
    const slope = -((x2 - x1) / (y2 - y1));
    const midpointX = (x1 + x2) / 2;
    const midpointY = (y1 + y2) / 2;
    xc = (x3 + x2) / 2;
    yc = slope * (xc - midpointX) + midpointY;
  } else {
    const slope1 = -((x2 - x1) / (y2 - y1));
    const slope2 = -((x3 - x2) / (y3 - y2));
    const midpoint1X = (x1 + x2) / 2;
    const midpoint2X = (x2 + x3) / 2;
    const midpoint1Y = (y1 + y2) / 2;
    const midpoint2Y = (y2 + y3) / 2;
    xc = (slope1 * midpoint1X - slope2 * midpoint2X + midpoint2Y - midpoint1Y) / (slope1 - slope2);
    yc = first > second ? slope1 * (xc - midpoint1X) + midpoint1Y : slope2 * (xc - midpoint2X) + midpoint2Y;
  }

  const dx = x2 - xc;
  const dy = y2 - yc;
  return { i, j, k, x: xc, y: yc, r: dx * dx + dy * dy };
}

function deduplicateEdges(edges: number[]): void {
  for (let j = edges.length; j > 0;) {
    const b = edges[--j];
    const a = edges[--j];
    for (let i = j; i > 0;) {
      const n = edges[--i];
      const m = edges[--i];
      if ((a === m && b === n) || (a === n && b === m)) {
        edges.splice(j, 2);
        edges.splice(i, 2);
        break;
      }
    }
  }
}

export function triangulate(input: Point[]): number[] {
  const vertexCount = input.length;
  if (vertexCount < 3) return [];

  const vertices = input.slice();
  const indices = Array.from({ length: vertexCount }, (_, index) => index).sort((a, b) => vertices[b][0] - vertices[a][0]);
  vertices.push(...supertriangle(vertices));
  const open = [circumcircle(vertices, vertexCount, vertexCount + 1, vertexCount + 2)];
  const closed: Circumcircle[] = [];
  const edges: number[] = [];

  for (let index = indices.length - 1; index >= 0; index -= 1) {
    const current = indices[index];
    edges.length = 0;
    for (let j = open.length - 1; j >= 0; j -= 1) {
      const dx = vertices[current][0] - open[j].x;
      if (dx > 0 && dx * dx > open[j].r) {
        closed.push(open[j]);
        open.splice(j, 1);
        continue;
      }
      const dy = vertices[current][1] - open[j].y;
      if (dx * dx + dy * dy - open[j].r > EPSILON) continue;
      edges.push(open[j].i, open[j].j, open[j].j, open[j].k, open[j].k, open[j].i);
      open.splice(j, 1);
    }
    deduplicateEdges(edges);
    for (let j = edges.length; j > 0;) {
      const b = edges[--j];
      const a = edges[--j];
      open.push(circumcircle(vertices, a, b, current));
    }
  }

  closed.push(...open);
  return closed.flatMap(({ i, j, k }) => i < vertexCount && j < vertexCount && k < vertexCount ? [i, j, k] : []);
}
