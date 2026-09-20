import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    entries: ['index.html'],
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/experiences/**', '**/dist/**']
    }
  },
  plugins: [
    {
      name: 'experience-subpath-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          if (url === '/room' || url === '/room/') {
            req.url = '/room/index.html';
          } else if (url === '/world' || url === '/world/') {
            req.url = '/world/index.html';
          } else if (url === '/folio' || url === '/folio/') {
            req.url = '/folio/index.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  }
});
