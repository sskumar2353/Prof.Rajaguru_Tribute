# Project: Prof. Rajaguru Memorial Tribute Platform

## Overview
A modular React + Vite memorial tribute website honoring the life, faith, family, and teaching ministry of Prof. Y. Rajaguru (1945–2025). The platform allows family, friends, and community members worldwide to view tributes, browse photographs and video recordings, reflect on his life timeline and eulogy, and submit heartfelt personal tributes stored in Supabase.

## Tech Stack
- **Frontend Framework**: React 18 (Vite 6 build system)
- **Routing**: React Router DOM 7
- **Styling**: CSS Modules + Global design tokens (Custom CSS variables)
- **Database / Backend**: Supabase (PostgreSQL with Row Level Security)
- **Media**: OneDrive archive integration, YouTube embed players
- **Deployment**: Vercel (with client-side SPA routing rewrites)

## Design Aesthetics
- **Theme**: Christian memorial brochure / editorial publication aesthetic.
- **Tone**: Reverent, warm, dignified, calm, spacious.
- **Palette**: Warm ivory (`#F7F4ED`), soft paper white (`#FFFDF8`), muted dusty periwinkle blue (`#6675B5`), deep muted blue (`#303A5D`), antique gold accents (`#B08C43`), dark ink typography (`#28272B`), pale sage (`#CBD4CA`).

## Architecture & Security Principles
- Supabase Publishable Key only in frontend; no service-role secrets.
- External API secrets (e.g. Microsoft Graph for OneDrive enumeration) handled server-side / Supabase Edge Functions.
- Zero client-side credential leakage.
- Strict component modularity with CSS module isolation.
