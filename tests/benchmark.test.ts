import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { resetRateLimitForTests } from '../src/rate-limit.js';
import { clearHistory } from '../src/store.js';

beforeEach(() => {
  clearHistory();
  resetRateLimitForTests();
});

describe('Agent Recovery Benchmark public checks', () => {
  it('returns a healthy status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('normalizes and analyzes text', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({ text: '  Hello   world\nfrom\tAI  ' });

    expect(response.status).toBe(200);
    expect(response.body.result).toEqual({
      characters: 19,
      words: 4,
      normalized: 'Hello world from AI',
    });
  });

  it('correlates a unique request ID in body and header', async () => {
    const first = await request(app).post('/api/analyze').send({ text: 'one' });
    const second = await request(app).post('/api/analyze').send({ text: 'two' });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(first.body.requestId).toMatch(/^req_[A-Za-z0-9-]+$/);
    expect(second.body.requestId).toMatch(/^req_[A-Za-z0-9-]+$/);
    expect(first.body.requestId).not.toBe(second.body.requestId);
    expect(first.headers['x-request-id']).toBe(first.body.requestId);
    expect(second.headers['x-request-id']).toBe(second.body.requestId);
  });

  it('rejects invalid text without storing it', async () => {
    const invalid = await request(app).post('/api/analyze').send({ text: '   \n\t  ' });
    const history = await request(app).get('/api/history');

    expect(invalid.status).toBe(400);
    expect(invalid.body).toEqual({
      error: {
        code: 'INVALID_TEXT',
        message: expect.any(String),
      },
    });
    expect(history.status).toBe(200);
    expect(history.body).toEqual({ items: [] });
  });

  it('rejects text longer than 2000 trimmed characters', async () => {
    const response = await request(app)
      .post('/api/analyze')
      .send({ text: `  ${'x'.repeat(2001)}  ` });

    expect(response.status).toBe(400);
  });

  it('returns newest history first', async () => {
    await request(app).post('/api/analyze').send({ text: 'first' });
    await request(app).post('/api/analyze').send({ text: 'second' });

    const response = await request(app).get('/api/history');

    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].result.normalized).toBe('second');
    expect(response.body.items[1].result.normalized).toBe('first');
  });

  it('allows 5 analyze attempts and rate-limits the 6th', async () => {
    for (let i = 1; i <= 5; i += 1) {
      const response = await request(app)
        .post('/api/analyze')
        .send({ text: `request ${i}` });
      expect(response.status).toBe(200);
    }

    const blocked = await request(app)
      .post('/api/analyze')
      .send({ text: 'request 6' });

    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers['retry-after'])).toBeGreaterThan(0);
    expect(blocked.body.error.code).toBe('RATE_LIMITED');
  });
});
