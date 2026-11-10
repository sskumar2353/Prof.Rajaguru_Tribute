You are taking over an existing React + Vite memorial tribute website for Prof. Rajaguru. The project already works with Supabase for tributes. Do NOT rebuild the project from scratch and do NOT remove or break any existing functionality.

PROJECT GOAL
Create a premium, professional Christian church memorial/tribute website. The visual direction must be based specifically on the two reference images supplied by the user: warm ivory/off-white paper, muted dusty/periwinkle blue, soft lavender-blue, pale sage green, restrained antique-gold accents, dark blue-gray typography, subtle watercolor/paper softness. Do NOT use the previous pink/magenta or bright cyan palette.

CURRENT WEBSITE REQUIREMENTS
1. Keep the existing React + Vite architecture.
2. Keep Supabase integration and all tribute functionality intact.
3. Keep the existing Home, Tributes, Eulogy, Timeline and other working routes.
4. Header brand must remain only “Prof. Rajaguru”. Do not add “In Loving Memory”, “Post Tribute”, “Forever Remembered”, or similar extra header labels.
5. Keep Eulogy content as supplied by the user; do not rewrite or invent facts.
6. Keep the Timeline tab visible in the main navigation.
7. Keep the Timeline page and make it elegant, premium and responsive. A winding life-path SVG style is preferred: thin refined path, subtle milestone markers, alternating content, scroll reveal. Avoid thick road/roadmap graphics and avoid a card-heavy dashboard look.

NAVIGATION
Main navigation should contain:
- Home
- Tributes
- Eulogy
- Images
- Videos
- Timeline

Images route: /photos
Videos route: /videos
Timeline route: /timeline
Do not remove Timeline again.

IMAGES REQUIREMENT
The user's actual image archive is this OneDrive shared folder:
https://1drv.ms/f/c/0C611E8D3ECCD702/Ei4SU4pGo7JLu-Vi6GSR3VEB0R5vkIwBKLEg6j9-Z1iEmw

Important: this is OneDrive, not Google Drive.

The requirement is NOT to display a single archive link only. The website should display the photos themselves in the Images page in a premium memorial gallery.

Implement the correct production-safe way to enumerate the shared OneDrive folder. Prefer:
React frontend -> Supabase Edge Function -> Microsoft Graph/OneDrive shared-link API -> normalized image list -> React gallery.
Do not put Microsoft client secrets, refresh tokens, or privileged credentials in the Vite frontend.
Do not expose secrets in VITE_* variables.
If Microsoft Graph requires configuration, create a clear server-side environment configuration and document exactly what the developer must configure.

The Images page should:
- Render the actual images from the supplied OneDrive folder.
- Use object-fit: cover for gallery cards so images are not distorted.
- Preserve the original aspect ratio when opened in the viewer.
- Use a premium masonry/editorial grid inspired by church memorial brochures.
- Have one or more featured images and balanced supporting images.
- Open an image in a polished lightbox/fullscreen viewer when clicked.
- Include keyboard/close support and mobile support.
- Lazy-load images.
- Show a refined empty/loading/error state.
- Never show broken image icons if an image URL cannot be loaded.
- Do not force the user to manually paste every image URL into memorial.js.

VIDEOS
Use these exact YouTube recordings:
1. https://www.youtube.com/live/QFhyRZfiRnI?si=aZLuVKT6kJWLtV9X
2. https://www.youtube.com/live/CPZcEnu2Ab4?si=J2uTd731Yzjw4OfZ

Video IDs:
- QFhyRZfiRnI
- CPZcEnu2Ab4

The Videos page must contain two premium video containers/cards and the videos must be playable directly on the page through YouTube embed.

Each video card should contain:
- playable 16:9 iframe
- video number
- title
- description
- subtle action to open the dedicated video page or YouTube

Do not use fake thumbnails instead of the playable video.

If automatic YouTube metadata is implemented, use the YouTube Data API through a secure backend/server-side function. Do not expose the YouTube API key in the frontend. If metadata is not implemented, retain clean manually configured titles/descriptions in the media config.

