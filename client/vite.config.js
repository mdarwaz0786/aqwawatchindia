import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/",
  server: {
    host: true,
    proxy: {
      "/api": "https://aquawatchindia.com",
    },
  },
  plugins: [react()],
});
