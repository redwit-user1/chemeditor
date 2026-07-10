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
  },
});
