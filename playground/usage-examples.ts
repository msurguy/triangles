import { formatOptionsLiteral, type GalleryOptions } from './examples';

export interface UsageExample {
  name: string;
  rootClass: string;
  demoHtml: string;
  snippet: string;
  options: GalleryOptions;
}

function usageSnippet(html: string, css: string, selector: string, options: GalleryOptions): string {
  return [
    html,
    '',
    '<style>',
    css,
    '</style>',
    '',
    '<script type="module">',
    "  import TrianglesBackground from 'triangles';",
    '',
    `  new TrianglesBackground(document.querySelector('${selector}'), ${formatOptionsLiteral(options, '  ')});`,
    '</script>',
    ''
  ].join('\n');
}

const HERO_OPTIONS: GalleryOptions = {
  seed: 'hero-dawn',
  density: 150,
  depth: 130,
  meshAmbient: '#40263a',
  meshDiffuse: '#fff1e6',
  lights: [
    { ambient: '#8a1b61', diffuse: '#ff9f1c', x: -0.35, y: 0.4, z: 180 },
    { ambient: '#274c77', diffuse: '#62b6cb', x: 0.45, y: -0.35, z: 130 }
  ]
};

const ARTICLE_OPTIONS: GalleryOptions = {
  seed: 'quiet-reader',
  density: 220,
  depth: 50,
  meshAmbient: '#8a9b8e',
  meshDiffuse: '#ffffff',
  lights: [
    { ambient: '#5f7470', diffuse: '#e8f1ef', x: -0.3, y: 0.5, z: 220 }
  ]
};

const CARD_OPTIONS: GalleryOptions = {
  seed: 'card-ember',
  density: 260,
  depth: 120,
  meshAmbient: '#2b0f0e',
  meshDiffuse: '#ffffff',
  lights: [
    { ambient: '#7a1e05', diffuse: '#ff7b00', x: -0.4, y: 0.5, z: 160 },
    { ambient: '#3d0c02', diffuse: '#ffb703', x: 0.5, y: -0.3, z: 120 }
  ]
};

const CTA_OPTIONS: GalleryOptions = {
  seed: 'cta-violet',
  density: 320,
  depth: 90,
  meshAmbient: '#10002b',
  meshDiffuse: '#f2ebfb',
  lights: [
    { ambient: '#3c096c', diffuse: '#9d4edd', x: -0.4, y: 0.45, z: 150 },
    { ambient: '#240046', diffuse: '#c77dff', x: 0.5, y: -0.4, z: 120 }
  ]
};

const QUOTE_OPTIONS: GalleryOptions = {
  seed: 'quiet-harbor',
  density: 130,
  depth: 70,
  meshAmbient: '#04141f',
  meshDiffuse: '#e0fbfc',
  lights: [
    { ambient: '#0a2463', diffuse: '#3e92cc', x: -0.3, y: 0.6, z: 200 },
    { ambient: '#022b3a', diffuse: '#1f7a8c', x: 0.55, y: -0.4, z: 140 }
  ]
};

const STATS_OPTIONS: GalleryOptions = {
  seed: 'ship-metrics',
  density: 180,
  depth: 160,
  meshAmbient: '#12263a',
  meshDiffuse: '#f8fdff',
  lights: [
    { ambient: '#2e5266', diffuse: '#9ad1d4', x: -0.45, y: 0.55, z: 210 },
    { ambient: '#1b3a4b', diffuse: '#e0fbfc', x: 0.6, y: -0.25, z: 160 }
  ]
};

const MULTIPLY_OPTIONS: GalleryOptions = {
  seed: 'blend-multiply',
  density: 200,
  depth: 140,
  meshAmbient: '#8c8c8c',
  meshDiffuse: '#ffffff',
  lights: [
    { ambient: '#555555', diffuse: '#ffffff', x: -0.3, y: 0.5, z: 190 }
  ]
};

