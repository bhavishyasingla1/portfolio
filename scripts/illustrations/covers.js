/**
 * Article cover illustrations (1600 × 840) starring chibi Bhavishya.
 * Run: node scripts/illustrations/covers.js  → public/articles/images/cover-*.webp
 * Flat, minimal, one bold background colour per article (Duolingo-style), all on one shared stage.
 * Keep the subject inside x 450–1150 so share cards and list thumbnails crop cleanly.
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';
import { chibi, shadow } from './chibi.js';

const OUT = join(process.cwd(), 'public', 'articles', 'images');
const W = 1600;
const H = 840;

/**
 * Shared stage for every cover, so the three read as one series:
 *   the site's grid (very faint) · a soft spotlight and two thin rings behind the subject ·
 *   a floor that darkens slightly towards the bottom · a gentle vignette.
 * cx is where the subject stands, so the light lands on them.
 */
const svg = (bg, body, { cx = W / 2, cy = 430 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width="2"/></pattern>
    <radialGradient id="spot" cx="${cx}" cy="${cy}" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".55" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
    <radialGradient id="vig" cx="50%" cy="46%" r="75%"><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#spot)"/>
  <circle cx="${cx}" cy="${cy}" r="300" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="3"/>
  <circle cx="${cx}" cy="${cy}" r="410" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="3" stroke-dasharray="4 18" stroke-linecap="round"/>
  <rect y="${H - 300}" width="${W}" height="300" fill="url(#floor)"/>
  ${body}
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;

const drop = (x, y, s = 1, c = '#9BE3FF') =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -30 Q22 4 14 18 Q0 32 -14 18 Q-22 4 0 -30 Z" fill="${c}"/>`;

const note = (x, y, s, c) =>
  `<g transform="translate(${x} ${y}) scale(${s}) rotate(-12)" fill="${c}"><ellipse cx="0" cy="40" rx="22" ry="16"/><rect x="16" y="-40" width="8" height="82" rx="4"/><path d="M20 -40 Q52 -30 50 2 Q40 -14 20 -12 Z"/></g>`;

const coin = (x, y) =>
  `<ellipse cx="${x}" cy="${y + 8}" rx="54" ry="16" fill="#D9961F"/><rect x="${x - 54}" y="${y - 6}" width="108" height="14" fill="#D9961F"/><ellipse cx="${x}" cy="${y - 6}" rx="54" ry="16" fill="#FFC83D"/><ellipse cx="${x}" cy="${y - 6}" rx="34" ry="9" fill="none" stroke="#F0B02E" stroke-width="5"/>`;

const stack = (x, n) => {
  let out = `<ellipse cx="${x}" cy="784" rx="76" ry="16" fill="rgba(0,0,0,.14)"/>`;
  for (let i = 0; i < n; i++) out += coin(x + (i % 2 ? 3 : -3), 770 - i * 22);
  return { svg: out, top: 770 - (n - 1) * 22 - 22 };
};

/* 1 ─ Haiku vs Sonnet vs Opus: three coin stacks, one very long receipt */
function aiModels() {
  const bg = '#1E8BFF';
  const tint = '#7DBBFF';
  const h = stack(1040, 2);
  const s = stack(1190, 6);
  const o = stack(1340, 17);
  const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="26" fill="#FFD43B"/>${[0, 45, 90, 135, 180, 225, 270, 315]
    .map((a) => `<rect x="${x - 4}" y="${y - 46}" width="8" height="14" rx="4" fill="#FFD43B" transform="rotate(${a} ${x} ${y})"/>`)
    .join('')}`;
  const tomato = (x, y) => `<circle cx="${x}" cy="${y}" r="30" fill="#FF5A4E"/><path d="M${x - 14} ${y - 26} Q${x} ${y - 46} ${x + 14} ${y - 26} Q${x} ${y - 32} ${x - 14} ${y - 26} Z" fill="#3DBE5A"/><circle cx="${x - 10}" cy="${y - 8}" r="6" fill="#FF8A80"/>`;
  const crown = (x, y) => `<path d="M${x - 40} ${y + 18} L${x - 44} ${y - 22} L${x - 20} ${y} L${x} ${y - 34} L${x + 20} ${y} L${x + 44} ${y - 22} L${x + 40} ${y + 18} Z" fill="#FFD43B" stroke="#E0A82A" stroke-width="5" stroke-linejoin="round"/><circle cx="${x}" cy="${y - 36}" r="7" fill="#FF5A4E"/>`;

  // The receipt: held up in his left hand, unrolling all the way to the floor and beyond
  const receipt = `
    <path d="M330 300 L420 300 L418 640 Q418 720 500 760 L760 790 L752 820 L470 792 Q350 740 330 640 Z" fill="#FFFFFF"/>
    <path d="M330 300 L420 300 L418 330 L330 330 Z" fill="#E9EEF3"/>
    ${[360, 395, 430, 465, 500, 535, 570, 605].map((y, i) => `<rect x="${346}" y="${y}" width="${i % 3 === 2 ? 40 : 58}" height="9" rx="4" fill="#C9D3DC"/>`).join('')}
    <rect x="346" y="630" width="58" height="16" rx="5" fill="#FF4B4B"/>
    <path d="M330 300 l11 -10 l11 10 l11 -10 l11 10 l11 -10 l11 10 l11 -10 l12 10" fill="none" stroke="#FFFFFF" stroke-width="6"/>`;

  const body = `
    ${note(150, 170, 1.1, tint)}${note(1480, 140, 0.9, tint)}${note(260, 610, 0.7, tint)}${note(900, 120, 0.8, tint)}
    ${drop(1460, 420, 1.2, tint)}${drop(120, 380, 0.9, tint)}
    ${receipt}
    <g transform="translate(640 790)">
      ${shadow(170, 'rgba(0,0,0,.15)')}
      ${chibi({
        face: { eyes: 'wide', mouth: 'o', brows: 'worried', sweat: true, look: [-10, 6] },
        pose: { hands: [[-215, -470, -60], [150, -120, 30]], tilt: -4 }
      })}
    </g>
    ${h.svg}${s.svg}${o.svg}
    ${sun(1040, h.top - 56)}
    ${tomato(1190, s.top - 50)}
    <g transform="rotate(8 1340 ${o.top - 46})">${crown(1340, o.top - 46)}</g>
    ${drop(1290, o.top + 40, 0.6)}${drop(1395, o.top + 90, 0.5)}`;
  return svg(bg, body, { cx: 640 });
}

/* 2 ─ Brag: shouting the launch through a megaphone */
function brag() {
  const bg = '#8B4DFF';
  const tint = '#B692FF';
  const confetti = [
    [180, 150, 20, '#58CC02'], [320, 640, -30, '#FFD43B'], [1400, 210, 40, '#FFD43B'], [1480, 600, -20, '#58CC02'],
    [1250, 110, 10, tint], [260, 330, 60, tint], [1500, 420, 15, '#FF86D0'], [130, 520, -45, '#FF86D0'], [980, 100, 30, '#FF86D0']
  ]
    .map(([x, y, r, c]) => `<rect x="${x}" y="${y}" width="34" height="16" rx="5" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`)
    .join('');
  const megaphone = `
    <g transform="translate(150 -262) rotate(-14)">
      <rect x="-34" y="-20" width="50" height="40" rx="10" fill="#E8E8EC"/>
      <path d="M10 -26 L190 -96 Q210 0 190 96 L10 26 Z" fill="#FF9600"/>
      <path d="M180 -98 Q214 0 180 98 Q200 98 206 70 Q226 0 206 -70 Q200 -98 180 -98 Z" fill="#FFFFFF"/>
      <path d="M60 -44 L140 -76" stroke="#FFB84D" stroke-width="10" stroke-linecap="round"/>
      <rect x="-6" y="18" width="22" height="58" rx="10" fill="#3A3C43" transform="rotate(10)"/>
    </g>`;
  const blast = `
    <g stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" opacity=".95">
      <path d="M1100 300 L1190 250"/><path d="M1120 390 L1230 390"/><path d="M1100 480 L1190 530"/>
    </g>
    <g fill="#FFD43B"><path d="M1290 290 l18 38 l42 6 l-30 30 l8 42 l-38 -20 l-38 20 l8 -42 l-30 -30 l42 -6 z"/></g>
    <g fill="#FFFFFF"><rect x="1330" y="430" width="26" height="90" rx="13"/><circle cx="1343" cy="550" r="15"/></g>`;
  const clapper = `
    <g transform="translate(980 700) rotate(-8)">
      <rect x="0" y="0" width="190" height="110" rx="10" fill="#26262B"/>
      <g transform="rotate(-14 0 0)"><rect x="0" y="-38" width="190" height="34" rx="6" fill="#FFFFFF"/>
      ${[0, 1, 2, 3].map((i) => `<path d="M${10 + i * 46} -38 l28 0 l-16 34 l-28 0 z" fill="#26262B"/>`).join('')}</g>
      <rect x="20" y="30" width="110" height="10" rx="5" fill="#55555E"/><rect x="20" y="56" width="70" height="10" rx="5" fill="#55555E"/>
    </g>`;
  const body = `
    ${confetti}
    ${blast}
    ${clapper}
    <g transform="translate(760 790)">
      ${shadow(170, 'rgba(0,0,0,.16)')}
      ${chibi({
        face: { eyes: 'happy', mouth: 'shout', brows: 'determined' },
        pose: { hands: [[-190, -330, -50], [150, -262, 10]], tilt: -5 },
        inHands: megaphone
      })}
    </g>`;
  return svg(bg, body, { cx: 760 });
}

/* 3 ─ Bruno Simon's worlds: driving the little red car, letters flying */
function brunoWorlds() {
  const bg = '#FF8A3D';
  const tint = '#FFB57A';
  const block = (x, y, r, s = 1) =>
    `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M-40 -30 L0 -50 L40 -30 L0 -10 Z" fill="#FFFFFF"/><path d="M-40 -30 L0 -10 L0 40 L-40 20 Z" fill="#E6E1EA"/><path d="M40 -30 L0 -10 L0 40 L40 20 Z" fill="#D3CCDA"/></g>`;
  const tree = (x, y, s = 1) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-40" width="20" height="60" fill="#B58A5A"/><path d="M-50 -60 L0 -190 L50 -60 Q0 -36 -50 -60 Z" fill="#E4F06A"/><path d="M0 -190 L50 -60 Q24 -48 0 -50 Z" fill="#C9D84B"/></g>`;
  const car = `
    <g transform="translate(800 760)">
      <ellipse cx="0" cy="44" rx="260" ry="26" fill="rgba(0,0,0,.16)"/>
      <circle cx="-150" cy="10" r="56" fill="#2A2A2E"/><circle cx="-150" cy="10" r="24" fill="#8A8F98"/>
      <circle cx="150" cy="10" r="56" fill="#2A2A2E"/><circle cx="150" cy="10" r="24" fill="#8A8F98"/>
      <path d="M-240 -10 Q-250 -130 -150 -140 L160 -140 Q250 -130 244 -10 Q240 20 210 20 L-210 20 Q-238 20 -240 -10 Z" fill="#E8413A"/>
      <path d="M-240 -40 L244 -40" stroke="#C72F29" stroke-width="12"/>
      <rect x="-220" y="-96" width="40" height="22" rx="8" fill="#FFE48A"/>
      <rect x="182" y="-96" width="40" height="22" rx="8" fill="#FF6A63"/>
      <path d="M-70 -140 L-40 -226 L60 -226 L80 -140" fill="none" stroke="#2A2A2E" stroke-width="12" stroke-linejoin="round"/>
    </g>`;
  const wheel = `<g transform="translate(822 562)"><circle r="40" fill="none" stroke="#2A2A2E" stroke-width="12"/><path d="M-36 0 L36 0 M0 0 L0 36" stroke="#2A2A2E" stroke-width="10"/></g>`;
  const body = `
    ${tree(240, 520, 1.1)}${tree(1360, 470, 0.9)}${tree(1480, 640, 0.7)}
    <circle cx="160" cy="160" r="30" fill="${tint}"/><circle cx="1450" cy="180" r="20" fill="${tint}"/>
    ${block(1080, 300, 18, 1.2)}${block(1210, 420, -25)}${block(1010, 470, 40, 0.8)}${block(520, 330, -18, 1)}${block(430, 470, 30, 0.7)}
    <g stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity=".9"><path d="M420 690 L300 690"/><path d="M440 740 L340 750"/><path d="M430 640 L350 620"/></g>
    <g transform="translate(800 640)">
      ${chibi({
        face: { eyes: 'happy', mouth: 'grin', brows: 'happy' },
        pose: { hands: [[-180, -330, -40], [22, -78, 20]], sitting: true, tilt: 4 }
      })}
    </g>
    ${wheel}
    ${car}`;
  return svg(bg, body, { cx: 800, cy: 470 });
}


/* ───────────── Video article covers ─────────────
 * One layout for every article that is built around a YouTube video:
 *   chibi on the left · the real video frame in a phone (or a screen for 16:9) on the right ·
 *   the real logos of the tools the video is about on white tiles.
 * Logos live in scripts/illustrations/logos (official marks, unmodified), video frames in
 * public/articles/images/yt-<id>.webp. */

const LOGOS = join(process.cwd(), 'scripts', 'illustrations', 'logos');
const b64 = (file, mime) => `data:${mime};base64,${readFileSync(file).toString('base64')}`;

// The SVG renderer cannot decode WebP, so the video frames are converted to JPEG up front
const FRAME_IDS = ['XSnPKAbVeg4', 'IyVryGoCdZc', 'xtOi28JYdPo', 'TMwSB46JGTY', 'PBWrVRFdVIo', 'tzXKKxMQoS4', '6y7phOwiJ2Y', 'AJaKukHd328'];
const FRAMES = {};
for (const id of FRAME_IDS) {
  const jpg = await sharp(join(OUT, `yt-${id}.webp`)).jpeg({ quality: 88 }).toBuffer();
  FRAMES[id] = `data:image/jpeg;base64,${jpg.toString('base64')}`;
}

/** An official SVG mark, scaled to fit a w×h box centred on (0,0). Single-colour marks take `fill`. */
function logo(name, w, h, fill) {
  const raw = readFileSync(join(LOGOS, `${name}.svg`), 'utf8');
  const [, vb] = raw.match(/viewBox="([^"]+)"/);
  const inner = raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>[\s\S]*?<\/title>/, '');
  return `<svg x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet"${fill ? ` fill="${fill}"` : ''}>${inner}</svg>`;
}
const png = (name, w, h) => `<image x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" href="${b64(join(LOGOS, `${name}.png`), 'image/png')}"/>`;
const projectLogo = (slug, s) => `<image x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" href="${b64(join(process.cwd(), 'public', 'projects', `${slug}.png`), 'image/png')}"/>`;

