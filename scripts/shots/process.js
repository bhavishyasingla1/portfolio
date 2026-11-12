/**
 * Turns raw product screenshots (.shots-raw/, captured with scripts/shots/chrome-shot.mjs or
 * downloaded from the product sites) into the optimised WebP files the project pages use.
 * Run: node scripts/shots/process.js   → public/projects/shots/<name>-{1760,880}.webp + manifest.json
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync, existsSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';

const RAW = join(process.cwd(), '.shots-raw');
const OUT = join(process.cwd(), 'public', 'projects', 'shots');
mkdirSync(OUT, { recursive: true });
// start clean so renamed or resized shots never leave stale files behind
for (const f of readdirSync(OUT)) if (f.endsWith('.webp')) rmSync(join(OUT, f));

// name → [raw file, options]. trim: crop the empty page margin around a captured section,
// then put back an even border in the page's own background colour. side: keep only that half.
const SHOTS = {
  'ringping-hero': ['ringping-hero.png'],
  'ringping-how': ['ringping-how.png', { trim: true }],
  'ringping-callbacks': ['ringping-f0.png', { trim: true, side: 'right' }],
  'ringping-calendar': ['ringping-f1.png', { trim: true, side: 'left' }],
  'ringping-alarms': ['ringping-f2.png', { trim: true, side: 'right' }],
  'ringping-heycola': ['ringping-f3.png', { trim: true, side: 'left' }],
  'ringping-askcola': ['ringping-f4.png', { trim: true, side: 'right' }],
  'ringping-languages': ['ringping-f5.png', { trim: true, side: 'left' }],
  'ringping-mobile': ['ringping-mobile.png', { widths: [780, 390] }],
  'rankkiwi-youtube': ['rk-youtube-videos-outlier-grid.png'],
  'rankkiwi-instagram': ['rk-hero-instagram.webp'],
  'rankkiwi-reel': ['rk-instagram-reel-detail-modal-cropped@2x.webp'],
  'rankkiwi-video': ['rk-youtube-video-detail-modal-cropped@2x.webp'],
  'rankkiwi-score': ['rankkiwi-score.png', { trim: true, side: 'right' }],
  'rankkiwi-filters': ['rankkiwi-details.png', { trim: true, side: 'left' }],
  'rankkiwi-transcription': ['rankkiwi-transcription.png', { trim: true, side: 'right' }],
  'rankkiwi-how': ['rankkiwi-how.png', { trim: true }],
  'linkedinrank-hero': ['linkedinrank-hero.png'],
  'linkedinrank-benchmark': ['linkedinrank-s3.png', { trim: true }],
  'linkedinrank-beforeafter': ['linkedinrank-s4.png', { trim: true }],
  'linkedinrank-studio': ['linkedinrank-s2.png', { trim: true }],
  'linkedinrank-tools': ['linkedinrank-s6.png', { trim: true }],
  'linkedinrank-mobile': ['linkedinrank-mobile.png', { widths: [780, 390] }],
  'aithisweek-page': ['aithisweek-page.png', { widths: [1520, 760] }],
  ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`aithisweek-ed${i + 1}`, [`ed-${i + 1}.jpg`, { widths: [960, 480] }]]))
};

const manifest = {};
for (const [name, [file, opt = {}]] of Object.entries(SHOTS)) {
  const src = join(RAW, file);
  if (!existsSync(src)) {
    console.warn(`! missing ${file}`);
    continue;
  }
  let buf = await sharp(src).toBuffer();
  let bg = null;
  if (opt.trim) {
    const { data } = await sharp(buf).extract({ left: 4, top: 4, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
    bg = { r: data[0], g: data[1], b: data[2] };
    let trimmed = await sharp(buf).trim({ background: bg, threshold: 12 }).toBuffer();
    if (opt.side) {
      // these sections are "text | interface": keep the interface half, the page supplies its own caption
      const m = await sharp(trimmed).metadata();
      const half = Math.floor(m.width / 2);
      const part = await sharp(trimmed).extract({ left: opt.side === 'left' ? 0 : half, top: 0, width: opt.side === 'left' ? half : m.width - half, height: m.height }).toBuffer();
      trimmed = await sharp(part).trim({ background: bg, threshold: 12 }).toBuffer();
    }
    const pad = opt.side ? 72 : 96;
    buf = await sharp(trimmed).extend({ top: pad, bottom: pad, left: pad, right: pad, background: bg }).toBuffer();
  }
  const meta = await sharp(buf).metadata();
  const widths = (opt.widths || [1760, 880]).filter((w, i) => i > 0 || true).map((w) => Math.min(w, meta.width));
  const files = [];
  for (const w of [...new Set(widths)]) {
    const out = `${name}-${w}.webp`;
    const info = await sharp(buf).resize({ width: w }).webp({ quality: 82, effort: 6 }).toFile(join(OUT, out));
    files.push({ src: `/projects/shots/${out}`, w: info.width, h: info.height, kb: Math.round(info.size / 1024) });
  }
  // dominant corner colour, used as the frame background so letterboxing is invisible
  const { data: c } = await sharp(buf).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  manifest[name] = { files, bg: `#${[c[0], c[1], c[2]].map((v) => v.toString(16).padStart(2, '0')).join('')}` };
  console.log(`✓ ${name} ${files.map((f) => `${f.w}×${f.h} ${f.kb}KB`).join(' · ')}`);
}
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
