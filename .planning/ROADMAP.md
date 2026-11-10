# GSD Roadmap & Milestones

## Phase 1: Architectural Foundation & Routing (Completed)
- [x] React 18 + Vite 6 setup with modular CSS.
- [x] Global layout with header, navigation, footer, scroll-to-top.
- [x] Routes: `/`, `/tributes`, `/tributes/all`, `/photos`, `/videos`, `/videos/:videoId`, `/eulogy`, `/timeline`.

## Phase 2: Supabase Tributes Integration (Completed / Maintained)
- [x] Database schema with RLS (`supabase.sql`).
- [x] `tributeService.js` for querying and inserting tributes.
- [x] Form submission with optimistic local update.
- [x] Tributes wall with empty/loading/error states.

## Phase 3: Media & Gallery Polish (In Progress)
- [x] Configure OneDrive folder link and YouTube embed IDs in `src/config/media.js`.
- [x] Videos page with responsive 16:9 players.
- [x] Photos page with memorial masonry grid and source archive bridge.
- [ ] Supabase Edge Function / MS Graph proxy documentation for dynamic automated OneDrive enumeration.

## Phase 4: Autonomous Workflows & Developer Tooling (Active)
- [x] CodeRabbit review automation and configuration.
- [x] GSD (Get Shit Done) spec-driven planning framework.
- [x] Ralph Loop autonomous task execution harness.

## Phase 5: Production Verification & Deployment (Ready)
- [x] Production build passes clean.
- [x] Vercel SPA routing rules verified.
