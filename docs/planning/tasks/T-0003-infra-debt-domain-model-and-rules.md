# T-0003: Infra Debt Domain Model and Lifecycle Rules

## Metadata

- Task ID: `T-0003`
- Status: `Completed`
- Owner: `Aditya`
- Created: `2026-02-05`
- Last Updated: `2026-02-05`
- Index Row Updated: `Yes`

## Why

Implement deterministic domain logic for classifying lifecycle risk and generating an Infra Debt score.

## Scope

In scope:

- Type interfaces
- Static lifecycle rules dataset for 8 components
- Parser for manual and pasted input
- Scoring and prioritization logic

Out of scope:

- External lifecycle APIs
- Cost estimation engine

## Components Impacted

- [x] `apps/web`

## Acceptance Criteria

1. Components classify into overdue/due soon/healthy.
2. Infra Debt score follows agreed penalties.
3. Top priorities rank by urgency, then nearest EOL.
4. Unmapped inputs are surfaced as warnings.

## Execution Streams

- [x] `web domain stream`

## PR Links

- `apps/web`: pending
