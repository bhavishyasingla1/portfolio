/**
 * Adds the shared "world shell" to each 3D world page, in both the built copy (public/<world>/index.html)
 * and its source, so a rebuild keeps it:
 *   - the page title and description as visually hidden text (no loading screen is drawn over the world)
 *   - structured data that credits Bruno Simon as creator and Bhavishya as contributor
 *   - Google Analytics only (no session recording inside the 3D scenes), skipped for Global Privacy Control
 *   - preload hints for each world's heaviest files
 *   - the exit button in the site's blue accent
 * Safe to run again: every block it writes sits between markers and is replaced, not duplicated.
 * Run: node scripts/worlds/shell.js   (scripts/build-experiences.js runs it after each build)
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { WORLDS } from '../../src/config/case-studies.js';

const ROOT = process.cwd();
const SITE = 'https://bhavishyasingla.com';

const FILES = {
  room: { pub: 'public/room/index.html', src: 'experiences/my-room-in-3d/src/index.html' },
  world: { pub: 'public/world/index.html', src: 'experiences/infinite-world/index.html' },
  folio: { pub: 'public/folio/index.html', src: 'experiences/folio-2019/src/index.html' }
};

// Heavy files each world always needs. Preloading starts the downloads before the 3D code has parsed.
const PRELOADS = {
  room: [
    ['assets/roomModel.glb', 'fetch'],
    ['assets/bakedDay.jpg', 'image'],
    ['assets/bakedNight.jpg', 'image'],
    ['assets/bakedNeutral.jpg', 'image'],
    ['assets/lightMap.jpg', 'image']
  ],
  world: [['models/player.glb', 'fetch']],
  folio: [
    ['draco/draco_decoder.wasm', 'fetch'],
    ['models/crossroads/static/base.glb', 'fetch']
  ]
};

const block = (name, html) => `<!-- ${name}:start -->\n${html}\n<!-- ${name}:end -->`;
const blockRe = (name) => new RegExp(`\\s*<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`, 'g');

// Google Analytics only (no session recording inside a 3D scene); public/consent.js handles the visitor's choice
const ANALYTICS = `<script src="/consent.js" data-ga-only defer></script>`;

const SHELL_CSS = `<style>
  /* The page's title and description, for search engines and screen readers. Nothing is drawn over the
     world: a full-screen title card used to flash here for a moment and could not be read in time. */
  .ws{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}
  .exit-control:hover{background-color:#2f55ff!important;border-color:#2f55ff!important;color:#fff!important;box-shadow:0 0 20px rgba(64,104,255,.6)!important}
</style>`;

function shellHtml(w) {
  return `${SHELL_CSS}
<div id="ws" class="ws">
  <h1>${w.name}</h1>
  <p>${w.summary}</p>
  <p>Controls: ${w.controls}</p>
  <p>Built on ${w.original.name} by Bruno Simon, changed by Bhavishya Singla.</p>
</div>`;
}

function jsonLd(w) {
  return `<script type="application/ld+json">
${JSON.stringify(
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${SITE}${w.path}#app`,
        url: `${SITE}${w.path}`,
        name: w.full,
        description: w.summary,
        image: `${SITE}${w.image}`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires WebGL and JavaScript.',
        isBasedOn: w.original.url,
        creator: { '@type': 'Person', name: 'Bruno Simon', url: 'https://bruno-simon.com/' },
        contributor: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Bhavishya Singla', url: `${SITE}/` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: '3D Worlds', item: `${SITE}/worlds/` },
          { '@type': 'ListItem', position: 3, name: w.full, item: `${SITE}${w.path}` }
        ]
      }
    ]
  },
  null,
  2
)}
</script>`;
}

function patch(html, w, { id }) {
  let s = html;
  // 1. analytics: drop the old Google tag and Clarity snippets, add the single replacement
  s = s.replace(blockRe('world-analytics'), '');
  s = s.replace(/\s*<!--\s*Google tag \(gtag\.js\)\s*-->/g, '').replace(/\s*<!--\s*(\d+\.\s*)?Microsoft Clarity[^>]*-->/g, '');
  s = s.replace(/\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-8V65GFWC76"><\/script>/g, '');
  s = s.replace(/\s*<script(?: type="text\/javascript")?>(?:(?!<\/script>)[\s\S])*?(?:gtag\(\s*["']config["']|clarity\.ms\/tag)(?:(?!<\/script>)[\s\S])*?<\/script>/g, '');
  s = s.replace(/<head>/i, (m) => `${m}\n${block('world-analytics', ANALYTICS)}`);

  // 2. structured data: one block, with the right credits
  s = s.replace(blockRe('world-schema'), '');
  s = s.replace(/\s*(<!--[^>]*JSON-LD[^>]*-->\s*)?<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  // 3. preloads
  s = s.replace(blockRe('world-preload'), '');
  const preloads = (PRELOADS[id] || [])
    .map(([href, as]) => `<link rel="preload" href="./${href}" as="${as}" crossorigin>`)
    .concat('<link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>')
    .join('\n');
  s = s.replace(/<\/head>/i, `${block('world-schema', jsonLd(w))}\n${block('world-preload', preloads)}\n</head>`);

  // 4. the shell, first thing in <body>
  s = s.replace(blockRe('world-shell'), '');
  s = s.replace(/<body([^>]*)>/i, (m) => `${m}\n${block('world-shell', shellHtml(w))}`);

  // 5. social image and description that match the worlds page
  s = s.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g, `$1${SITE}/og/worlds.png$2`);
  return s;
}

for (const w of WORLDS) {
  const f = FILES[w.id];
  for (const rel of [f.pub, f.src]) {
    const path = join(ROOT, rel);
    if (!existsSync(path)) {
      console.warn(`! missing ${rel}`);
      continue;
    }
    const before = readFileSync(path, 'utf8');
    const after = patch(before, w, { id: w.id });
    if (after !== before) writeFileSync(path, after);
    console.log(`${after !== before ? '✓' : '·'} ${rel}`);
  }
}