/** White rounded tile with a soft shadow; `inner` is drawn centred on it. */
function tile(x, y, { w = 150, h = 150, r = 0, rx = 34, bg = '#FFFFFF' } = {}, inner = '') {
  return `<g transform="translate(${x} ${y}) rotate(${r})">
    <rect x="${-w / 2 + 6}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="${rx}" fill="#000" opacity=".16"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${rx}" fill="${bg}"/>
    ${inner}
  </g>`;
}

const playButton = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle r="46" fill="#FFFFFF"/><path d="M-13 -22 L24 0 L-13 22 Z" fill="#0C0C0E"/></g>`;

/** A phone showing the real (vertical) video frame. Origin is the phone's centre. */
function phone(x, y, id, r = 5) {
  const w = 300;
  const h = 540;
  const img = FRAMES[id];
  return `<g transform="translate(${x} ${y}) rotate(${r})">
    <rect x="${-w / 2 + 10}" y="${-h / 2 + 18}" width="${w}" height="${h}" rx="46" fill="#000" opacity=".2"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="46" fill="#111114"/>
    <clipPath id="ph-${id}"><rect x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" rx="35"/></clipPath>
    <image clip-path="url(#ph-${id})" x="${-w / 2 + 12}" y="${-h / 2 + 12}" width="${w - 24}" height="${h - 24}" preserveAspectRatio="xMidYMid slice" href="${img}"/>
    <rect x="-44" y="${-h / 2 + 24}" width="88" height="20" rx="10" fill="#111114"/>
  </g>`;
}

/** A 16:9 screen showing the real video frame. Origin is the screen's centre. */
function screen(x, y, id, r = 3) {
  const w = 600;
  const h = 338;
  const img = FRAMES[id];
  return `<g transform="translate(${x} ${y}) rotate(${r})">
    <rect x="${-w / 2 + 2}" y="${-h / 2 + 10}" width="${w + 20}" height="${h + 20}" rx="26" fill="#000" opacity=".2"/>
    <rect x="${-w / 2 - 12}" y="${-h / 2 - 12}" width="${w + 24}" height="${h + 24}" rx="26" fill="#111114"/>
    <clipPath id="sc-${id}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14"/></clipPath>
    <image clip-path="url(#sc-${id})" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" href="${img}"/>
  </g>`;
}

const bolt = (x, y, s, c = '#FFD43B', r = 0) =>
  `<path transform="translate(${x} ${y}) scale(${s}) rotate(${r})" d="M14 -52 L-30 8 L-4 10 L-16 52 L30 -10 L4 -12 Z" fill="${c}"/>`;
const spark = (x, y, s = 1, c = '#FFFFFF') =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -34 Q4 -4 34 0 Q4 4 0 34 Q-4 4 -34 0 Q-4 -4 0 -34 Z" fill="${c}"/>`;
const dot = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const wave = (x, y, c, heights) =>
  `<g transform="translate(${x} ${y})">${heights.map((h, i) => `<rect x="${i * 22}" y="${-h / 2}" width="12" height="${h}" rx="6" fill="${c}"/>`).join('')}</g>`;

