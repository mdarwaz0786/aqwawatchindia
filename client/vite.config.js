import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  server: {
    host: true,
    proxy: {
      "/api": "http://72.62.194.82:8000",
    },
  },
  plugins: [react()],
});
