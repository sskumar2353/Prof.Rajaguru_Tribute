# GSD Current State & Decision Log

## Current State
- **Active Phase**: Phase 4 (Autonomous Workflows & Developer Tooling)
- **Status**: Stable, building cleanly (`npm run build` succeeds).
- **Git Status**: Initialized repository.

## Key Decisions
1. **Frontend Authentication Model**: Client uses public anon/publishable key only. No server/service-role credentials exist in client bundles.
2. **Styling Paradigm**: CSS Modules alongside global CSS custom properties to maintain modularity and avoid naming collisions.
3. **Media Centralization**: All external video IDs and OneDrive source URLs are centralized in `src/config/media.js`.
4. **Planning Structure**: Using Open GSD spec-driven framework in `.planning/` to prevent context drift and ensure feature integrity across iterative sessions.

## Next Steps
- Implement Ralph Loop runner harness (`scripts/ralph.ps1` and `scripts/ralph.sh`).
- Register workspace skills in `.agent/skills/`.