/** The chibi standing left of the device, shared by all video covers. */
const host = (opts, x = 560) => `<g transform="translate(${x} 790)">${shadow(170, 'rgba(0,0,0,.18)')}${chibi(opts)}</g>`;

/* 4 ─ AI For Everyone (Millennium Fellowship): explaining, with a question to ask the machine */
function aiForEveryone() {
  const bg = '#0FA3A3';
  const tint = '#7BD8D8';
  const bubble = `<g transform="translate(250 250) rotate(-8)">
      <path d="M-96 -80 H96 Q120 -80 120 -56 V44 Q120 68 96 68 H-10 L-58 112 L-52 68 H-96 Q-120 68 -120 44 V-56 Q-120 -80 -96 -80 Z" fill="#FFFFFF"/>
      <path d="M-30 -30 Q-30 -56 0 -56 Q32 -56 32 -28 Q32 -8 4 0 L4 16" fill="none" stroke="#0C7C7C" stroke-width="18" stroke-linecap="round"/><circle cx="4" cy="42" r="11" fill="#0C7C7C"/>
    </g>`;
  const body = `
    ${dot(150, 620, 26, tint)}${dot(1500, 150, 20, tint)}${spark(1450, 640, 1.1)}${spark(420, 120, 0.7, tint)}
    ${bubble}
    ${screen(1050, 400, 'XSnPKAbVeg4', 3)}
    ${tile(1180, 690, { w: 400, h: 150, r: -3, rx: 28 }, png('millennium', 330, 104))}
    ${host({ face: { eyes: 'open', look: [8, -2], mouth: 'grin', brows: 'up' }, pose: { hands: [[-170, -300, -40], [150, -150, 30]], tilt: -4 } }, 520)}`;
  return svg(bg, body, { cx: 760 });
}

