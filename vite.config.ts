import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      name: 'Triangles',
      formats: ['es', 'iife'],
      fileName: (format) => format === 'es' ? 'index.js' : 'triangles.iife.js'
    },
    rollupOptions: {
      output: { exports: 'named' }
    }
  }
});
