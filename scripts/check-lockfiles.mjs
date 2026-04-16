import { existsSync } from 'node:fs';

const hasNpmLock = existsSync('package-lock.json');
const hasYarnLock = existsSync('yarn.lock');

if (!hasNpmLock) {
  console.error('\nError: falta package-lock.json. Usa npm para instalar dependencias.\n');
  process.exit(1);
}

if (hasYarnLock) {
  console.error(
    '\nError: se detecto yarn.lock. Este repositorio usa npm y package-lock.json como lockfile unico.\n'
  );
  process.exit(1);
}

