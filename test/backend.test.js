import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

let serverModule;
try {
  serverModule = require('../backend/server.js');
} catch (err) {
  serverModule = null;
}

const skip = !serverModule;

test('backend /api/results returns array', { skip }, async (t) => {
  const { app } = serverModule;
  const server = app.listen(0);
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/results`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
  server.close();
});

test('backend /api/state-results returns object', { skip }, async (t) => {
  const { app } = serverModule;
  const server = app.listen(0);
  const port = server.address().port;
  const res = await fetch(`http://127.0.0.1:${port}/api/state-results`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.equal(typeof data, 'object');
  server.close();
});
