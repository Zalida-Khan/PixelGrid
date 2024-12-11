import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@tensorflow/tfjs') || id.includes('@tensorflow-models/mobilenet')) {
            return 'tensorflow';
          }
        }
      }
    }
  }
});

