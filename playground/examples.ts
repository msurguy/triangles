import type { TrianglesLight, TrianglesOptions } from 'triangles';

export type GalleryOptions = Required<Pick<TrianglesOptions, 'density' | 'depth' | 'meshAmbient' | 'meshDiffuse' | 'lights'>> & {
  seed: string;
  animate?: boolean;
  pointer?: boolean;
};

export interface GalleryExample {
  name: string;
  options: GalleryOptions;
}

export const GALLERY_EXAMPLES: GalleryExample[] = [
  {
    name: 'Ember Field',
    options: {
      seed: 'ember-field',
      density: 220,
      depth: 120,
      meshAmbient: '#2b0f0e',
      meshDiffuse: '#ffffff',
      lights: [
        { ambient: '#7a1e05', diffuse: '#ff7b00', x: -0.4, y: 0.5, z: 160 },
        { ambient: '#3d0c02', diffuse: '#ffb703', x: 0.5, y: -0.3, z: 120 }
      ]
    }
  },
  {
    name: 'Deep Ocean',
    options: {
      seed: 'deep-ocean',
      density: 160,
      depth: 90,
      meshAmbient: '#04141f',
      meshDiffuse: '#e0fbfc',
      lights: [
        { ambient: '#0a2463', diffuse: '#3e92cc', x: -0.3, y: 0.6, z: 200 },
        { ambient: '#022b3a', diffuse: '#1f7a8c', x: 0.55, y: -0.4, z: 140 }
      ]
    }
  },
  {
    name: 'Monument Dawn',
    options: {
      seed: 'monument-dawn',
      density: 120,
      depth: 140,
      meshAmbient: '#40263a',
      meshDiffuse: '#fff1e6',
      lights: [
        { ambient: '#8a1b61', diffuse: '#ff9f1c', x: -0.35, y: 0.4, z: 180 },
        { ambient: '#274c77', diffuse: '#62b6cb', x: 0.45, y: -0.35, z: 130 }
      ]
    }
  },
  {
    name: 'Neon Grid',
    options: {
      seed: 'neon-grid',
      density: 320,
      depth: 60,
      meshAmbient: '#0d0221',
      meshDiffuse: '#f6f7f8',
      lights: [
        { ambient: '#570861', diffuse: '#f72585', x: -0.6, y: 0.3, z: 130 },
        { ambient: '#10002b', diffuse: '#4cc9f0', x: 0.6, y: -0.5, z: 110 }
      ]
    }
  },
  {
    name: 'Paper Relief',
    options: {
      seed: 'paper-relief',
      density: 90,
      depth: 80,
      meshAmbient: '#8d8d8d',
      meshDiffuse: '#ffffff',
      lights: [
        { ambient: '#5c5c5c', diffuse: '#e9ecef', x: -0.25, y: 0.55, z: 220 }
      ]
    }
  },
  {
    name: 'Forest Floor',
    options: {
      seed: 'forest-floor',
      density: 260,
      depth: 110,
      meshAmbient: '#081c15',
      meshDiffuse: '#f1faee',
      lights: [
        { ambient: '#1b4332', diffuse: '#95d5b2', x: -0.4, y: 0.45, z: 170 },
        { ambient: '#2d3a1f', diffuse: '#d8f3dc', x: 0.5, y: -0.2, z: 120 }
      ]
    }
  },
  {
    name: 'Aurora Night',
    options: {
      seed: 'aurora-night',
      density: 180,
      depth: 160,
      meshAmbient: '#020c1b',
      meshDiffuse: '#e6fffa',
      lights: [
        { ambient: '#064e3b', diffuse: '#34d399', x: -0.5, y: 0.6, z: 190 },
        { ambient: '#1e1b4b', diffuse: '#818cf8', x: 0.35, y: -0.45, z: 150 },
        { ambient: '#042f2e', diffuse: '#2dd4bf', x: 0.7, y: 0.7, z: 240 }
      ]
    }
  },
  {
    name: 'Rose Quartz',
    options: {
      seed: 'rose-quartz',
      density: 140,
      depth: 70,
      meshAmbient: '#5c374c',
      meshDiffuse: '#fff0f3',
      lights: [
        { ambient: '#985277', diffuse: '#ffb3c6', x: -0.3, y: 0.35, z: 180 },
        { ambient: '#4a2545', diffuse: '#ff8fab', x: 0.4, y: -0.5, z: 140 }
      ]
    }
  },
  {
    name: 'Low-Poly Sunset',
    options: {
      seed: 'low-poly-sunset',
      density: 48,
      depth: 130,
      meshAmbient: '#3d1308',
      meshDiffuse: '#fff8e7',
      lights: [
        { ambient: '#9d0208', diffuse: '#ffba08', x: 0, y: 0.65, z: 170 },
        { ambient: '#370617', diffuse: '#e85d04', x: -0.55, y: -0.3, z: 130 }
      ]
    }
  },
  {
    name: 'Glacier Shards',
    options: {
      seed: 'glacier-shards',
      density: 200,
      depth: 200,
      meshAmbient: '#12263a',
      meshDiffuse: '#f8fdff',
      lights: [
        { ambient: '#2e5266', diffuse: '#9ad1d4', x: -0.45, y: 0.55, z: 210 },
        { ambient: '#1b3a4b', diffuse: '#e0fbfc', x: 0.6, y: -0.25, z: 160 }
      ]
    }
  },
  {
    name: 'Graphite Mono',
    options: {
      seed: 'graphite-mono',
      density: 300,
      depth: 90,
      meshAmbient: '#343434',
      meshDiffuse: '#fafafa',
      lights: [
        { ambient: '#1f1f1f', diffuse: '#cfcfcf', x: -0.35, y: 0.5, z: 180 }
      ]
    }
  },
  {
    name: 'Citrus Pop',
    options: {
      seed: 'citrus-pop',
      density: 110,
      depth: 80,
      meshAmbient: '#4f772d',
      meshDiffuse: '#fefae0',
      lights: [
        { ambient: '#606c38', diffuse: '#d7f461', x: -0.4, y: 0.4, z: 160 },
        { ambient: '#7f4f24', diffuse: '#ffba08', x: 0.5, y: -0.4, z: 130 }
      ]
    }
  },
  {
    name: 'Velvet Dusk',
    options: {
      seed: 'velvet-dusk',
      density: 170,
      depth: 100,
      meshAmbient: '#231942',
      meshDiffuse: '#f3e8ff',
      lights: [
        { ambient: '#5e548e', diffuse: '#be95c4', x: -0.3, y: 0.5, z: 170 },
        { ambient: '#3c096c', diffuse: '#e0aaff', x: 0.55, y: -0.35, z: 140 }
      ]
    }
  },
  {
    name: 'Desert Crust',
    options: {
      seed: 'desert-crust',
      density: 240,
      depth: 150,
      meshAmbient: '#582f0e',
      meshDiffuse: '#fff3d6',
      lights: [
        { ambient: '#7f4f24', diffuse: '#e6ccb2', x: -0.2, y: 0.6, z: 190 },
        { ambient: '#6f1d1b', diffuse: '#f4a261', x: 0.65, y: -0.2, z: 130 }
      ]
    }
  },
  {
    name: 'Arctic Flat',
    options: {
      seed: 'arctic-flat',
      density: 130,
      depth: 70,
      meshAmbient: '#8ecae6',
      meshDiffuse: '#ffffff',
      lights: [
        { ambient: '#457b9d', diffuse: '#f1faee', x: -0.3, y: 0.4, z: 240 }
      ]
    }
  },
  {
    name: 'Magma Core',
    options: {
      seed: 'magma-core',
      density: 380,
      depth: 180,
      meshAmbient: '#1a0500',
      meshDiffuse: '#fff1d0',
      lights: [
        { ambient: '#6a040f', diffuse: '#dc2f02', x: -0.45, y: 0.35, z: 140 },
        { ambient: '#370617', diffuse: '#ffba08', x: 0.4, y: -0.55, z: 110 },
        { ambient: '#03071e', diffuse: '#e85d04', x: 0, y: 0.8, z: 220 }
      ]
    }
  },
  {
    name: 'Mint Facets',
    options: {
      seed: 'mint-facets',
      density: 75,
      depth: 95,
      meshAmbient: '#1b4332',
      meshDiffuse: '#f0fff4',
      lights: [
        { ambient: '#2d6a4f', diffuse: '#b7e4c7', x: -0.35, y: 0.45, z: 170 }
      ]
    }
  },
  {
    name: 'Midnight Ink',
    options: {
      seed: 'midnight-ink',
      density: 210,
      depth: 55,
      meshAmbient: '#0b090a',
      meshDiffuse: '#d3d3f5',
      lights: [
        { ambient: '#161a2b', diffuse: '#3a506b', x: -0.4, y: 0.5, z: 180 },
        { ambient: '#0b132b', diffuse: '#5bc0be', x: 0.5, y: -0.4, z: 150 }
      ]
    }
  },
  {
    name: 'Coral Reef',
    options: {
      seed: 'coral-reef',
      density: 290,
      depth: 105,
      meshAmbient: '#123c3c',
      meshDiffuse: '#fff5f0',
      lights: [
        { ambient: '#e07a5f', diffuse: '#f2cc8f', x: -0.5, y: 0.35, z: 150 },
        { ambient: '#0f5257', diffuse: '#81b29a', x: 0.45, y: -0.45, z: 130 }
      ]
    }
  },
  {
    name: 'Storm Front',
    options: {
      seed: 'storm-front',
      density: 155,
      depth: 220,
      meshAmbient: '#212529',
      meshDiffuse: '#e9ecef',
      lights: [
        { ambient: '#343a40', diffuse: '#adb5bd', x: -0.3, y: 0.7, z: 200 },
        { ambient: '#1c2541', diffuse: '#6c9dc6', x: 0.6, y: -0.2, z: 130 }
      ]
    }
  },
  {
    name: 'Peach Sorbet',
    options: {
      seed: 'peach-sorbet',
      density: 95,
      depth: 45,
      meshAmbient: '#9c6644',
      meshDiffuse: '#fffcf2',
      lights: [
        { ambient: '#e29578', diffuse: '#ffddd2', x: -0.25, y: 0.4, z: 200 },
        { ambient: '#b76e79', diffuse: '#ffe5d9', x: 0.4, y: -0.3, z: 160 }
      ]
    }
  },
  {
    name: 'Ultraviolet',
    options: {
      seed: 'ultraviolet',
      density: 440,
      depth: 85,
      meshAmbient: '#10002b',
      meshDiffuse: '#f2ebfb',
      lights: [
        { ambient: '#3c096c', diffuse: '#9d4edd', x: -0.4, y: 0.45, z: 150 },
        { ambient: '#240046', diffuse: '#c77dff', x: 0.5, y: -0.4, z: 120 }
      ]
    }
  },
  {
    name: 'Harbor Fog',
    options: {
      seed: 'harbor-fog',
      density: 60,
      depth: 100,
      meshAmbient: '#344291',
      meshDiffuse: '#646434',
      lights: [
        { ambient: '#a5a58d', diffuse: '#f0efeb', x: -0.2, y: 0.5, z: 130 }
      ]
    }
  },
  {
    name: 'Prism Break',
    options: {
      seed: 'prism-break',
      density: 250,
      depth: 135,
      meshAmbient: '#101010',
      meshDiffuse: '#ffffff',
      lights: [
        { ambient: '#5f0f40', diffuse: '#fb8b24', x: -0.65, y: 0.5, z: 150 },
        { ambient: '#0f4c5c', diffuse: '#4cc9f0', x: 0.65, y: 0.5, z: 150 },
        { ambient: '#233d4d', diffuse: '#a1c181', x: 0, y: -0.65, z: 150 },
        { ambient: '#3d0066', diffuse: '#ff5d8f', x: 0, y: 0.85, z: 260 }
      ]
    }
  }
];

function formatLight(light: TrianglesLight, indent: string): string {
  return `${indent}{ ambient: '${light.ambient}', diffuse: '${light.diffuse}', x: ${light.x}, y: ${light.y}, z: ${light.z} }`;
}

export function formatOptionsLiteral(options: GalleryOptions, indent = ''): string {
  return [
    '{',
    `${indent}  seed: '${options.seed}',`,
    `${indent}  density: ${options.density},`,
    `${indent}  depth: ${options.depth},`,
    `${indent}  meshAmbient: '${options.meshAmbient}',`,
    `${indent}  meshDiffuse: '${options.meshDiffuse}',`,
    ...(options.animate === undefined ? [] : [`${indent}  animate: ${options.animate},`]),
    ...(options.pointer === undefined ? [] : [`${indent}  pointer: ${options.pointer},`]),
    `${indent}  lights: [`,
    options.lights.map((light) => formatLight(light, `${indent}    `)).join(',\n'),
    `${indent}  ]`,
    `${indent}}`
  ].join('\n');
}

export function formatSnippet(options: GalleryOptions): string {
  return [
    "import TrianglesBackground from 'triangles';",
    '',
    `new TrianglesBackground(element, ${formatOptionsLiteral(options)});`,
    ''
  ].join('\n');
}