COLOR PALETTE — FOLLOW THE REFERENCE IMAGES
Use approximately:
- Warm ivory / paper: #F7F4ED
- Soft white: #FFFDF8
- Dusty/periwinkle blue: #6675B5
- Deep muted blue: #303A5D
- Soft blue-lavender: #BFC9E5
- Pale sage: #CBD4CA
- Muted antique gold: #B08C43
- Dark ink: #28272B
- Warm muted gray: #74736E

These are directional values, not a requirement to use every hex value everywhere.

The visual feeling should resemble the supplied memorial/funeral brochure:
- elegant
- quiet
- reverent
- premium
- Christian memorial
- editorial
- paper/watercolor softness
- restrained gold
- blue botanical/watercolor influence

Avoid:
- neon colors
- hot pink/magenta
- bright turquoise/cyan
- generic SaaS gradients
- excessive glassmorphism
- excessive rounded cards
- dashboard styling
- oversized playful icons

TYPOGRAPHY
Use an elegant serif for major memorial headings and a clean sans-serif for supporting UI. Playfair Display or Georgia can be used for the editorial/serif feel. Keep typography calm and spacious.

UI DETAILS
- Header: ivory/white, minimal, only Prof. Rajaguru.
- Navigation: deep muted blue, subtle gold active underline.
- Page introductions: ivory/paper background with extremely subtle blue/sage watercolor-like radial texture.
- Cards: warm white/paper, thin neutral borders, restrained shadows.
- Buttons/links: muted blue with antique-gold accents where appropriate.
- Footer: deep muted blue, not purple/magenta.
- Responsive at mobile/tablet/desktop.

TIMELINE
Keep /timeline in the navigation and route.
Use the existing memorial.timeline data structure. Do not invent historical facts.
If timeline is empty, show a polished empty state telling the developer where to add verified timeline entries.
Preferred design: elegant winding thin SVG path through the page with alternating milestone content and subtle scroll reveal. On mobile, collapse to a single vertical path.

EULOGY
The eulogy must use the user's supplied testimony exactly unless the user explicitly asks for proofreading. Do not replace it with generic memorial copy.

TRIBUTES / SUPABASE
Do not break the existing Supabase tribute workflow.
Existing behavior:
- public tribute submission
- name required
- place optional
- message required
- recent tributes display
- all tributes page
- dynamic insertion into Supabase
- newest tribute appears immediately after submission

Place must only render when it has a real value. Never display “Not specified”.
Do not replace Supabase with localStorage or a local database.
Do not expose Supabase service-role keys in the frontend.

PHOTO DATA / MEDIA CONFIG
Keep media configuration centralized, preferably in src/config/media.js. The OneDrive URL and YouTube IDs should be stored there, not scattered through components.

ROUTING
Keep existing working routes and add/retain:
- /photos
- /videos
- /videos/:videoId
- /timeline
If older routes such as /gallery or /photos/images exist, preserve them with redirects where appropriate rather than breaking existing links.

QUALITY CONTROL
Before finishing:
1. Check every import.
2. Check every route.
3. Check that Timeline is visible in navigation.
4. Check that Images and Videos are separate navigation tabs.
5. Check YouTube embeds actually use the two supplied IDs.
6. Check image cards use object-fit correctly and don't stretch/crop important faces unnecessarily.
7. Check mobile layout.
8. Check there are no remaining pink/magenta/cyan primary UI colors.
9. Check Supabase tribute submission still works.
10. Run npm install and npm run build successfully.
11. Fix all build errors before returning the project.
12. Do not remove working features merely to simplify the implementation.

DELIVERABLE
Return the complete updated project as a ZIP. Include a concise README section explaining:
- how the OneDrive image integration works
- required Microsoft/Graph environment variables, if any
- how to configure the two YouTube videos
- required Supabase environment variables
- how to run locally
- how to deploy to Vercel