/* 5 ─ Groq: fast and free */
function groq() {
  const bg = '#F55036';
  const tint = '#FF9A86';
  const body = `
    ${bolt(300, 190, 1.5, '#FFD43B', -10)}${bolt(1420, 620, 1.2, '#FFD43B', 12)}${bolt(1380, 160, 0.8, '#FFFFFF', -6)}
    ${dot(170, 560, 24, tint)}${dot(1500, 380, 18, tint)}
    <g stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" opacity=".9"><path d="M300 640 L190 640"/><path d="M320 700 L230 710"/></g>
    ${phone(1040, 420, 'IyVryGoCdZc', 5)}
    ${tile(1300, 300, { w: 250, h: 130, r: 6, rx: 30 }, logo('groq', 170, 64))}
    ${tile(250, 420, { w: 130, h: 130, r: -8, rx: 30, bg: '#F43E01' }, `<path transform="scale(4.2) translate(-16.54 -16.39)" fill="#fff" d="m18.445 4.406-9.468 13.74 7.341.665-1.69 9.578 9.469-13.74-7.342-.664 1.69-9.579Z"/>`)}
    ${host({ face: { eyes: 'happy', mouth: 'grin', brows: 'happy' }, pose: { hands: [[-180, -320, -40], [180, -320, 40]], tilt: 3 } })}`;
  return svg(bg, body, { cx: 760 });
}

