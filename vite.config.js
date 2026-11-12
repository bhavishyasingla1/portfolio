import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, existsSync } from 'fs';
import { PROJECTS } from './src/config/projects.js';
import { STATIC_PAGES } from './src/config/pages.js';

// Pages written by scripts/build-pages.js
const projectPages = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, resolve(__dirname, `${p.slug}.html`)])
);
// Project pages plus the other generated pages that get clean URLs (/contact, /privacy)
const staticPages = Object.fromEntries(STATIC_PAGES.map((s) => [s, resolve(__dirname, `${s}.html`)]));
const projectSlugs = new Set([...PROJECTS.map((p) => p.slug), ...STATIC_PAGES]);
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
          } else if (url === '/articles' || url === '/worlds') {
            res.writeHead(301, { Location: `${url}/` });
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
    // no public source maps
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
        ...projectPages,
        ...staticPages,
        worlds: resolve(__dirname, 'worlds/index.html'),
        ...articlePages
      }
    }
  }
});
