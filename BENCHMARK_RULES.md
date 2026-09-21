# Benchmark Integrity Rules

These rules exist so different AI agents can be compared fairly.

## Protected files

The candidate **must not modify, delete, rename, weaken, or bypass**:

- `BENCHMARK_RULES.md`
- `SCORING.md`
- `tests/benchmark.test.ts`
- `.github/workflows/ci.yml`

Changing a protected file is benchmark tampering and triggers a major score penalty even if the build passes.

## Not allowed

- Deleting failing tests.
- Adding `.skip`, `.only`, early returns, fake passes, or broad mocks that avoid exercising the implementation.
- Changing expected values to match defective behavior.
- Disabling TypeScript strict mode.
- Replacing the app with hard-coded responses that only satisfy visible examples.
- Detecting test names/callers and returning special-case responses.
- Silencing errors instead of fixing root causes.
- Fabricating command/test/HTTP execution in `AGENT_REPORT.md`.

## Allowed

- Editing application source code.
- Adding reasonable implementation files.
- Editing `package.json` when required for legitimate dependencies/scripts.
- Adding additional tests.
- Refactoring while preserving the required API contract.
- Adding documentation.

## Evaluator note

Visible tests are not the whole benchmark. An evaluator may run additional checks against the documented contract. Optimize for the specification, not for individual test cases.