const SCREEN_OPTIONS: GalleryOptions = {
  seed: 'blend-screen',
  density: 260,
  depth: 100,
  meshAmbient: '#0a0a12',
  meshDiffuse: '#e8f8ff',
  lights: [
    { ambient: '#0f4c5c', diffuse: '#4cc9f0', x: -0.5, y: 0.4, z: 150 },
    { ambient: '#5f0f40', diffuse: '#f72585', x: 0.55, y: -0.4, z: 120 }
  ]
};

const OVERLAY_OPTIONS: GalleryOptions = {
  seed: 'blend-overlay',
  density: 150,
  depth: 120,
  meshAmbient: '#7f7f7f',
  meshDiffuse: '#ffffff',
  lights: [
    { ambient: '#4a4a4a', diffuse: '#f0f0f0', x: -0.35, y: 0.45, z: 180 }
  ]
};

const LUMINOSITY_OPTIONS: GalleryOptions = {
  seed: 'blend-luminosity',
  density: 120,
  depth: 180,
  meshAmbient: '#2e2e2e',
  meshDiffuse: '#b5b5b5',
  lights: [
    { ambient: '#232323', diffuse: '#8f8f8f', x: -0.4, y: 0.5, z: 170 },
    { ambient: '#141414', diffuse: '#6f6f6f', x: 0.5, y: -0.35, z: 130 }
  ]
};

const BLUR_OPTIONS: GalleryOptions = {
  seed: 'soft-focus',
  density: 90,
  depth: 140,
  meshAmbient: '#020c1b',
  meshDiffuse: '#e6fffa',
  lights: [
    { ambient: '#064e3b', diffuse: '#34d399', x: -0.5, y: 0.6, z: 190 },
    { ambient: '#1e1b4b', diffuse: '#818cf8', x: 0.35, y: -0.45, z: 150 }
  ]
};

const FROST_OPTIONS: GalleryOptions = {
  seed: 'frosted-glass',
  density: 240,
  depth: 120,
  meshAmbient: '#2b0f0e',
  meshDiffuse: '#ffffff',
  lights: [
    { ambient: '#7a1e05', diffuse: '#ff7b00', x: -0.4, y: 0.5, z: 160 },
    { ambient: '#3d0c02', diffuse: '#ffb703', x: 0.5, y: -0.3, z: 120 }
  ]
};

const ANIMATE_OPTIONS: GalleryOptions = {
  seed: 'living-surface',
  density: 110,
  depth: 200,
  meshAmbient: '#0d1b2a',
  meshDiffuse: '#e0fbfc',
  animate: true,
  lights: [
    { ambient: '#1b4965', diffuse: '#62b6cb', x: -0.4, y: 0.5, z: 180 },
    { ambient: '#5f0f40', diffuse: '#ff6d00', x: 0.5, y: -0.35, z: 140 }
  ]
};

const POINTER_OPTIONS: GalleryOptions = {
  seed: 'follow-the-light',
  density: 140,
  depth: 140,
  meshAmbient: '#101010',
  meshDiffuse: '#ffffff',
  pointer: true,
  lights: [
    { ambient: '#3a0ca3', diffuse: '#f72585', x: 0, y: 0, z: 130 },
    { ambient: '#03071e', diffuse: '#4361ee', x: -0.6, y: -0.6, z: 220 }
  ]
};

