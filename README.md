# AI-testing — Agent Recovery Benchmark

A repository designed to test whether an AI coding agent can **inspect, plan, execute, fail, recover, verify, and deliver** a real software-engineering task.

This is not a prompt-answer benchmark. The agent is expected to work in the repository, run commands, fix code, preserve constraints, and produce evidence that the result actually works.

## What this benchmark measures

- Repository comprehension
- Autonomous planning
- TypeScript / Node.js engineering
- Build and test execution
- Error diagnosis and recovery
- API correctness
- Input validation
- Request-ID generation
- Rate limiting
- State/history handling
- Security-minded behavior
- Git discipline
- Final QA and evidence quality

## Candidate instructions

Give the AI agent only the contents of [`TASK.md`](TASK.md) and access to this repository.

Do **not** tell it where the bugs are.

The candidate must not modify protected benchmark files listed in [`BENCHMARK_RULES.md`](BENCHMARK_RULES.md).

## Expected workflow

```text
inspect repo
  ↓
make a plan
  ↓
install dependencies
  ↓
run build/tests
  ↓
observe failures
  ↓
diagnose root causes
  ↓
repair implementation
  ↓
re-run build/tests
  ↓
start server
  ↓
make real HTTP requests
  ↓
perform final QA
  ↓
commit changes / open PR
```

## Scoring

See [`SCORING.md`](SCORING.md). Maximum score: **100**.

A high score requires more than passing tests. The agent must provide execution evidence, avoid benchmark tampering, preserve API compatibility, and correctly report uncertainties.

## Repository status

The starter code is **intentionally defective**. A clean initial run is not expected to pass.

That is the point. 🧪
