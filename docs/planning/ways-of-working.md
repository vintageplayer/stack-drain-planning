# Ways of Working

## Purpose

Define a repeatable workflow for planning and executing tasks across the monorepo.

## Source of Truth

- Task intent and status are tracked under `docs/planning/tasks`.
- `docs/planning/tasks/INDEX.md` is the status dashboard across all tasks.

## Task IDs

- Use `T-0001` style IDs.
- Reuse the same task ID across:
  - planning task file
  - thread titles
  - implementation branches
  - pull requests

## Thread Model

- One control thread per task (`T-xxxx-control`) for lifecycle/state management.
- One implementation thread per active stream when parallel execution is needed.

## Lifecycle States

1. `Planned`
2. `In Progress`
3. `PR Open`
4. `Merged`
5. `Done`

## Completion Rule

A task is complete only when acceptance criteria are met and task/index status is updated.

## Status Update Process

Whenever a task status changes:

1. Update the task file metadata/status.
2. Update the matching row in `docs/planning/tasks/INDEX.md`.
3. Add or update checkpoint notes in the task file.

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
- `web`

Examples:

- `[new][task] add T-0001 foundation task`
- `[update][workflow] clarify status checkpoint updates`
- `[new][web] scaffold infra debt analyzer page`
