/**
 * Chibi Bhavishya: a flat, minimal mascot (Duolingo-style) drawn as SVG.
 * chibi({ pose, face }) returns an SVG <g> whose origin (0,0) is the ground point between the feet.
 * Outfit matches the hero video: black messy hair, charcoal hoodie with teal hood lining,
 * white tee, dark cargo pants, white sneakers with teal accents.
 */

export const C = {
  skin: '#E2A477',
  skinShade: '#C98A5E',
  hair: '#221F21',
  hairShine: '#3A3639',
  hoodie: '#2F3238',
  hoodieShade: '#24262B',
  teal: '#3FB0BE',
  tee: '#F5F5F2',
  pants: '#3A3C43',
  pantsShade: '#2E3036',
  shoe: '#F4F4F4',
  sole: '#C9CDD3',
  eye: '#2A2630',
  mouth: '#6E2A2E',
  tongue: '#F27C82',
  blush: '#F29A8E'
};

// Arm from shoulder to hand with a soft elbow bend (bend > 0 bends outwards)
function arm(sx, sy, hx, hy, bend = 0) {
  const mx = (sx + hx) / 2 + bend;
  const my = (sy + hy) / 2 + Math.abs(bend) * 0.25;
  return `
    <path d="M${sx} ${sy} Q${mx} ${my} ${hx} ${hy}" fill="none" stroke="${C.hoodie}" stroke-width="50" stroke-linecap="round"/>
    <circle cx="${hx}" cy="${hy}" r="25" fill="${C.skin}"/>`;
}

function eyes(face) {
  const look = face.look || [0, 0];
  const open = face.eyes || 'open';
  const one = (x) => {
    if (open === 'happy') {
      return `<path d="M${x - 30} ${-312} Q${x} ${-346} ${x + 30} ${-312}" fill="none" stroke="${C.eye}" stroke-width="11" stroke-linecap="round"/>`;
    }
    const ry = open === 'wide' ? 48 : 41;
    const pr = open === 'wide' ? 15 : 19;
    return `
      <ellipse cx="${x}" cy="-318" rx="${open === 'wide' ? 37 : 33}" ry="${ry}" fill="#fff"/>
      <ellipse cx="${x + look[0]}" cy="${-314 + look[1]}" rx="${pr}" ry="${pr * 1.28}" fill="${C.eye}"/>
      <circle cx="${x + look[0] + 6}" cy="${-322 + look[1]}" r="6" fill="#fff"/>`;
  };
  return one(-56) + one(56);
}

function brows(face) {
  const mood = face.brows || 'happy';
  const shapes = {
    happy: [[-84, -372, -30, -380], [30, -380, 84, -372]],
    worried: [[-82, -366, -32, -386], [32, -386, 82, -366]],
    determined: [[-82, -380, -32, -364], [32, -364, 82, -380]],
    up: [[-80, -378, -32, -388], [32, -388, 80, -378]]
  }[mood];
  return shapes
    .map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.hair}" stroke-width="15" stroke-linecap="round"/>`)
    .join('');
}

function mouth(face) {
  switch (face.mouth || 'grin') {
    case 'o':
      return `<ellipse cx="4" cy="-238" rx="20" ry="26" fill="${C.mouth}"/><ellipse cx="4" cy="-226" rx="12" ry="9" fill="${C.tongue}"/>`;
    case 'shout':
      return `<path d="M-38 -258 Q4 -256 46 -258 Q42 -196 4 -194 Q-34 -196 -38 -258 Z" fill="${C.mouth}"/><path d="M-18 -214 Q4 -232 26 -214 Q4 -198 -18 -214 Z" fill="${C.tongue}"/>`;
    case 'wobbly':
      return `<path d="M-30 -240 q10 -10 20 0 t20 0 t20 0" fill="none" stroke="${C.mouth}" stroke-width="8" stroke-linecap="round"/>`;
    default:
      return `<path d="M-40 -256 Q4 -252 48 -256 Q40 -208 4 -206 Q-32 -208 -40 -256 Z" fill="${C.mouth}"/><path d="M-26 -256 L34 -256 L30 -246 L-22 -246 Z" fill="#fff"/><path d="M-16 -222 Q4 -236 24 -222 Q4 -210 -16 -222 Z" fill="${C.tongue}"/>`;
  }
}

/**
 * pose.hands: [[lx, ly, bend], [rx, ry, bend]] hand positions relative to the character
 * pose.sitting: hide legs (e.g. in a car)
 * face: { eyes: open|wide|happy, look: [dx,dy], brows: happy|worried|determined|up, mouth: grin|o|shout|wobbly, sweat }
 * pose.tilt: head tilt in degrees
 */
