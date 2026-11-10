/**
 * Share-image renderer (1200 × 630 PNG) for link previews on LinkedIn, X, WhatsApp, Slack…
 * Uses satori (layout → SVG) and resvg (SVG → PNG). Called by scripts/build-pages.js.
 * Output: public/og/<name>.png
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { createHash } from 'crypto';

const ROOT = process.cwd();
const OUT = join(ROOT, 'public', 'og');
const FONT_DIR = join(ROOT, 'scripts', 'og', 'fonts');
// Fingerprints of the last render, so unchanged images are skipped (kept out of public/)
const STAMPS = join(ROOT, 'scripts', 'og', '.cache');

const fonts = [
  { name: 'Space Grotesk', data: readFileSync(join(FONT_DIR, 'SpaceGrotesk-Bold.ttf')), weight: 700, style: 'normal' },
  { name: 'Inter', data: readFileSync(join(FONT_DIR, 'Inter-Medium.ttf')), weight: 500, style: 'normal' },
  { name: 'Inter', data: readFileSync(join(FONT_DIR, 'Inter-SemiBold.ttf')), weight: 600, style: 'normal' },
  // One-glyph fallback for ₹ (missing from the Latin subsets above), Inter Bold, SIL OFL
  { name: 'Rupee', data: readFileSync(join(FONT_DIR, 'Inter-Rupee.ttf')), weight: 700, style: 'normal' }
];

// satori only reads PNG/JPEG, so every image is normalised to PNG with sharp first
// (lets article covers be JPG, PNG or WebP).
const dataUri = async (publicPath, width) => {
  const file = join(ROOT, 'public', publicPath.replace(/^\//, ''));
  let img = sharp(file);
  if (width) img = img.resize({ width, withoutEnlargement: true });
  const png = await img.png().toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
};

// Tiny hyperscript so layouts read like markup
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.flat().filter((c) => c !== null && c !== false) }
});
const img = (src, style) => ({ type: 'img', props: { src, style, width: style.width, height: style.height } });

const THEMES = {
  light: { bg: '#f2f2f4', ink: '#000000', muted: '#555555', faint: '#888888', grid: 'rgba(0,0,0,0.07)', tile: '#ffffff', tileLine: 'rgba(0,0,0,0.14)' },
  dark: { bg: '#0c0c0e', ink: '#f2f2f4', muted: '#a1a1aa', faint: '#71717a', grid: 'rgba(255,255,255,0.07)', tile: '#151518', tileLine: 'rgba(255,255,255,0.16)' }
};
const NEON = '#00ff66';

function frame(t, children) {
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      flexDirection: 'column',
      backgroundColor: t.bg,
      backgroundImage: `linear-gradient(to right, ${t.grid} 1px, transparent 1px), linear-gradient(to bottom, ${t.grid} 1px, transparent 1px)`,
      backgroundSize: '63px 63px',
      padding: '56px 72px',
      fontFamily: 'Inter',
      color: t.ink
    },
    children
  );
}

function topBar(t, right) {
  return h(
    'div',
    { justifyContent: 'space-between', alignItems: 'center', width: '100%' },
    h('div', { fontFamily: 'Space Grotesk', fontSize: 20, letterSpacing: 4 }, 'BHAVISHYA SINGLA'),
    h('div', { fontSize: 18, color: t.faint, letterSpacing: 1 }, right)
  );
}

function eyebrow(t, num, text) {
  return h(
    'div',
    { fontSize: 20, fontWeight: 600, letterSpacing: 4, color: t.muted, textTransform: 'uppercase', marginBottom: 26 },
    num ? h('span', { color: t.ink, marginRight: 14 }, num) : null,
    num ? h('span', { marginRight: 14 }, '—') : null,
    text
  );
}

async function projectCard(p) {
  const logo = await dataUri(p.logoPng, 600);
  const t = THEMES.light;
  const lines = p.headline;
  const size = Math.max(...lines.map((l) => l.length)) > 7 ? 112 : 128;
  return frame(t, [
    topBar(t, `bhavishyasingla.com/${p.slug}`),
    h(
      'div',
      { flex: 1, alignItems: 'center', justifyContent: 'space-between', width: '100%' },
      h(
        'div',
        { flexDirection: 'column', maxWidth: 700 },
        eyebrow(t, p.num, p.tag),
        h(
          'div',
          { flexDirection: 'column', fontFamily: 'Space Grotesk', fontSize: size, lineHeight: 0.88, letterSpacing: -5, marginBottom: 30 },
          lines.map((l) => h('div', {}, l))
        ),
        h('div', { fontSize: 24, fontWeight: 500, letterSpacing: 5, color: t.muted, textTransform: 'uppercase' }, p.tagline)
      ),
      h(
        'div',
        {
          width: 300,
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.tile,
          border: `1px solid ${t.tileLine}`,
          overflow: 'hidden'
        },
        img(logo, p.logoCover ? { width: 300, height: 300 } : { width: 184, height: 184 })
      )
    ),
    h(
      'div',
      { alignItems: 'center', fontSize: 18, fontWeight: 600, letterSpacing: 3, color: t.faint },
      h('div', { backgroundColor: NEON, color: '#000', padding: '5px 10px', marginRight: 16 }, p.schemaType === 'Periodical' ? 'NEWSLETTER' : 'PROJECT'),
      p.facts.slice(0, 2).map(([, v]) => v).join('  ·  ').toUpperCase()
    )
  ]);
}

async function articleCard(a) {
  const coverUri = a.image ? await dataUri(a.image, 1200) : null;
  const t = THEMES.dark;
  const hasCover = Boolean(a.image);
  const titleSize = a.title.length > 70 ? 50 : a.title.length > 45 ? 58 : 66;
  const text = h(
    'div',
    { flexDirection: 'column', justifyContent: 'space-between', width: hasCover ? 600 : 1056, height: '100%', padding: hasCover ? '0 48px 0 0' : 0 },
    topBar(t, hasCover ? '' : 'bhavishyasingla.com/articles'),
    h(
      'div',
      { flexDirection: 'column' },
      eyebrow(t, null, `Article · ${a.dateLabel} · ${a.minutes} min read`),
      h('div', { fontFamily: 'Space Grotesk', fontSize: titleSize, lineHeight: 1.04, letterSpacing: -2 }, a.title)
    ),
    h(
      'div',
      { alignItems: 'center', fontSize: 18, fontWeight: 600, letterSpacing: 3, color: t.faint, textTransform: 'uppercase' },
      h('div', { backgroundColor: NEON, color: '#000', padding: '5px 10px', marginRight: 16 }, 'READ'),
      a.tags.slice(0, 3).join('  ·  ')
    )
  );
  if (!hasCover) return frame(t, [text]);
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      backgroundColor: t.bg,
      backgroundImage: `linear-gradient(to right, ${t.grid} 1px, transparent 1px), linear-gradient(to bottom, ${t.grid} 1px, transparent 1px)`,
      backgroundSize: '63px 63px',
      fontFamily: 'Inter',
      color: t.ink
    },
    h('div', { flexDirection: 'column', padding: '56px 0 56px 72px', width: 672, height: 630 }, text),
    h(
      'div',
      { width: 528, height: 630, overflow: 'hidden', borderLeft: `1px solid ${t.tileLine}` },
      img(coverUri, { width: 1200, height: 630, objectFit: 'cover', marginLeft: -336 })
    )
  );
}

function listCard({ title, eyebrowText, subtitle, path }) {
  const t = THEMES.dark;
  return frame(t, [
    topBar(t, `bhavishyasingla.com${path}`),
    h(
      'div',
      { flex: 1, flexDirection: 'column', justifyContent: 'center' },
      eyebrow(t, null, eyebrowText),
      h('div', { fontFamily: 'Space Grotesk', fontSize: 150, lineHeight: 0.9, letterSpacing: -6, marginBottom: 30 }, title),
      h('div', { fontSize: 26, color: t.muted }, subtitle)
    ),
    h(
      'div',
      { alignItems: 'center', fontSize: 18, fontWeight: 600, letterSpacing: 3, color: t.faint },
      h('div', { backgroundColor: NEON, color: '#000', padding: '5px 10px', marginRight: 16 }, 'FREE'),
      'NO SPAM · NEW GUIDES & REPOS'
    )
  ]);
}

/** Renders only when the inputs changed, so repeated builds stay fast and git stays quiet. */
async function render(name, tree, fingerprint) {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(STAMPS, { recursive: true });
  const file = join(OUT, `${name}.png`);
  const stamp = join(STAMPS, `${name}.hash`);
  const hash = createHash('sha1').update(JSON.stringify(fingerprint)).update('v5').digest('hex');
  if (existsSync(file) && existsSync(stamp) && readFileSync(stamp, 'utf8') === hash) return `/og/${name}.png`;
  const svg = await satori(await tree, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(file, png);
  writeFileSync(stamp, hash);
  console.log(`✓ public/og/${name}.png`);
  return `/og/${name}.png`;
}

export const renderProjectOg = (p) => render(p.slug, projectCard(p), p);
export const renderArticleOg = (a) =>
  render(`article-${a.slug}`, articleCard(a), { t: a.title, d: a.dateLabel, m: a.minutes, g: a.tags, i: a.image });
export const renderArticlesIndexOg = () =>
  render(
    'articles',
    listCard({ title: 'ARTICLES.', eyebrowText: 'Guides, notes & repos I like', subtitle: 'AI, building products and the web.', path: '/articles' }),
    'articles-index'
  );
