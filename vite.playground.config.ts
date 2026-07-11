import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const repositoryBase = process.env.GITHUB_ACTIONS ? '/triangles/' : '/';

export default defineConfig({
  root: 'playground',
  base: process.env.VITE_BASE_PATH ?? repositoryBase,
  resolve: {
    alias: {
      triangles: fileURLToPath(new URL('./src/index.ts', import.meta.url))
    }
  },
  build: {
    outDir: '../site-dist',
    emptyOutDir: true
  }
});
