/**
 * Adds the shared "world shell" to each 3D world page, in both the built copy (public/<world>/index.html)
 * and its source, so a rebuild keeps it:
 *   - an instant title + loading screen with real progress (script: public/world-shell.js)
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
  room: { pub: 'public/room/index.html', src: 'experiences/my-room-in-3d/src/index.html', expected: 36 },
  world: { pub: 'public/world/index.html', src: 'experiences/infinite-world/index.html', expected: 6 },
  folio: { pub: 'public/folio/index.html', src: 'experiences/folio-2019/src/index.html', expected: 130 }
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
  @font-face{font-family:"WS Grotesk";src:url("/fonts/space-grotesk-latin.woff2") format("woff2");font-weight:300 700;font-display:swap}
  .ws{position:fixed;inset:0;z-index:9990;display:flex;align-items:center;background:#0c0c0e;color:#f2f2f4;
    background-image:linear-gradient(to right,rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.055) 1px,transparent 1px);
    background-size:64px 64px;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    transition:opacity .6s cubic-bezier(.16,1,.3,1)}
  .ws.is-done{opacity:0;pointer-events:none}
  .ws-in{width:min(1088px,calc(100% - 48px));margin:0 auto}
  .ws-eyebrow{margin:0 0 20px;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#a1a1aa}
  .ws-eyebrow span{color:#8098ff}
  .ws-title{margin:0 0 24px;font-family:"WS Grotesk","Space Grotesk",sans-serif;font-size:clamp(3rem,11vw,128px);font-weight:700;line-height:.86;letter-spacing:-.045em;text-transform:uppercase}
  .ws-text{max-width:52ch;margin:0 0 14px;font-size:17px;line-height:1.6;color:#d4d4d8}
  .ws-meta{max-width:60ch;margin:0;font-size:13.5px;line-height:1.6;color:#a1a1aa}
  .ws-meta strong{margin-right:8px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#f2f2f4}
  .ws-meta a{color:#f2f2f4;text-underline-offset:3px}
  .ws-bar{height:3px;margin:40px 0 14px;background:rgba(255,255,255,.14);overflow:hidden}
  .ws-bar span{display:block;height:100%;background:#2f55ff;box-shadow:0 0 14px rgba(64,104,255,.8);transform:scaleX(0);transform-origin:left}
  .ws-foot{display:flex;justify-content:space-between;align-items:center;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#a1a1aa}
  .ws-status{margin:0}
  .ws-skip{padding:8px 0;background:none;border:none;font:inherit;letter-spacing:inherit;text-transform:inherit;color:#a1a1aa;cursor:pointer}
  .ws-skip:hover,.ws-skip:focus-visible{color:#fff}
  .exit-control:hover{background-color:#2f55ff!important;border-color:#2f55ff!important;color:#fff!important;box-shadow:0 0 20px rgba(64,104,255,.6)!important}
  @media (max-width:600px){.ws-text{font-size:15.5px}.ws-bar{margin-top:28px}}
  @media (prefers-reduced-motion:reduce){.ws{transition:none}}
</style>`;

function shellHtml(w, expected) {
  return `${SHELL_CSS}
<div id="ws" class="ws" data-expected="${expected}">
  <div class="ws-in">
    <p class="ws-eyebrow"><span>${w.num}</span> &mdash; ${w.kind}</p>
    <h1 class="ws-title">${w.name}</h1>
    <p class="ws-text">${w.summary}</p>
    <p class="ws-meta"><strong>Controls</strong>${w.controls}</p>
    <p class="ws-meta"><strong>Credit</strong>Built on <a href="${w.original.url}" target="_blank" rel="noopener">${w.original.name}</a> by Bruno Simon, changed by Bhavishya Singla. <a href="/worlds/" target="_top">About the worlds</a></p>
    <div class="ws-bar" aria-hidden="true"><span></span></div>
    <div class="ws-foot"><p class="ws-status" role="status">Loading <b>0</b>%</p><button type="button" class="ws-skip">Skip</button></div>
  </div>
</div>
<script src="/world-shell.js" defer></script>`;
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

function patch(html, w, { expected, id }) {
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
  s = s.replace(/<body([^>]*)>/i, (m) => `${m}\n${block('world-shell', shellHtml(w, expected))}`);

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
    const after = patch(before, w, { expected: f.expected, id: w.id });
    if (after !== before) writeFileSync(path, after);
    console.log(`${after !== before ? '✓' : '·'} ${rel}`);
  }
}
