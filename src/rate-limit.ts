interface Bucket {
  count: number;
  windowStart: number;
}

const bucket: Bucket = {
  count: 0,
  windowStart: Date.now(),
};

export interface LimitDecision {
  allowed: boolean;
  retryAfterSeconds: number;
}

export function checkAnalyzeLimit(_ip: string): LimitDecision {
  const now = Date.now();
  const elapsed = now - bucket.windowStart;

  if (elapsed >= 60_000) {
    bucket.count = 0;
    bucket.windowStart = now;
  }

  bucket.count += 1;

  return {
    allowed: bucket.count <= 4,
    retryAfterSeconds: Math.floor((60_000 - elapsed) / 1000),
  };
}

export function resetRateLimitForTests(): void {
  bucket.count = 0;
  bucket.windowStart = Date.now();
}
