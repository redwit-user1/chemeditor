import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ketcher's standalone build ships a WASM Indigo backend loaded through a
// classic Web Worker (used only for editor operations — every displayed
// property comes from the RDKit backend). Vite handles the worker out of the
// box; we only raise the chunk-size warning threshold for the inlined WASM.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      // Forward API calls to the FastAPI + RDKit backend during development.
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 4096,
    commonjsOptions: {
      // Ketcher's bundled UMD deps (raphael, and its optional acorn path) keep
      // bare `require()` calls in their CommonJS branch. Vite's dev server shims
      // these, but the production Rollup build leaves them as `require`, which is
      // undefined in the browser ESM bundle — Raphael then fails to construct and
      // the whole editor (and React tree) unmounts to a blank page. Transforming
      // mixed ES/CJS modules makes Rollup rewrite those requires into imports.
      transformMixedEsModules: true,
    },
  },
});