export function chibi({ pose = {}, face = {}, behindHands = '', inHands = '' } = {}) {
  const [L, R] = pose.hands || [[-150, -95, -20], [150, -95, 20]];
  const tilt = pose.tilt || 0;
  const legs = pose.sitting
    ? ''
    : `
    <rect x="-80" y="-82" width="72" height="74" rx="22" fill="${C.pants}"/>
    <rect x="8" y="-82" width="72" height="74" rx="22" fill="${C.pantsShade}"/>
    <rect x="-90" y="-64" width="16" height="30" rx="6" fill="${C.pantsShade}" opacity=".7"/>
    <g>
      <path d="M-106 -14 Q-106 -40 -66 -40 L-30 -40 Q-14 -40 -14 -18 L-14 -6 Q-14 4 -26 4 L-96 4 Q-108 4 -106 -14 Z" fill="${C.shoe}"/>
      <path d="M-104 -6 L-16 -6 L-16 4 L-98 4 Q-106 4 -104 -6 Z" fill="${C.sole}"/>
      <path d="M-74 -26 Q-56 -20 -34 -30" fill="none" stroke="${C.teal}" stroke-width="7" stroke-linecap="round"/>
      <path d="M106 -14 Q106 -40 66 -40 L30 -40 Q14 -40 14 -18 L14 -6 Q14 4 26 4 L96 4 Q108 4 106 -14 Z" fill="${C.shoe}"/>
      <path d="M104 -6 L16 -6 L16 4 L98 4 Q106 4 104 -6 Z" fill="${C.sole}"/>
      <path d="M74 -26 Q56 -20 34 -30" fill="none" stroke="${C.teal}" stroke-width="7" stroke-linecap="round"/>
    </g>`;

  const sweat = face.sweat
    ? `<path d="M168 -392 q14 22 0 34 q-14 -12 0 -34z" fill="#9BE3FF"/><path d="M-178 -350 q10 16 0 25 q-10 -9 0 -25z" fill="#9BE3FF"/><path d="M190 -330 q8 12 0 19 q-8 -7 0 -19z" fill="#9BE3FF"/>`
    : '';

  return `
  <g class="chibi">
    ${legs}
    <!-- torso: open hoodie over a white tee -->
    <path d="M-104 -200 Q-118 -120 -112 -70 Q-110 -58 -96 -58 L96 -58 Q110 -58 112 -70 Q118 -120 104 -200 Q60 -222 0 -222 Q-60 -222 -104 -200 Z" fill="${C.hoodie}"/>
    <path d="M40 -214 Q100 -206 104 -200 Q118 -120 112 -70 Q110 -58 96 -58 L52 -58 Q70 -130 40 -214 Z" fill="${C.hoodieShade}"/>
    <path d="M-36 -214 L36 -214 L30 -58 L-30 -58 Z" fill="${C.tee}"/>
    <path d="M-36 -214 Q-40 -140 -32 -58" fill="none" stroke="${C.hoodieShade}" stroke-width="6"/>
    <path d="M36 -214 Q40 -140 32 -58" fill="none" stroke="${C.hoodieShade}" stroke-width="6"/>
    <path d="M-20 -206 L-24 -138" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    <path d="M20 -206 L24 -138" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    <!-- hood: charcoal hood bunched behind the neck with its teal lining showing -->
    <path d="M-128 -196 Q-136 -250 -96 -262 L96 -262 Q136 -250 128 -196 Q70 -214 0 -214 Q-70 -214 -128 -196 Z" fill="${C.hoodieShade}"/>
    <path d="M-118 -204 Q-118 -240 -88 -248 L88 -248 Q118 -240 118 -204 Q64 -224 0 -224 Q-64 -224 -118 -204 Z" fill="${C.teal}"/>
    <path d="M-104 -210 Q0 -236 104 -210" fill="none" stroke="#2C8C99" stroke-width="6" stroke-linecap="round"/>
    ${behindHands}
    ${arm(-92, -186, L[0], L[1], L[2] || 0)}
    ${arm(92, -186, R[0], R[1], R[2] || 0)}
    ${inHands}
    <!-- head -->
    <g transform="rotate(${tilt} 0 -300)">
      <circle cx="-150" cy="-300" r="26" fill="${C.skin}"/>
      <circle cx="150" cy="-300" r="26" fill="${C.skin}"/>
      <path d="M-148 -310 Q-148 -440 0 -440 Q148 -440 148 -310 Q148 -196 0 -192 Q-148 -196 -148 -310 Z" fill="${C.skin}"/>
      <path d="M-110 -232 Q0 -178 110 -232 Q60 -196 0 -194 Q-60 -196 -110 -232 Z" fill="${C.skinShade}" opacity=".45"/>
      <!-- messy black hair -->
      <path d="M-156 -318 Q-170 -430 -60 -466 Q-6 -490 60 -470 Q160 -446 158 -322 Q150 -374 128 -388 Q116 -364 92 -378 Q86 -408 60 -410 Q40 -384 10 -398 Q-4 -420 -30 -414 Q-46 -386 -80 -396 Q-96 -410 -112 -398 Q-128 -372 -156 -318 Z" fill="${C.hair}"/>
      <path d="M-70 -446 Q-10 -470 54 -452" fill="none" stroke="${C.hairShine}" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="-98" cy="-262" rx="26" ry="14" fill="${C.blush}" opacity=".45"/>
      <ellipse cx="102" cy="-262" rx="26" ry="14" fill="${C.blush}" opacity=".45"/>
      ${brows(face)}
      ${eyes(face)}
      ${mouth(face)}
      ${sweat}
    </g>
  </g>`;
}

export function shadow(rx = 180, color = 'rgba(0,0,0,.16)') {
  return `<ellipse cx="0" cy="4" rx="${rx}" ry="26" fill="${color}"/>`;
}
