# Ways of Working

## Purpose

Define a repeatable workflow for planning and executing tasks across multiple component repositories.

## Source of Truth

- Task intent and status are tracked in this repository.
- Component repos contain implementation details and code changes.
- `docs/tasks/INDEX.md` is the status dashboard across all tasks.

## Task IDs

- Use `T-0001` style IDs.
- Reuse the same task ID across:
  - planning task file
  - thread titles
  - implementation branches
  - pull requests

## Thread Model

- One control thread per task (`T-xxxx-control`) for lifecycle/state management.
- One implementation thread per impacted component (`T-xxxx-<component>`).

## Lifecycle States

1. `Planned`
2. `In Progress`
3. `PR Open`
4. `Merged`
5. `Done`

## Completion Rule

A task is complete only when all relevant implementation PRs are merged and the planning task record reflects final status and links.

## Status Update Process

Whenever a task status changes:

1. Update the task file metadata/status.
2. Update the matching row in `docs/tasks/INDEX.md`.
3. Add/update any checkpoint note in the task file.

## Commit Message Convention

All repositories in this initiative follow the same commit message format:

`[action][component] <message>`

Allowed `action` values:

- `new`
- `update`
- `remove`
- `refactor`
- `chore`

Allowed `component` values:

- `task`
- `adr`
- `workflow`
- `roadmap`
- `template`
- `repo`

Examples:

- `[new][task] add T-0001 task definition`
- `[update][workflow] clarify task status checkpoint updates`
- `[new][adr] record multi-repo planning decision`
