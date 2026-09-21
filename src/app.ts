import express, { type NextFunction, type Request, type Response } from 'express';
import { analyzeText } from './analyze.js';
import { checkAnalyzeLimit } from './rate-limit.js';
import { createRequestId } from './request-id.js';
import { addHistory, getHistory } from './store.js';
import type { HistoryItem } from './types.js';

export const app = express();

app.use(express.json({ limit: '32kb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'degraded' });
});

app.post('/api/analyze', (req, res) => {
  const decision = checkAnalyzeLimit(req.ip ?? 'unknown');

  if (!decision.allowed) {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests',
      },
    });
    return;
  }

  const text = (req.body as { text?: unknown } | undefined)?.text;

  if (typeof text !== 'string') {
    res.status(400).json({
      error: {
        code: 'INVALID_TEXT',
        message: 'text must be a string',
      },
    });
    return;
  }

  const result = analyzeText(text);
  const item: HistoryItem = {
    requestId: createRequestId(),
    result,
    createdAt: new Date().toISOString(),
  };

  addHistory(item);
  res.status(200).json(item);
});

app.get('/api/history', (_req, res) => {
  res.status(200).json({ items: getHistory() });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const error = err instanceof Error ? err : new Error(String(err));

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: error.message,
      stack: error.stack,
    },
  });
});
