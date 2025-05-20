import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const frontendDir = path.join(dirname, '../frontend');
const hasModules = fs.existsSync(path.join(frontendDir, 'node_modules'));

// Skip if dependencies are not installed
const skip = !hasModules;

test('frontend build succeeds', { skip }, () => {
  execSync('npm run build', { cwd: frontendDir, stdio: 'ignore' });
  const dist = path.join(frontendDir, 'dist', 'index.html');
  assert.ok(fs.existsSync(dist));
});
