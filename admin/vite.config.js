import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/admin/",
  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [react()],
});
