---
name: gsd
description: Spec-driven, context-engineered development workflow using the Get Shit Done (GSD) framework. Use when planning features, managing project milestones, executing spec-driven tasks, or verifying completed phases without context degradation.
---

# Get Shit Done (GSD) Skill

The **Get Shit Done (GSD)** workflow enables disciplined, spec-driven software development by isolating planning, execution, and verification into focused phases. This keeps tasks predictable and prevents context degradation.

## Directory Structure
```
.planning/
├── PROJECT.md      # Project vision, tech stack, constraints
├── REQUIREMENTS.md # Functional and non-functional requirements
├── ROADMAP.md      # Milestones, phases, and task checklists
└── STATE.md        # Current active phase, decisions log, next steps
```

## Standard GSD Lifecycle

### 1. Discuss Phase (`/gsd:discuss`)
- Identify requirements, constraints, edge cases, and user expectations before writing code.
- Record decisions in `.planning/STATE.md`.

### 2. Plan Phase (`/gsd:plan`)
- Break the active milestone into small, atomic, verifiable tasks.
- Keep each task small enough to execute cleanly within a single context window.
- Update `.planning/ROADMAP.md` and `prd.json`.

### 3. Execute Phase (`/gsd:execute`)
- Execute one task at a time.
- Verify changes with tests or build commands (`npm run build`).
- Make atomic Git commits for each completed unit of work.

### 4. Verify Phase (`/gsd:verify`)
- Validate real user-facing outcomes against `.planning/REQUIREMENTS.md`.
- Ensure no regressions, styling violations, or console errors exist.

### 5. Ship Phase (`/gsd:ship`)
- Update `.planning/STATE.md` with completed items.
- Advance the milestone marker in `.planning/ROADMAP.md`.