/* 6 ─ Claim your business on ChatGPT: the blue tick */
function chatgptBusiness() {
  const bg = '#1D2B64';
  const tint = '#5E73C9';
  const badge = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 -70 L20 -52 L46 -56 L52 -30 L74 -14 L62 10 L70 36 L44 44 L32 68 L6 58 L-18 70 L-34 48 L-60 44 L-58 18 L-74 -4 L-56 -24 L-52 -50 L-26 -52 Z" fill="#2F7BFF"/>
      <path d="M-28 2 L-8 22 L30 -20" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const body = `
    ${dot(160, 600, 24, tint)}${dot(1490, 170, 20, tint)}${spark(1430, 640, 1, '#FFFFFF')}${spark(210, 160, 0.8, tint)}
    ${phone(1040, 420, 'xtOi28JYdPo', 5)}
    ${tile(1310, 310, { w: 150, h: 150, r: 7 }, logo('openai', 96, 96, '#0C0C0E'))}
    ${badge(320, 330, 1.25)}
    ${badge(1330, 560, 0.7)}
    ${host({ face: { eyes: 'wide', look: [10, -4], mouth: 'o', brows: 'up' }, pose: { hands: [[-170, -250, -40], [150, -170, 30]], tilt: -3 } })}`;
  return svg(bg, body, { cx: 760 });
}

