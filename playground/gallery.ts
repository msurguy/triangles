import TrianglesBackground from 'triangles';
import { GALLERY_EXAMPLES, formatSnippet, type GalleryOptions } from './examples';
import { USAGE_EXAMPLES } from './usage-examples';

interface GalleryTile {
  name: string;
  options: GalleryOptions;
  snippet: string;
  demoClass?: string;
  demoHtml?: string;
}

// Tiles render at a fixed size and scale with a CSS transform (like the main
// preview surface), so window resizes never regenerate the triangulation.
const SURFACE_WIDTH = 960;

function createTile(item: GalleryTile): { tile: HTMLElement; surface: HTMLElement; canvasHost: HTMLElement } {
  const tile = document.createElement('article');
  tile.className = 'example-tile';

  const surface = document.createElement('div');
  surface.className = item.demoClass ? `example-preview usage-demo ${item.demoClass}` : 'example-preview';
  surface.setAttribute('aria-hidden', 'true');
  if (item.demoHtml) surface.innerHTML = item.demoHtml;

  const canvasHost = document.createElement('div');
  canvasHost.className = 'example-canvas';
  surface.prepend(canvasHost);

  const caption = document.createElement('p');
  caption.className = 'example-name';
  caption.textContent = item.name;

  const details = document.createElement('details');
  details.className = 'example-code';

  const summary = document.createElement('summary');
  summary.textContent = 'Code';

  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'example-copy';
  copyButton.textContent = 'Copy';
  copyButton.addEventListener('click', async () => {
    await navigator.clipboard?.writeText(item.snippet);
    copyButton.textContent = 'Copied';
    setTimeout(() => {
      copyButton.textContent = 'Copy';
    }, 1200);
  });

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = item.snippet;
  pre.append(code);
  details.append(summary, copyButton, pre);
  tile.append(surface, caption, details);
  return { tile, surface, canvasHost };
}

function mountTiles(container: HTMLElement, items: GalleryTile[]): void {
  const pending = new Map<Element, { item: GalleryTile; canvasHost: HTMLElement }>();
  const animated = new Map<Element, TrianglesBackground>();

  // Pause animated tiles while off-screen so no rAF loop runs out of view.
  const animationToggle = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      animated.get(entry.target)?.setOptions({ animate: entry.isIntersecting });
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = pending.get(entry.target);
        observer.unobserve(entry.target);
        pending.delete(entry.target);
        if (!target) continue;
        // Canvas keeps 20+ live previews below the browser's WebGL context cap.
        const background = new TrianglesBackground(target.canvasHost, { ...target.item.options, renderer: 'canvas' });
        if (target.item.options.animate) {
          animated.set(entry.target, background);
          animationToggle.observe(entry.target);
        }
      }
    },
    { rootMargin: '200px' }
  );

  const scaler = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const canvasHost = entry.target.querySelector<HTMLElement>('.example-canvas');
      if (!canvasHost) continue;
      // clientWidth, not contentRect: demo tiles have padding the surface must still cover.
      canvasHost.style.transform = `translate(-50%, -50%) scale(${(entry.target as HTMLElement).clientWidth / SURFACE_WIDTH})`;
    }
  });

  for (const item of items) {
    const { tile, surface, canvasHost } = createTile(item);
    container.append(tile);
    pending.set(surface, { item, canvasHost });
    observer.observe(surface);
    scaler.observe(surface);
  }
}

export function mountGallery(container: HTMLElement): void {
  mountTiles(container, GALLERY_EXAMPLES.map((example) => ({ ...example, snippet: formatSnippet(example.options) })));
}

export function mountUsage(container: HTMLElement): void {
  mountTiles(container, USAGE_EXAMPLES.map((example) => ({
    name: example.name,
    options: example.options,
    snippet: example.snippet,
    demoClass: example.rootClass,
    demoHtml: example.demoHtml
  })));
}
