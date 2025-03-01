import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path
        }
      }
    },
    build: {
      outDir: 'dist',
    },
    resolve: {
      mainFields: ['module', 'main'],
      alias: {
        '@': '/src'
      }
    },
    define: {
      'import.meta.env.VITE_API_BASE': JSON.stringify(env.VITE_API_BASE || '/api')
    }
  };
});