import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/admin",
  server: {
    host: true,
    proxy: {
      "/api": "http://145.223.18.56:3004",
    },
  },
  plugins: [react()],
});
