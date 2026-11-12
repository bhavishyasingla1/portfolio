/**
 * Share-image renderer (1200 × 630 PNG) for link previews on LinkedIn, X, WhatsApp, Slack…
 * Uses satori (layout → SVG) and resvg (SVG → PNG). Called by scripts/build-pages.js.
 * Output: public/og/<name>.png
 *
 * Three layouts, one system: the site grid, Space Grotesk headlines, an electric-blue accent bar
 * on the left edge, and real imagery on the right (product screenshot or article cover).
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { createHash } from 'crypto';
import { CASE_STUDIES } from '../../src/config/case-studies.js';

const ROOT = process.cwd();
const OUT = join(ROOT, 'public', 'og');
const FONT_DIR = join(ROOT, 'scripts', 'og', 'fonts');
// Fingerprints of the last render, so unchanged images are skipped (kept out of public/)
const STAMPS = join(ROOT, 'scripts', 'og', '.cache');
const VERSION = 'v11';

const fonts = [
  { name: 'Space Grotesk', data: readFileSync(join(FONT_DIR, 'SpaceGrotesk-Bold.ttf')), weight: 700, style: 'normal' },
  { name: 'Inter', data: readFileSync(join(FONT_DIR, 'Inter-Medium.ttf')), weight: 500, style: 'normal' },
  { name: 'Inter', data: readFileSync(join(FONT_DIR, 'Inter-SemiBold.ttf')), weight: 600, style: 'normal' },
  // One-glyph fallback for ₹ (missing from the Latin subsets above), Inter Bold, SIL OFL
  { name: 'Rupee', data: readFileSync(join(FONT_DIR, 'Inter-Rupee.ttf')), weight: 700, style: 'normal' }
];

// satori only reads PNG/JPEG, so every image is normalised to PNG with sharp first
// (lets article covers be JPG, PNG or WebP).
const dataUri = async (publicPath, { width, height, fit = 'cover', position = 'top' } = {}) => {
  const file = join(ROOT, 'public', publicPath.replace(/^\//, ''));
  let img = sharp(file);
  if (width && height) img = img.resize({ width, height, fit, position });
  else if (width) img = img.resize({ width, withoutEnlargement: true });
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
  light: { bg: '#f2f2f4', ink: '#000000', muted: '#555555', faint: '#7a7a80', grid: 'rgba(0,0,0,0.06)', tile: '#ffffff', line: 'rgba(0,0,0,0.16)', accent: '#1f3dff' },
  dark: { bg: '#0c0c0e', ink: '#f2f2f4', muted: '#a1a1aa', faint: '#7c7c86', grid: 'rgba(255,255,255,0.06)', tile: '#151518', line: 'rgba(255,255,255,0.18)', accent: '#3355ff' }
};
const GRID = 63; // 1200 ÷ 63 ≈ 19 cells, 630 ÷ 63 = 10 cells: lines land on the bottom edge

function canvas(t, children) {
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      position: 'relative',
      backgroundColor: t.bg,
      backgroundImage: `linear-gradient(to right, ${t.grid} 1px, transparent 1px), linear-gradient(to bottom, ${t.grid} 1px, transparent 1px)`,
      backgroundSize: `${GRID}px ${GRID}px`,
      fontFamily: 'Inter',
      color: t.ink
    },
    // the accent bar: the one constant across every card
    h('div', { position: 'absolute', left: 0, top: 0, width: 10, height: 630, backgroundColor: t.accent }),
    children
  );
}

const brand = (t) => h('div', { fontFamily: 'Space Grotesk', fontSize: 20, letterSpacing: 4 }, 'BHAVISHYA SINGLA');

function eyebrow(t, num, text) {
  return h(
    'div',
    { fontSize: 19, fontWeight: 600, letterSpacing: 4, color: t.muted, textTransform: 'uppercase', marginBottom: 22 },
    num ? h('span', { color: t.accent, marginRight: 14 }, num) : null,
    num ? h('span', { marginRight: 14 }, '—') : null,
    text
  );
}

const badge = (t, text) =>
  h('div', { backgroundColor: t.accent, color: '#fff', padding: '6px 12px', marginRight: 16, fontSize: 17, fontWeight: 600, letterSpacing: 3 }, text);

/** A window frame holding a real screenshot. It runs off the right and bottom edges on purpose. */
function windowFrame(t, src, { width, height, label }) {
  return h(
    'div',
    {
      position: 'absolute',
      left: 1200 - width + 72,
      top: 630 - height + 34,
      width,
      height,
      flexDirection: 'column',
      backgroundColor: t.tile,
      border: `1px solid ${t.line}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.28)'
    },
    h(
      'div',
      { height: 38, alignItems: 'center', padding: '0 16px', borderBottom: `1px solid ${t.line}`, fontSize: 14, fontWeight: 600, letterSpacing: 2, color: t.faint },
      h('div', { width: 9, height: 9, border: `1.5px solid ${t.faint}`, marginRight: 6 }),
      h('div', { width: 9, height: 9, border: `1.5px solid ${t.faint}`, marginRight: 6 }),
      h('div', { width: 9, height: 9, border: `1.5px solid ${t.faint}`, marginRight: 16 }),
      label.toUpperCase()
    ),
    img(src, { width: width - 2, height: height - 39 })
  );
}

async function projectCard(p) {
  const t = THEMES.light;
  const cs = CASE_STUDIES[p.slug] || {};
  const shotName = cs.lead?.shot || cs.editions?.[0]?.shot;
  const W = 660;
  const H = 452;
  const shot = shotName
    ? await dataUri(`/projects/shots/${shotName}-${cs.lead ? '880' : '960'}.webp`, { width: (W - 2) * 2, height: (H - 39) * 2, position: cs.lead ? 'left top' : 'centre' })
    : null;
  const logo = await dataUri(p.logoPng, { width: 160 });
  const lines = p.headline;
  const longest = Math.max(...lines.map((l) => l.length));
  const size = longest > 7 ? 92 : 112;
  return canvas(t, [
    h(
      'div',
      { position: 'absolute', left: 72, top: 52, width: 1056, justifyContent: 'space-between', alignItems: 'center' },
      brand(t),
      h('div', { fontSize: 18, color: t.faint, letterSpacing: 1 }, `bhavishyasingla.com/${p.slug}`)
    ),
    shot ? windowFrame(t, shot, { width: W, height: H, label: p.domain }) : null,
    h(
      'div',
      { position: 'absolute', left: 72, top: 150, width: 520, flexDirection: 'column' },
      h(
        'div',
        { alignItems: 'center', marginBottom: 26 },
        h('div', { width: 64, height: 64, marginRight: 18, overflow: 'hidden', borderRadius: p.logoCover ? 0 : 14 }, img(logo, { width: 64, height: 64 })),
        h('div', { fontSize: 19, fontWeight: 600, letterSpacing: 4, color: t.muted, textTransform: 'uppercase' }, h('span', { color: t.accent, marginRight: 12 }, p.num), p.tag.split('·')[0].trim())
      ),
      h(
        'div',
        { flexDirection: 'column', fontFamily: 'Space Grotesk', fontSize: size, lineHeight: 0.88, letterSpacing: -4, marginBottom: 26 },
        lines.map((l) => h('div', {}, l))
      ),
      h('div', { fontSize: 25, fontWeight: 500, color: t.muted, lineHeight: 1.3, maxWidth: 500 }, p.tagline)
    ),
    h(
      'div',
      { position: 'absolute', left: 72, bottom: 52, alignItems: 'center', fontSize: 17, fontWeight: 600, letterSpacing: 3, color: t.faint },
      badge(t, p.schemaType === 'Periodical' ? 'NEWSLETTER' : 'CASE STUDY'),
      // keep the line clear of the screenshot: two facts when they are short, otherwise one
      (p.facts.slice(0, 2).map(([, v]) => v).join('  ·  ').length <= 26 ? p.facts.slice(0, 2) : p.facts.slice(0, 1))
        .map(([, v]) => v)
        .join('  ·  ')
        .toUpperCase()
    )
  ]);
}

async function articleCard(a) {
  const t = THEMES.dark;
  const hasCover = Boolean(a.image);
  const coverUri = hasCover ? await dataUri(a.image, { width: 1056, height: 1260, position: 'centre' }) : null;
  const avatar = await dataUri('/bhavishya.png', { width: 96, height: 96 });
  const len = a.title.length;
  const titleSize = len > 70 ? 46 : len > 45 ? 54 : 64;
  const textW = hasCover ? 600 : 1056;
  return canvas(t, [
    hasCover
      ? h('div', { position: 'absolute', right: 0, top: 0, width: 528, height: 630, overflow: 'hidden', borderLeft: `1px solid ${t.line}` }, img(coverUri, { width: 528, height: 630 }))
      : null,
    h('div', { position: 'absolute', left: 72, top: 52 }, brand(t)),
    h(
      'div',
      { position: 'absolute', left: 72, top: 150, width: textW - 40, flexDirection: 'column' },
      eyebrow(t, null, a.tags.slice(0, 3).join('  ·  ')),
      h('div', { fontFamily: 'Space Grotesk', fontSize: titleSize, lineHeight: 1.05, letterSpacing: -2 }, a.title)
    ),
    h(
      'div',
      { position: 'absolute', left: 72, bottom: 48, alignItems: 'center' },
      h('div', { width: 48, height: 48, borderRadius: 24, overflow: 'hidden', marginRight: 16, border: `1px solid ${t.line}` }, img(avatar, { width: 48, height: 48 })),
      h(
        'div',
        { flexDirection: 'column' },
        h('div', { fontSize: 19, fontWeight: 600 }, 'Bhavishya Singla'),
        h('div', { fontSize: 16, fontWeight: 500, letterSpacing: 2, color: t.faint, marginTop: 4 }, `${a.dateLabel}  ·  ${a.minutes} MIN READ`)
      )
    )
  ]);
}

function listCard({ title, eyebrowText, subtitle, path, badge: badgeText }) {
  const t = THEMES.dark;
  return canvas(t, [
    h(
      'div',
      { position: 'absolute', left: 72, top: 52, width: 1056, justifyContent: 'space-between', alignItems: 'center' },
      brand(t),
      h('div', { fontSize: 18, color: t.faint, letterSpacing: 1 }, `bhavishyasingla.com${path}`)
    ),
    h(
      'div',
      { position: 'absolute', left: 72, top: 190, width: 1056, flexDirection: 'column' },
      eyebrow(t, null, eyebrowText),
      h('div', { fontFamily: 'Space Grotesk', fontSize: title.length > 9 ? 124 : 150, lineHeight: 0.9, letterSpacing: -6, marginBottom: 30 }, title),
      h('div', { fontSize: 27, color: t.muted }, subtitle)
    ),
    h('div', { position: 'absolute', left: 72, bottom: 52, alignItems: 'center' }, badge(t, badgeText))
  ]);
}

/** Renders only when the inputs changed, so repeated builds stay fast and git stays quiet. */
async function render(name, tree, fingerprint) {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(STAMPS, { recursive: true });
  const file = join(OUT, `${name}.png`);
  const stamp = join(STAMPS, `${name}.hash`);
  const hash = createHash('sha1').update(JSON.stringify(fingerprint)).update(VERSION).digest('hex');
  if (existsSync(file) && existsSync(stamp) && readFileSync(stamp, 'utf8') === hash) return `/og/${name}.png`;
  const svg = await satori(await tree(), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  // palette-quantised PNG: a third of the size, visually identical for flat artwork
  writeFileSync(file, await sharp(png).png({ quality: 92, compressionLevel: 9, palette: true, colours: 256, dither: 0.6 }).toBuffer());
  writeFileSync(stamp, hash);
  console.log(`✓ public/og/${name}.png`);
  return `/og/${name}.png`;
}

export const renderProjectOg = (p) => render(p.slug, () => projectCard(p), p);
export const renderArticleOg = (a) =>
  render(`article-${a.slug}`, () => articleCard(a), { t: a.title, d: a.dateLabel, m: a.minutes, g: a.tags, i: a.image });
export const renderListOg = (name, opts) => render(name, () => listCard(opts), opts);
