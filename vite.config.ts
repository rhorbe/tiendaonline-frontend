import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3002,
      proxy: {
        '/backend': {
          target: 'https://tiendaonline-backend-git-dev-rhorbes-projects.vercel.app',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              return;
            }

            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }

            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }

            if (id.includes('flowbite')) {
              return 'vendor-flowbite';
            }
          },
        },
      },
    },
  };
});