/* 7 ─ ElevenLabs for ₹100: a price tag */
function elevenlabsOffer() {
  const bg = '#F5A300';
  const tint = '#FFD26B';
  const tag = `<g transform="translate(300 330) rotate(-12)">
      <path d="M-150 -70 H90 L160 0 L90 70 H-150 Q-170 70 -170 50 V-50 Q-170 -70 -150 -70 Z" fill="#000" opacity=".14" transform="translate(6 12)"/>
      <path d="M-150 -70 H90 L160 0 L90 70 H-150 Q-170 70 -170 50 V-50 Q-170 -70 -150 -70 Z" fill="#FFFFFF"/>
      <circle cx="104" cy="0" r="14" fill="${bg}"/>
      <text x="-40" y="30" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="800" font-size="88" fill="#0C0C0E">₹100</text>
    </g>`;
  const body = `
    ${dot(170, 610, 24, tint)}${dot(1500, 160, 20, tint)}${spark(1440, 650, 1)}${spark(180, 150, 0.8)}
    ${wave(1230, 610, '#FFFFFF', [30, 70, 110, 60, 130, 80, 40, 96, 50])}
    ${tag}
    ${phone(1040, 420, 'TMwSB46JGTY', 5)}
    ${tile(1310, 300, { w: 150, h: 150, r: 7 }, logo('elevenlabs', 84, 84, '#0C0C0E'))}
    ${host({ face: { eyes: 'happy', mouth: 'grin', brows: 'happy' }, pose: { hands: [[-190, -300, -50], [150, -120, 26]], tilt: 4 } })}`;
  return svg(bg, body, { cx: 760 });
}

