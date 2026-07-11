import { Pane } from 'tweakpane';
import TrianglesBackground, { type RendererName, type TrianglesLight, type TrianglesOptions } from 'triangles';
import { mountGallery, mountUsage } from './gallery';
import './style.css';

type PlaygroundState = Required<Pick<TrianglesOptions, 'renderer' | 'density' | 'depth' | 'meshAmbient' | 'meshDiffuse' | 'lights'>> & {
  seed: string;
  exportWidth: number;
  exportHeight: number;
};

const preview = document.querySelector<HTMLElement>('#preview')!;
const previewSurface = document.querySelector<HTMLElement>('#preview-surface')!;
const paneMount = document.querySelector<HTMLElement>('#pane')!;

const state: PlaygroundState = {
  seed: 'triangles-v2',
  renderer: 'auto',
  density: 50,
  depth: 80,
  meshAmbient: '#555555',
  meshDiffuse: '#ffffff',
  exportWidth: 1600,
  exportHeight: 900,
  lights: [
    { ambient: '#8a1b61', diffuse: '#ff9f1c', x: -0.35, y: 0.4, z: 180 },
    { ambient: '#274c77', diffuse: '#62b6cb', x: 0.45, y: -0.35, z: 130 }
  ]
};

function layoutPreviewSurface(): void {
  const scale = Math.min(1, preview.clientWidth / state.exportWidth, preview.clientHeight / state.exportHeight);
  previewSurface.style.width = `${state.exportWidth}px`;
  previewSurface.style.height = `${state.exportHeight}px`;
  previewSurface.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

layoutPreviewSurface();
const background = new TrianglesBackground(previewSurface, state);
const pane = new Pane({ container: paneMount });
const previewObserver = new ResizeObserver(layoutPreviewSurface);
previewObserver.observe(preview);

function randomSeed(): string {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

function updatePreview(): void {
  layoutPreviewSurface();
  background.setOptions(state);
  background.resize();
}

function download(blob: Blob, filename: string): void {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 0);
}

pane.addBinding(state, 'seed', { label: 'Seed' });
pane.addButton({ title: 'Randomize seed' }).on('click', () => {
  state.seed = randomSeed();
  pane.refresh();
  updatePreview();
});
pane.addBinding(state, 'renderer', {
  label: 'Renderer',
  options: { Auto: 'auto', WebGL: 'webgl', Canvas: 'canvas', SVG: 'svg' }
});

const surfaceFolder = pane.addFolder({ title: 'Surface', expanded: true });
surfaceFolder.addBinding(state, 'density', { label: 'Density', min: 40, max: 480, step: 1 });
surfaceFolder.addBinding(state, 'depth', { label: 'Depth', min: 0, max: 240, step: 1 });
surfaceFolder.addBinding(state, 'meshAmbient', { label: 'Ambient' });
surfaceFolder.addBinding(state, 'meshDiffuse', { label: 'Diffuse' });

let lightsFolder = pane.addFolder({ title: 'Lights', expanded: true });

function renderLights(): void {
  lightsFolder.children.forEach((child) => child.dispose());

  state.lights.forEach((light, index) => {
    const lightFolder = lightsFolder.addFolder({ title: `Light ${index + 1}`, expanded: index === 0 });
    lightFolder.addBinding(light, 'ambient', { label: 'Ambient' });
    lightFolder.addBinding(light, 'diffuse', { label: 'Diffuse' });
    lightFolder.addBinding(light, 'x', { label: 'X position', min: -1, max: 1, step: 0.01 });
    lightFolder.addBinding(light, 'y', { label: 'Y position', min: -1, max: 1, step: 0.01 });
    lightFolder.addBinding(light, 'z', { label: 'Distance', min: 20, max: 500, step: 1 });
    if (state.lights.length > 1) {
      lightFolder.addButton({ title: 'Remove light' }).on('click', () => {
        state.lights.splice(index, 1);
        renderLights();
        updatePreview();
      });
    }
  });

  lightsFolder.addButton({ title: 'Add light' }).on('click', () => {
    state.lights.push({ ambient: '#4a1942', diffuse: '#9ef01a', x: 0, y: 0, z: 150 });
    renderLights();
    updatePreview();
  });
}

const exportFolder = pane.addFolder({ title: 'Export', expanded: true });
exportFolder.addBinding(state, 'exportWidth', { label: 'Width (px)', min: 64, max: 8192, step: 1 });
exportFolder.addBinding(state, 'exportHeight', { label: 'Height (px)', min: 64, max: 8192, step: 1 });
exportFolder.addButton({ title: 'Copy configuration' }).on('click', async () => {
  await navigator.clipboard?.writeText(JSON.stringify({ seed: state.seed, options: state }, null, 2));
});
exportFolder.addButton({ title: 'Export PNG' }).on('click', async () => {
  download(await background.toBlob({ width: state.exportWidth, height: state.exportHeight }), `triangles-${state.seed}.png`);
});
exportFolder.addButton({ title: 'Export SVG' }).on('click', async () => {
  download(await background.toBlob({ width: state.exportWidth, height: state.exportHeight, type: 'image/svg+xml' }), `triangles-${state.seed}.svg`);
});

pane.on('change', updatePreview);
renderLights();
updatePreview();
mountUsage(document.querySelector<HTMLElement>('#usage-grid')!);
mountGallery(document.querySelector<HTMLElement>('#gallery-grid')!);
