/**
 * bhavishyasingla.com edge worker
 * Runs before the static files (wrangler.jsonc → assets.run_worker_first) to make every
 * redirect permanent (301) and to send all traffic to one canonical host. Everything else
 * is served untouched from the built site in ./dist.
 *
 *   www.bhavishyasingla.com/*, *.workers.dev/*  → https://bhavishyasingla.com/*
 *   /room  /world  /folio  /articles        → same path + "/"
 *   /index.html, /room/index.html, …        → the folder URL
 *   /ringping.html, /articles/foo.html      → the clean URL (/ringping, /articles/foo)
 *   retired URLs (see MOVED)                → their replacement
 */

const CANONICAL_HOST = 'bhavishyasingla.com';

// Pages that were removed or renamed → where their visitors (and Google) should go now
const MOVED = {
  '/articles/avatar-23mb-to-half-a-megabyte': '/articles/bruno-simon-3d-worlds-portfolio',
  '/hero-image.mp4': '/',
  '/hero-image-mobile.mp4': '/'
};

const FOLDERS = new Set(['/room', '/world', '/folio', '/articles']);

function redirectTarget(url) {
  const path = url.pathname;
  if (MOVED[path]) return MOVED[path];
  if (FOLDERS.has(path)) return `${path}/`;
  if (path === '/index.html') return '/';
  if (path.endsWith('/index.html')) return path.slice(0, -'index.html'.length);
  // clean URLs for generated pages, but leave the 3D worlds' own files alone
  if (path.endsWith('.html') && !/^\/(room|world|folio)\//.test(path)) return path.slice(0, -'.html'.length);
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // One host, always https: www, the workers.dev copy and any other alias all point home
    // (local `wrangler dev` on localhost is left alone)
    if (url.hostname !== CANONICAL_HOST && !/^(localhost|127\.0\.0\.1)$/.test(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    const target = redirectTarget(url);
    if (target && target !== url.pathname) {
      return Response.redirect(`https://${CANONICAL_HOST}${target}${url.search}`, 301);
    }

    return env.ASSETS.fetch(request);
  }
};
