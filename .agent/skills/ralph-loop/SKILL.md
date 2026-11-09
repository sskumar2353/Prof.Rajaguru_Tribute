---
name: ralph-loop
description: Autonomous task loop execution harness based on the Ralph Wiggum pattern. Uses external state (prd.json, progress.txt) and atomic task iterations with fresh context to execute tasks without context degradation.
---

# Ralph Loop Skill

The **Ralph Loop** pattern runs autonomous AI agent iterations over a structured product backlog (`prd.json`), keeping context fresh on each iteration and persisting state on disk (`progress.txt`).

## Files in the Loop
- `prd.json`: Backlog of tasks, priority, acceptance criteria, and status (`pending`, `in_progress`, `done`).
- `progress.txt`: Append-only progress log tracking completed work, commits, and learnings.
- `scripts/ralph.ps1` / `scripts/ralph.sh`: Script harness to check status, find the next task, or complete a task.

## Execution Pattern
1. **Fetch Next Task**:
   ```powershell
   .\scripts\ralph.ps1 -Action next
   ```
2. **Implement Task**:
   - Focus exclusively on the selected task's acceptance criteria.
   - Run verification (e.g. `npm run build`).
3. **Commit & Log**:
   ```powershell
   .\scripts\ralph.ps1 -Action complete -TaskId <TASK_ID>
   git add -A
   git commit -m "feat(<scope>): implement <TASK_ID> <description>"
   ```
4. **Iterate**:
   - Repeat with the next pending task until all items in `prd.json` are marked `done`.

## Interaction with Antigravity
You can combine the Ralph Loop with Antigravity's `/goal` command for end-to-end autonomous overnight execution or pair programming sprints.
