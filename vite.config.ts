import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

const srcRoot = path.resolve(__dirname, './src/');

export default defineConfig({
  root: srcRoot,
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      routes: `${path.resolve(__dirname, './src/routes/')}`,
      services: `${path.resolve(__dirname, './src/services/')}`
    }
  },
  build: {
    outDir: path.resolve(srcRoot, '/out'),
    emptyOutDir: true,
    rollupOptions: {}
  },
  server: {
    port: process.env.PORT === undefined ? 3000 : +process.env.PORT
  },
  optimizeDeps: {
    exclude: ['path']
  }
});
