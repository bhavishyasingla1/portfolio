/**
 * Cross-Platform Build Runner for Cloned 3D Experiences
 * Compiles each cloned experience and syncs output to public/<name>/
 */

import { execSync } from 'child_process';
import { existsSync, cpSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';

const ROOT_DIR = resolve();
const EXPERIENCES_DIR = join(ROOT_DIR, 'experiences');
const PUBLIC_DIR = join(ROOT_DIR, 'public');

const EXPERIENCES = [
  {
    name: 'My Room in 3D',
    dir: 'my-room-in-3d',
    dest: 'room',
    command: 'npm run build'
  },
  {
    name: 'Infinite World',
    dir: 'infinite-world',
    dest: 'world',
    command: 'npm run build'
  },
  {
    name: 'Folio 2019',
    dir: 'folio-2019',
    dest: 'folio',
    command: 'npm run build'
  }
];

console.log('===> Compiling Cloned 3D Experiences...');

for (const exp of EXPERIENCES) {
  const expPath = join(EXPERIENCES_DIR, exp.dir);
  const destPath = join(PUBLIC_DIR, exp.dest);

  if (!existsSync(expPath)) {
    console.error(`Error: Directory not found: ${expPath}`);
    process.exit(1);
  }

  console.log(`\nBuilding [${exp.name}] in experiences/${exp.dir}...`);
  try {
    execSync(exp.command, {
      cwd: expPath,
      stdio: 'inherit'
    });

    const distPath = join(expPath, 'dist');
    if (!existsSync(distPath)) {
      console.error(`Build succeeded but dist not found at ${distPath}`);
      process.exit(1);
    }

    mkdirSync(destPath, { recursive: true });
    cpSync(distPath, destPath, { recursive: true });
    console.log(`✓ Copied ${exp.dir}/dist to public/${exp.dest}`);
  } catch (err) {
    console.error(`Failed to build ${exp.name}:`, err.message);
    process.exit(1);
  }
}

console.log('\n✓ All experiences built and synchronized to public/ successfully!\n');
