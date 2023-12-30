/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  publicDir: 'src/public',
  overrides: {
    vite: {
      rollup: 'npm:@rollup/wasm-node',
    },
  },
});
