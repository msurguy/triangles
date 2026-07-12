# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.0.1

### Fixed

- Moved `tweakpane` from `dependencies` to `devDependencies`. It is only used by
  the playground, never by the published library, so installing `triangles` no
  longer pulls in an unused runtime dependency. This matches the "zero runtime
  dependencies" guarantee.

## 2.0.0

Version 2 is a full rewrite. It is intentionally breaking: the library is now a
dependency-free, framework-agnostic ES module with a single `TrianglesBackground`
public API and a Vite playground.

### Added

- `TrianglesBackground` class as the supported public API, mounting a seeded
  Delaunay surface behind an existing element without touching its content.
- Deterministic output: the same seed, options, and dimensions always produce the
  same pattern, driven by a local seeded PRNG (no global state).
- Renderer selection: `auto`, `webgl`, `canvas`, and `svg`, with `auto` preferring
  WebGL and falling back to Canvas.
- Export primitives: `toBlob` (PNG or SVG) and `toSVGString`. `toBlob` returns a
  `Blob` and never triggers a download, leaving persistence to the caller.
- Instance methods: `setOptions`, `setRenderer`, `resize`, `render`, `getOptions`,
  `getSeed`, `getSnapshot`, and `destroy`.
- Opt-in `pointer` interaction and `animate` mode; animation respects
  `prefers-reduced-motion`.
- Interactive playground (Tweakpane) deployed to GitHub Pages, plus a browser
  IIFE build published for CDN use.
- TypeScript types and Vitest unit coverage for the PRNG and core surface.

### Changed

- Distributed as an ES module (`dist/index.js`) with a named-export IIFE bundle
  (`dist/triangles.iife.js`) for `<script>` usage. Zero runtime dependencies.

### Removed

- The v1 global `FSS` API, dat.GUI control panel, jQuery dependency, keyboard
  bindings, and bundled export/download code.
- Legacy v1 demo assets (`index.html`, `css/`, `js/`, `source/`, `build/`),
  `bower.json`, and `compositor.json`.

### Migration

See the "Migration from v1" section of the README. Replace any use of the old
global `FSS` API with a `TrianglesBackground` instance.
