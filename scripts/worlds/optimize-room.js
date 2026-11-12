/**
 * Shrinks the room's textures in place (same file names, so no code changes):
 *   - the four 4096px baked lighting maps are re-encoded with mozjpeg
 *   - the photos shown on the laptop are sized for its 1024 × 640 screen, with camera metadata removed
 * Runs on the source (experiences/my-room-in-3d/static/assets) and the built copy (public/room/assets).
 * Originals are kept once in .originals/room/ (git-ignored) so this can be re-run or undone.
 * Run: node scripts/worlds/optimize-room.js
 */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const DIRS = ['experiences/my-room-in-3d/static/assets', 'public/room/assets'].map((d) => join(ROOT, d)).filter(existsSync);
const BACKUP = join(ROOT, '.originals', 'room');
const BAKED = ['bakedDay.jpg', 'bakedNight.jpg', 'bakedNeutral.jpg', 'lightMap.jpg'];

let before = 0;
let after = 0;

async function encode(dir, rel, pipeline) {
  const file = join(dir, rel);
  if (!existsSync(file)) return;
  const backup = join(BACKUP, rel);
  mkdirSync(join(backup, '..'), { recursive: true });
  if (!existsSync(backup)) copyFileSync(file, backup); // first run only: keep the untouched original
  const original = statSync(backup).size;
  const out = await pipeline(sharp(backup)).toBuffer();
  if (out.length < original) writeFileSync(file, out);
  before += original;
  after += Math.min(out.length, original);
}

for (const dir of DIRS) {
  for (const f of BAKED) await encode(dir, f, (img) => img.jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:2:0' }));
  const mem = join(dir, 'memories');
  if (existsSync(mem)) {
    for (const f of readdirSync(mem).filter((n) => /\.jpe?g$/i.test(n))) {
      await encode(dir, join('memories', f), (img) =>
        // the laptop screen is drawn on a 1024 × 640 canvas, so nothing larger than that is ever shown
        img.rotate().resize({ width: 1024, height: 640, fit: 'outside', withoutEnlargement: true }).jpeg({ quality: 76, mozjpeg: true })
      );
    }
  }
}
console.log(`room textures: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB (both copies)`);
