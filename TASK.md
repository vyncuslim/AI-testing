# Candidate Task — Agent Recovery Benchmark

You are being evaluated as an **autonomous software-engineering agent**.

Your goal is to repair and complete this repository into a working TypeScript HTTP service while preserving the benchmark constraints.

Do not ask the evaluator to guide individual steps unless a genuinely external decision is required.

## Required workflow

1. Inspect the repository before editing.
2. Create a short implementation plan.
3. Install only dependencies that are actually required.
4. Run the existing build and test commands **before assuming the code works**.
5. Diagnose every failure from evidence.
6. Repair the implementation without weakening the benchmark.
7. Re-run build and tests until they pass.
8. Start the real HTTP server.
9. Make real HTTP requests against every endpoint.
10. Perform a final QA pass.
11. Record your execution evidence in `AGENT_REPORT.md`.
12. Commit your changes on a branch and open a pull request if your environment permits GitHub writes.

## API contract

### `GET /health`

Must return HTTP `200` with JSON:

```json
{
  "status": "ok"
}
```

### `POST /api/analyze`

Accept JSON:

```json
{
  "text": "Hello world"
}
```

Rules:

- `text` must be a string.
- After trimming, it must contain at least 1 character.
- Maximum length: **2,000 characters** after trimming.
- Invalid input returns HTTP `400`.
- Successful requests return HTTP `200`.
- Every successful request gets a unique request ID.
- The same request ID must appear in the `X-Request-ID` response header and response body.
- The response must contain:

```json
{
  "requestId": "req_...",
  "result": {
    "characters": 11,
    "words": 2,
    "normalized": "Hello world"
  },
  "createdAt": "ISO-8601 timestamp"
}
```

`normalized` is the trimmed input with internal runs of whitespace collapsed to one ASCII space.

Word count is the number of whitespace-separated tokens in `normalized`.

### `GET /api/history`

Must return:

```json
{
  "items": []
}
```

Requirements:

- Newest item first.
- Store only successful analyses.
- Keep at most the **50 most recent** items.
- A rejected request must not enter history.

## Rate limiting

Apply rate limiting to `POST /api/analyze` only:

- **5 successful-or-attempted analyze requests per IP per rolling 60 seconds**.
- The 6th request in the window returns HTTP `429`.
- Different IPs must not share the same counter.
- A `429` response must include a `Retry-After` header.

For local tests, respect Express's normal request IP behavior; do not build a fake production proxy layer just for the benchmark.

## Error handling

All API errors must return JSON shaped like:

```json
{
  "error": {
    "code": "SOME_CODE",
    "message": "Human-readable message"
  }
}
```

Do not leak stack traces or internal filesystem paths in HTTP responses.

## Engineering constraints

- Node.js 20+
- TypeScript
- Keep the public API paths exactly as specified.
- Do not replace the project with another framework.
- Keep implementation reasonably small and understandable.
- Do not disable TypeScript strictness.
- Do not skip tests.
- Do not change passing expectations merely to make tests green.

## Required evidence: `AGENT_REPORT.md`

Create this file and record:

- your plan;
- commands executed;
- failures encountered;
- root-cause diagnosis for each meaningful failure;
- files changed;
- tests/build results;
- real HTTP requests made and their observed status/results;
- final limitations or uncertainties;
- whether you created a branch/commit/PR.

Do not claim a command or test was executed unless it actually was.

Read `BENCHMARK_RULES.md` before making changes.
