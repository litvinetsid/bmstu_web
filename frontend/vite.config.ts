import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8080/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