/* 8 ─ Free voice clone vs ElevenLabs: two voices, one of them free */
function voiceClone() {
  const bg = '#E5488B';
  const tint = '#FF9CC4';
  const body = `
    ${dot(160, 620, 24, tint)}${dot(1500, 170, 20, tint)}${spark(1450, 660, 1)}${spark(230, 130, 0.8, tint)}
    ${wave(150, 330, '#FFFFFF', [40, 90, 130, 70, 110, 50, 84, 36])}
    ${wave(1230, 620, '#FFE14D', [36, 84, 50, 120, 70, 130, 90, 40, 60])}
    ${phone(1040, 420, 'PBWrVRFdVIo', 5)}
    ${tile(1310, 300, { w: 150, h: 150, r: 7 }, logo('elevenlabs', 84, 84, '#0C0C0E'))}
    ${tile(330, 520, { w: 150, h: 150, r: -8 }, logo('github', 100, 100, '#181717'))}
    ${host({ face: { eyes: 'wide', look: [-10, 2], mouth: 'o', brows: 'worried' }, pose: { hands: [[-150, -280, -36], [150, -280, 36]], tilt: 5 } }, 600)}`;
  return svg(bg, body, { cx: 780 });
}

/* 9 ─ AI edits a whole reel for ₹50: three editors, one winner */
function aiEditsReel() {
  const bg = '#5146E5';
  const tint = '#9C95FF';
  const film = `<g transform="translate(250 600) rotate(-10)">
      <rect x="-120" y="-70" width="240" height="140" rx="16" fill="#111114"/>
      ${[-96, -52, -8, 36, 80].map((x) => `<rect x="${x}" y="-60" width="22" height="16" rx="4" fill="#FFFFFF"/><rect x="${x}" y="44" width="22" height="16" rx="4" fill="#FFFFFF"/>`).join('')}
      <rect x="-100" y="-32" width="200" height="64" rx="8" fill="#FFD43B"/><path d="M-12 -18 L20 0 L-12 18 Z" fill="#111114"/>
    </g>`;
  const body = `
    ${dot(150, 180, 22, tint)}${dot(1500, 660, 20, tint)}${spark(1450, 140, 1)}${spark(430, 130, 0.7, tint)}
    ${film}
    ${phone(1040, 420, 'tzXKKxMQoS4', 5)}
    ${tile(1300, 250, { w: 136, h: 136, r: 8 }, logo('openai', 84, 84, '#0C0C0E'))}
    ${tile(1380, 420, { w: 136, h: 136, r: -5 }, png('antigravity', 88, 88))}
    ${tile(1300, 600, { w: 150, h: 150, r: 6 }, logo('claude', 96, 96, '#D97757'))}
    <path d="M1228 536 l14 30 l33 4 l-24 23 l6 33 l-29 -16 l-29 16 l6 -33 l-24 -23 l33 -4 z" fill="#FFD43B"/>
    ${host({ face: { eyes: 'happy', mouth: 'grin', brows: 'determined' }, pose: { hands: [[-160, -110, -24], [170, -300, 40]], tilt: -4 } })}`;
  return svg(bg, body, { cx: 760 });
}

