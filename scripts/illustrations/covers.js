/**
 * Article cover illustrations (1600 × 840) starring chibi Bhavishya.
 * Run: node scripts/illustrations/covers.js  → public/articles/images/cover-*.webp
 * Flat, minimal, one bold background colour per article (Duolingo-style).
 * Keep the subject inside x 450–1150 so share cards and list thumbnails crop cleanly.
 */

import sharp from 'sharp';
import { join } from 'path';
import { chibi, shadow } from './chibi.js';

const OUT = join(process.cwd(), 'public', 'articles', 'images');
const W = 1600;
const H = 840;

const svg = (bg, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`;

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
  const bg = '#1CB0F6';
  const tint = '#5CCBFB';
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
  return svg(bg, body);
}

/* 2 ─ Brag: shouting the launch through a megaphone */
function brag() {
  const bg = '#A560F8';
  const tint = '#C493FF';
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
  return svg(bg, body);
}

/* 3 ─ Bruno Simon's worlds: driving the little red car, letters flying */
function brunoWorlds() {
  const bg = '#FF9548';
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
  return svg(bg, body);
}

const covers = {
  'cover-ai-models': aiModels(),
  'cover-brag': brag(),
  'cover-bruno-worlds': brunoWorlds()
};

for (const [name, markup] of Object.entries(covers)) {
  await sharp(Buffer.from(markup)).webp({ quality: 90 }).toFile(join(OUT, `${name}.webp`));
  console.log(`✓ public/articles/images/${name}.webp`);
}