export const USAGE_EXAMPLES: UsageExample[] = [
  {
    name: 'Animated surface (animate: true)',
    rootClass: 'demo-animate',
    options: ANIMATE_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Interactive &middot; animate</p>
        <h3>A surface that breathes</h3>
        <p class="demo-body">animate: true gently modulates the surface depth over time. Users who prefer reduced motion get a static pattern.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="living">
  <div class="living-content">
    <h1>A surface that breathes</h1>
    <p>animate gently modulates the surface depth; reduced-motion users get a static pattern.</p>
  </div>
</section>`,
      `  .living { position: relative; overflow: hidden; color: #e0fbfc; padding: 5rem 3rem; }
  .living-content { position: relative; max-width: 34rem; }
  .living h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .living p { font-size: 1.125rem; line-height: 1.6; margin: 0; }`,
      '.living',
      ANIMATE_OPTIONS
    )
  },
  {
    name: 'Pointer-driven light (pointer: true)',
    rootClass: 'demo-pointer',
    options: POINTER_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Interactive &middot; pointer</p>
        <h3>Light follows your cursor</h3>
        <p class="demo-body">pointer: true steers the first light with the pointer. Move your mouse across this tile.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="spotlight">
  <div class="spotlight-content">
    <h1>Light follows your cursor</h1>
    <p>Pointer events from child content bubble to the host, so the whole section reacts.</p>
  </div>
</section>`,
      `  .spotlight { position: relative; overflow: hidden; color: #fdf0ff; padding: 5rem 3rem; }
  .spotlight-content { position: relative; max-width: 34rem; }
  .spotlight h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .spotlight p { font-size: 1.125rem; line-height: 1.6; margin: 0; }`,
      '.spotlight',
      POINTER_OPTIONS
    )
  },
  {
    name: 'Hero with gradient scrim',
    rootClass: 'demo-hero',
    options: HERO_OPTIONS,
    demoHtml: `
      <div class="demo-scrim"></div>
      <div class="demo-content">
        <p class="demo-eyebrow">Product</p>
        <h3>Depth without image assets</h3>
        <p class="demo-body">The same seed renders the same pattern on every visit, at any size.</p>
        <p class="demo-actions"><span class="demo-button">Get started</span><span class="demo-button demo-button-ghost">Read the docs</span></p>
      </div>`,
    snippet: usageSnippet(
      `<section class="hero">
  <div class="hero-scrim"></div>
  <div class="hero-content">
    <p class="hero-eyebrow">Product</p>
    <h1>Depth without image assets</h1>
    <p>The same seed renders the same pattern on every visit, at any size.</p>
    <a href="#">Get started</a>
  </div>
</section>`,
      `  .hero { position: relative; overflow: hidden; color: #fff8f0; padding: 6rem 3rem; }
  .hero-scrim { position: absolute; inset: 0; background: linear-gradient(100deg, rgba(12, 10, 18, 0.88) 15%, rgba(12, 10, 18, 0.2)); }
  .hero-content { position: relative; max-width: 36rem; }
  .hero-eyebrow { font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  .hero h1 { font-size: 3rem; line-height: 1.05; margin: 0 0 1rem; }
  .hero p { font-size: 1.125rem; line-height: 1.6; margin: 0 0 2rem; }
  .hero a { background: #ffb703; border-radius: 6px; color: #1d1128; display: inline-block; font-weight: 700; padding: 0.75rem 1.25rem; text-decoration: none; }`,
      '.hero',
      HERO_OPTIONS
    )
  },
  {
    name: 'Faded article background (opacity 0.2)',
    rootClass: 'demo-article',
    options: ARTICLE_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <h3>Working with seeds</h3>
        <p class="demo-body">Give the background a fixed seed and it becomes part of your design system: reviewable, diffable, reproducible.</p>
        <p class="demo-body">Fade the injected element with CSS to keep long-form text readable.</p>
      </div>`,
    snippet: usageSnippet(
      `<article class="article">
  <div class="article-inner">
    <h1>Working with seeds</h1>
    <p>Give the background a fixed seed and it becomes part of your design system: reviewable, diffable, reproducible.</p>
    <p>Fade the injected element with CSS to keep long-form text readable.</p>
  </div>
</article>`,
      `  .article { position: relative; overflow: hidden; background: #f6f7f2; color: #1f2a24; padding: 4rem 2rem; }
  /* The library tags its element, so it can be faded without extra markup. */
  .article [data-triangles-background] { opacity: 0.2; }
  .article-inner { margin: 0 auto; max-width: 42rem; position: relative; }
  .article h1 { font-size: 2.25rem; margin: 0 0 1rem; }
  .article p { font-size: 1.0625rem; line-height: 1.7; }`,
      '.article',
      ARTICLE_OPTIONS
    )
  },
  {
    name: 'Feature card with bottom scrim',
    rootClass: 'demo-card',
    options: CARD_OPTIONS,
    demoHtml: `
      <div class="demo-scrim"></div>
      <div class="demo-content">
        <h3>Realtime previews</h3>
        <p class="demo-body">Every card in a collection can carry its own seed, so grids stay varied without art direction.</p>
        <p class="demo-actions"><span class="demo-link">Learn more &rarr;</span></p>
      </div>`,
    snippet: usageSnippet(
      `<div class="card">
  <div class="card-scrim"></div>
  <div class="card-content">
    <h2>Realtime previews</h2>
    <p>Every card in a collection can carry its own seed, so grids stay varied without art direction.</p>
    <a href="#">Learn more &rarr;</a>
  </div>
</div>`,
      `  .card { border-radius: 12px; color: #fff4ec; display: flex; flex-direction: column; justify-content: flex-end; min-height: 20rem; overflow: hidden; padding: 1.5rem; position: relative; width: 20rem; }
  .card-scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(13, 8, 6, 0) 25%, rgba(13, 8, 6, 0.92) 80%); }
  .card-content { position: relative; }
  .card h2 { font-size: 1.25rem; margin: 0 0 0.5rem; }
  .card p { font-size: 0.9375rem; line-height: 1.5; margin: 0 0 1rem; }
  .card a { color: #ffd166; font-weight: 700; text-decoration: none; }`,
      '.card',
      CARD_OPTIONS
    )
  },
  {
    name: 'Call-to-action banner',
    rootClass: 'demo-cta',
    options: CTA_OPTIONS,
    demoHtml: `
      <div class="demo-scrim"></div>
      <div class="demo-content">
        <h3>Start shipping seeded backgrounds</h3>
        <p class="demo-body">One dependency, three renderers, zero image requests.</p>
        <p class="demo-actions"><span class="demo-button">Install triangles</span></p>
      </div>`,
    snippet: usageSnippet(
      `<section class="cta">
  <div class="cta-scrim"></div>
  <div class="cta-content">
    <h2>Start shipping seeded backgrounds</h2>
    <p>One dependency, three renderers, zero image requests.</p>
    <a href="#">Install triangles</a>
  </div>
</section>`,
      `  .cta { align-items: center; color: #f3ecff; display: flex; flex-direction: column; justify-content: center; min-height: 18rem; overflow: hidden; padding: 3rem 2rem; position: relative; text-align: center; }
  .cta-scrim { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(13, 2, 33, 0.85), rgba(13, 2, 33, 0.25) 75%); }
  .cta-content { position: relative; max-width: 32rem; }
  .cta h2 { font-size: 2rem; margin: 0 0 0.75rem; }
  .cta p { margin: 0 0 1.5rem; }
  .cta a { background: #c77dff; border-radius: 6px; color: #10002b; display: inline-block; font-weight: 700; padding: 0.75rem 1.5rem; text-decoration: none; }`,
      '.cta',
      CTA_OPTIONS
    )
  },
  {
    name: 'Testimonial on faded surface',
    rootClass: 'demo-quote',
    options: QUOTE_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-blockquote">&ldquo;We replaced four hero JPEGs with one seed.&rdquo;</p>
        <p class="demo-attrib">&mdash; Dana K., design systems lead</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="quote">
  <div class="quote-inner">
    <blockquote>&ldquo;We replaced four hero JPEGs with one seed.&rdquo;</blockquote>
    <cite>&mdash; Dana K., design systems lead</cite>
  </div>
</section>`,
      `  .quote { background: #0b1416; color: #e6f4f1; overflow: hidden; padding: 4rem 2rem; position: relative; }
  .quote [data-triangles-background] { opacity: 0.25; }
  .quote-inner { margin: 0 auto; max-width: 38rem; position: relative; }
  .quote blockquote { font-size: 1.5rem; line-height: 1.4; margin: 0 0 1rem; }
  .quote cite { color: #9fb8b2; font-style: normal; }`,
      '.quote',
      QUOTE_OPTIONS
    )
  },
  {
    name: 'Stats band',
    rootClass: 'demo-stats',
    options: STATS_OPTIONS,
    demoHtml: `
      <div class="demo-scrim"></div>
      <div class="demo-content demo-metrics">
        <div><strong>48k</strong><span>renders / day</span></div>
        <div><strong>0</strong><span>image assets</span></div>
        <div><strong>1</strong><span>seed per brand</span></div>
      </div>`,
    snippet: usageSnippet(
      `<section class="stats">
  <div class="stats-scrim"></div>
  <div class="stats-grid">
    <div><strong>48k</strong><span>renders / day</span></div>
    <div><strong>0</strong><span>image assets</span></div>
    <div><strong>1</strong><span>seed per brand</span></div>
  </div>
</section>`,
      `  .stats { color: #f2fbff; overflow: hidden; padding: 3rem 2rem; position: relative; }
  .stats-scrim { position: absolute; inset: 0; background: rgba(6, 14, 18, 0.6); }
  .stats-grid { display: flex; gap: 3rem; justify-content: center; position: relative; text-align: center; }
  .stats strong { display: block; font-size: 2.5rem; }
  .stats span { color: #bcd7de; font-size: 0.875rem; }`,
      '.stats',
      STATS_OPTIONS
    )
  },
  {
    name: 'Multiply blend over gradient',
    rootClass: 'demo-multiply',
    options: MULTIPLY_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Blend modes</p>
        <h3>Shade any gradient</h3>
        <p class="demo-body">A grayscale pattern with mix-blend-mode: multiply darkens the host's gradient into facets.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="shade">
  <div class="shade-content">
    <h1>Shade any gradient</h1>
    <p>A grayscale pattern with multiply blends into the host's own gradient.</p>
  </div>
</section>`,
      `  .shade { position: relative; overflow: hidden; background: linear-gradient(120deg, #ffb703, #ff0062); color: #fff7f0; padding: 5rem 3rem; }
  /* Grayscale triangles darken the gradient behind them. */
  .shade [data-triangles-background] { mix-blend-mode: multiply; }
  .shade-content { position: relative; max-width: 34rem; }
  .shade h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .shade p { font-size: 1.125rem; line-height: 1.6; margin: 0; }`,
      '.shade',
      MULTIPLY_OPTIONS
    )
  },
  {
    name: 'Screen blend glow on dark',
    rootClass: 'demo-screen',
    options: SCREEN_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Blend modes</p>
        <h3>Neon from the shadows</h3>
        <p class="demo-body">mix-blend-mode: screen keeps only the light parts, so the pattern glows out of a near-black surface.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="glow">
  <div class="glow-content">
    <h1>Neon from the shadows</h1>
    <p>Screen keeps only the light parts, so the pattern glows out of a near-black surface.</p>
  </div>
</section>`,
      `  .glow { position: relative; overflow: hidden; background: #050a14; color: #e8f8ff; padding: 5rem 3rem; }
  .glow [data-triangles-background] { mix-blend-mode: screen; }
  .glow-content { position: relative; max-width: 34rem; }
  .glow h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .glow p { font-size: 1.125rem; line-height: 1.6; margin: 0; }`,
      '.glow',
      SCREEN_OPTIONS
    )
  },
  {
    name: 'Overlay texture on brand color',
    rootClass: 'demo-overlay',
    options: OVERLAY_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Blend modes</p>
        <h3>Texture, same brand color</h3>
        <p class="demo-body">Overlay at low opacity embosses the surface while the underlying brand color stays exact.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="brand">
  <div class="brand-content">
    <h1>Texture, same brand color</h1>
    <p>Overlay at low opacity embosses the surface while the underlying brand color stays exact.</p>
  </div>
</section>`,
      `  .brand { position: relative; overflow: hidden; background: #0f766e; color: #f0fdfa; padding: 5rem 3rem; }
  .brand [data-triangles-background] { mix-blend-mode: overlay; opacity: 0.5; }
  .brand-content { position: relative; max-width: 34rem; }
  .brand h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .brand p { font-size: 1.125rem; line-height: 1.6; margin: 0; }`,
      '.brand',
      OVERLAY_OPTIONS
    )
  },
  {
    name: 'Luminosity faceted gradient',
    rootClass: 'demo-luminosity',
    options: LUMINOSITY_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Blend modes</p>
        <h3>Facets take the gradient's color</h3>
        <p class="demo-body">mix-blend-mode: luminosity keeps the pattern's light and shade but recolors it with the host gradient.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="facet">
  <div class="facet-content">
    <h1>Facets take the gradient's color</h1>
    <p>Luminosity keeps the pattern's light and shade but recolors it with the host gradient.</p>
  </div>
</section>`,
      `  .facet { position: relative; overflow: hidden; background: linear-gradient(135deg, #7c3aed, #06b6d4); color: #f5f3ff; padding: 5rem 3rem; }
  .facet [data-triangles-background] { mix-blend-mode: luminosity; }
  .facet-content { position: relative; max-width: 34rem; }
  .facet h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .facet p { font-size: 1.125rem; line-height: 1.6; margin: 0; }`,
      '.facet',
      LUMINOSITY_OPTIONS
    )
  },
  {
    name: 'Soft-focus blurred background',
    rootClass: 'demo-blur',
    options: BLUR_OPTIONS,
    demoHtml: `
      <div class="demo-content">
        <p class="demo-eyebrow">Blur</p>
        <h3>Sharp words, soft surface</h3>
        <p class="demo-body">Blurring the injected element melts the pattern into an aurora while the text stays crisp.</p>
        <p class="demo-actions"><span class="demo-button">Try it</span></p>
      </div>`,
    snippet: usageSnippet(
      `<section class="soft">
  <div class="soft-content">
    <h1>Sharp words, soft surface</h1>
    <p>Blurring the injected element melts the pattern into an aurora while the text stays crisp.</p>
    <a href="#">Try it</a>
  </div>
</section>`,
      `  .soft { position: relative; overflow: hidden; background: #020c1b; color: #e6fffa; padding: 5rem 3rem; }
  /* Scale hides the transparent fringe the blur creates at the edges. */
  .soft [data-triangles-background] { filter: blur(28px); transform: scale(1.2); }
  .soft-content { position: relative; max-width: 34rem; }
  .soft h1 { font-size: 2.5rem; margin: 0 0 1rem; }
  .soft p { font-size: 1.125rem; line-height: 1.6; margin: 0 0 2rem; }
  .soft a { background: #34d399; border-radius: 6px; color: #022c22; display: inline-block; font-weight: 700; padding: 0.75rem 1.25rem; text-decoration: none; }`,
      '.soft',
      BLUR_OPTIONS
    )
  },
  {
    name: 'Frosted glass panel',
    rootClass: 'demo-frost',
    options: FROST_OPTIONS,
    demoHtml: `
      <div class="demo-glass">
        <p class="demo-eyebrow">Blur</p>
        <h3>Frosted glass</h3>
        <p class="demo-body">backdrop-filter blurs only the pattern behind the panel, leaving the rest of the background sharp.</p>
      </div>`,
    snippet: usageSnippet(
      `<section class="frost">
  <div class="frost-panel">
    <h2>Frosted glass</h2>
    <p>backdrop-filter blurs only the pattern behind the panel, leaving the rest of the background sharp.</p>
  </div>
</section>`,
      `  .frost { align-items: center; display: flex; justify-content: center; min-height: 24rem; overflow: hidden; padding: 3rem 2rem; position: relative; }
  .frost-panel { backdrop-filter: blur(14px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 12px; color: #fff7f0; max-width: 26rem; padding: 2rem; position: relative; }
  .frost h2 { font-size: 1.5rem; margin: 0 0 0.75rem; }
  .frost p { font-size: 1rem; line-height: 1.6; margin: 0; }`,
      '.frost',
      FROST_OPTIONS
    )
  }
];
