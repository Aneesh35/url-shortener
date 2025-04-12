import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    // ✅ This ensures proper routing during local development
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
  }
});
