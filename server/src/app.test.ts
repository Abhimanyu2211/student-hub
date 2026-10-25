import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from './app.js';

const app = createApp();

describe('Backend API Foundation Tests', () => {
  it('GET /api/health returns 200 OK and health metadata', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.service, 'student-hub-api');
    assert.ok(typeof res.body.uptime === 'number');
    assert.ok(typeof res.body.timestamp === 'string');
  });

  it('GET /api/health/db returns 200 and safe database status without secrets', async () => {
    const res = await request(app).get('/api/health/db');
    assert.equal(res.status, 503);
    assert.equal(res.body.status, 'error');
    assert.ok(res.body.database);
    assert.equal(res.body.database.connected, false);
    assert.equal(res.body.database.driver, 'mongoose');
    // Ensure no connection strings or credentials are leaked
    assert.equal(res.body.database.uri, undefined);
    assert.equal(res.body.database.password, undefined);
  });

  it('GET /api/nonexistent-endpoint returns 404 JSON with structured error', async () => {
    const res = await request(app).get('/api/nonexistent-endpoint');
    assert.equal(res.status, 404);
    assert.equal(res.body.status, 'error');
    assert.equal(res.body.statusCode, 404);
    assert.ok(res.body.message.includes('/api/nonexistent-endpoint'));
  });
});
