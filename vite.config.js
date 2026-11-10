import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, existsSync } from 'fs';
import { PROJECTS } from './src/config/projects.js';

// Pages written by scripts/build-pages.js
const projectPages = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, resolve(__dirname, `${p.slug}.html`)])
);
const projectSlugs = new Set(PROJECTS.map((p) => p.slug));
const articleDir = resolve(__dirname, 'articles');
const articlePages = existsSync(articleDir)
  ? Object.fromEntries(
      readdirSync(articleDir)
        .filter((f) => f.endsWith('.html'))
        .map((f) => [`articles/${f.replace(/\.html$/, '')}`, resolve(articleDir, f)])
    )
  : {};

export default defineConfig({
  base: './',
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
          } else if (url === '/articles') {
            res.writeHead(301, { Location: '/articles/' });
            return res.end();
          } else if (/^\/articles\/[a-z0-9-]+\/?$/.test(url)) {
            // Mirror Cloudflare's clean URLs: /articles/foo -> articles/foo.html
            req.url = `${url.replace(/\/$/, '')}.html`;
          } else if (projectSlugs.has(url.replace(/^\/|\/$/g, ''))) {
            // Mirror Cloudflare's clean URLs: /ringping -> ringping.html
            req.url = `/${url.replace(/^\/|\/$/g, '')}.html`;
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
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...projectPages,
        ...articlePages
      }
    }
  }
});