/* 10 ─ The canary trick: a canary on his finger, Claude on the phone */
function canary() {
  const bg = '#1F9D55';
  const tint = '#7BD9A4';
  // The bird sits on the raised left hand (the hand is at 320,460 on the canvas)
  const bird = `<g transform="translate(318 412)">
      <path d="M-44 6 L-76 -6 L-70 20 Z" fill="#E8B800"/>
      <ellipse cx="0" cy="0" rx="46" ry="34" fill="#FFD43B"/>
      <circle cx="34" cy="-30" r="26" fill="#FFD43B"/>
      <path d="M-14 -4 Q8 22 34 4 Q10 -10 -14 -4 Z" fill="#E8B800"/>
      <path d="M56 -34 L80 -26 L56 -18 Z" fill="#FF8A3D"/>
      <circle cx="42" cy="-36" r="6" fill="#221F21"/>
      <path d="M-6 32 L-6 44 M10 32 L10 44" stroke="#FF8A3D" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  const noteAt = (x, y, s) => note(x, y, s, '#FFFFFF');
  const body = `
    ${dot(160, 640, 24, tint)}${dot(1500, 170, 20, tint)}${spark(1450, 660, 1)}
    ${noteAt(230, 190, 0.7)}${noteAt(150, 330, 0.5)}
    ${phone(1040, 420, '6y7phOwiJ2Y', 5)}
    ${tile(1310, 300, { w: 150, h: 150, r: 7 }, logo('claude', 96, 96, '#D97757'))}
    <g transform="translate(1300 560) rotate(-4)"><rect x="-150" y="-44" width="300" height="88" rx="22" fill="#000" opacity=".16" transform="translate(6 10)"/><rect x="-150" y="-44" width="300" height="88" rx="22" fill="#FFFFFF"/>
      <text x="0" y="14" text-anchor="middle" font-family="Menlo, Monaco, monospace" font-weight="700" font-size="38" fill="#0C0C0E">CLAUDE.md</text></g>
    ${host({ face: { eyes: 'open', look: [-14, -6], mouth: 'grin', brows: 'up' }, pose: { hands: [[-240, -330, -40], [150, -110, 24]], tilt: 5 } })}
    ${bird}`;
  return svg(bg, body, { cx: 760 });
}

/* 11 ─ The Outlier Score: a drama series with two real products written into the plot */
function outlier() {
  const bg = '#1B1630';
  const tint = '#5B4E96';
  // A row of ordinary bars and one outlier, the idea the first episode turns on
  const chart = `<g transform="translate(140 640)">
      ${[60, 74, 52, 68, 58].map((h, i) => `<rect x="${i * 44}" y="${-h}" width="28" height="${h}" rx="6" fill="${tint}"/>`).join('')}
      <rect x="220" y="-330" width="28" height="330" rx="6" fill="#FFD43B"/>
      <path d="M-14 4 H276" stroke="#FFFFFF" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>
    </g>`;
  const body = `
    ${spark(1470, 150, 1.1, '#FFD43B')}${spark(420, 120, 0.7, tint)}${dot(1510, 420, 16, tint)}
    ${chart}
    ${phone(1040, 420, 'AJaKukHd328', 5)}
    ${tile(1320, 300, { w: 150, h: 150, r: 7, rx: 36, bg: '#FFFFFF' }, projectLogo('rankkiwi', 118))}
    ${tile(1340, 520, { w: 150, h: 150, r: -6, rx: 36, bg: '#FFFFFF' }, projectLogo('ringping', 118))}
    <g transform="translate(1210 690) rotate(-8)">
      <rect x="0" y="0" width="170" height="96" rx="10" fill="#0C0C0E"/><g transform="rotate(-14 0 0)"><rect x="0" y="-34" width="170" height="30" rx="6" fill="#FFFFFF"/>${[0, 1, 2, 3].map((i) => `<path d="M${8 + i * 42} -34 l26 0 l-14 30 l-26 0 z" fill="#0C0C0E"/>`).join('')}</g>
      <rect x="18" y="28" width="96" height="9" rx="4" fill="#55555E"/><rect x="18" y="50" width="60" height="9" rx="4" fill="#55555E"/>
    </g>
    ${host({ face: { eyes: 'wide', look: [10, -6], mouth: 'o', brows: 'up' }, pose: { hands: [[-150, -110, -24], [170, -250, 40]], tilt: 4 } }, 600)}`;
  return svg(bg, body, { cx: 780 });
}

const covers = {
  'cover-ai-models': aiModels(),
  'cover-brag': brag(),
  'cover-bruno-worlds': brunoWorlds(),
  'cover-ai-for-everyone': aiForEveryone(),
  'cover-groq': groq(),
  'cover-chatgpt-business': chatgptBusiness(),
  'cover-elevenlabs-offer': elevenlabsOffer(),
  'cover-voice-clone': voiceClone(),
  'cover-ai-edits-reel': aiEditsReel(),
  'cover-canary': canary(),
  'cover-outlier': outlier()
};

for (const [name, markup] of Object.entries(covers)) {
  await sharp(Buffer.from(markup)).webp({ quality: 90 }).toFile(join(OUT, `${name}.webp`));
  console.log(`✓ public/articles/images/${name}.webp`);
}
