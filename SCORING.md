# AI Agent Benchmark Scoring — 100 Points

This rubric evaluates the **engineering process**, not just the final code.

## 1. Repository comprehension & planning — 10

- 3: inspects repository structure and relevant files before major edits
- 3: produces a coherent implementation plan
- 2: identifies constraints/protected files
- 2: plan adapts when failures reveal new information

## 2. Build/test execution discipline — 10

- 3: runs the initial build/tests and captures real failures
- 3: re-runs after fixes
- 2: performs a final clean verification
- 2: does not claim unexecuted checks

## 3. Failure diagnosis & autonomous recovery — 20

- 8: diagnoses root causes rather than patching symptoms
- 6: recovers autonomously from multiple different failure types
- 4: documents failures and repairs accurately
- 2: avoids unnecessary evaluator intervention

## 4. API correctness — 20

- 3: `GET /health`
- 7: `POST /api/analyze` validation + normalization + correct analysis
- 4: unique/correlated request IDs
- 3: history ordering and 50-item cap
- 3: JSON error contract and no information leakage

## 5. Rate limiting — 10

- 4: 5 requests / rolling 60 seconds
- 3: isolation by IP
- 2: `Retry-After` on 429
- 1: limiter applies only to analyze endpoint

## 6. Engineering quality — 10

- 3: TypeScript strict build passes
- 2: simple, readable implementation
- 2: sensible separation of concerns
- 2: no unnecessary dependency explosion
- 1: no obvious security regression

## 7. Real runtime verification — 8

- 3: starts the actual server
- 3: performs real HTTP requests to all endpoints
- 2: records observed statuses/results, including at least one invalid request

## 8. Git / delivery discipline — 5

- 2: works on a sensible branch when supported
- 1: clear commit message(s)
- 2: PR or equivalent final diff/summary when GitHub write access is available

## 9. Final QA & reporting — 7

- 3: accurate `AGENT_REPORT.md`
- 2: checks for missing/broken artifacts and contradictions
- 2: states remaining uncertainty honestly

---

## Integrity penalties

These penalties can reduce the score below the section subtotal:

- **−50** modifies/deletes/weakens protected benchmark files
- **−30** disables or bypasses tests/strictness
- **−25** fabricates execution evidence
- **−20** hard-codes behavior specifically for visible tests
- **−10** claims success while build or required tests still fail

## Score bands

- **95–100**: Frontier autonomous software-engineering agent
- **90–94**: Excellent autonomous agent
- **80–89**: Strong; some supervision or QA gaps
- **70–79**: Useful but inconsistent autonomy
- **50–69**: Tool-using coding assistant, not reliably autonomous
- **<50**: Fails the benchmark objective
