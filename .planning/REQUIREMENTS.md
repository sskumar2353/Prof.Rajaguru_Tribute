# Requirements Specification (GSD)

## Functional Requirements

### 1. Navigation & Brand
- [x] Brand header must strictly display "Prof. Rajaguru" without clutter.
- [x] Main navigation includes: Home, Tributes, Eulogy, Images (`/photos`), Videos (`/videos`), Timeline (`/timeline`).
- [x] Timeline link must remain visible in navigation.

### 2. Tributes System (Supabase)
- [x] Public tribute submission form (Name required, Message required, Place optional).
- [x] Dynamic insertion to Supabase `tributes` table.
- [x] Recent tributes display on `/tributes` (up to 8 latest items).
- [x] Full tribute archive available at `/tributes/all`.
- [x] Prevent rendering "Not specified" if place is empty.
- [x] Real-time/immediate appearance of newly submitted tributes.

### 3. Images & Media Gallery
- [x] Centralized media configuration in `src/config/media.js`.
- [x] Integration with OneDrive shared folder (`https://1drv.ms/f/c/0C611E8D3ECCD702/Ei4SU4pGo7JLu-Vi6GSR3VEB0R5vkIwBKLEg6j9-Z1iEmw`).
- [x] Masonry/editorial grid with featured and supporting image cards.
- [x] Safe fallback and direct archive link for OneDrive source folder.
- [x] `object-fit: cover` to avoid image distortion.
- [x] Lightbox / fullscreen viewer modal preserving original aspect ratio.

### 4. Videos
- [x] Embedded YouTube live recordings: `QFhyRZfiRnI` and `CPZcEnu2Ab4`.
- [x] Playable 16:9 iframe cards with titles and descriptions.
- [x] Dedicated detail page `/videos/:videoId`.
- [x] No fake thumbnails replacing players.

### 5. Eulogy & Timeline
- [x] Eulogy reflects authentic testimony without altered historical facts.
- [x] Winding SVG path timeline on `/timeline` with alternating milestones and scroll reveal.
- [x] Mobile responsiveness for timeline (linear collapsed layout).

## Non-Functional Requirements
- [x] Production build clean without warnings or errors (`npm run build`).
- [x] Strict color scheme compliance (no neon, magenta, or bright cyan).
- [x] Responsive layout across 320px mobile to 1440px desktop.
