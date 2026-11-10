# Prof. Rajaguru Memorial Tribute

A modular React 18 + Vite memorial tribute platform honoring the life, faith, family, and teaching ministry of Prof. Y. Rajaguru (1945–2025). Built with a publication-grade Christian church memorial aesthetic, Supabase-backed public tribute submissions, OneDrive photograph gallery integration, and YouTube video recordings.

---

## Navigation & Pages

- **Home** (`/`) — Memorial hero portrait, welcome message, life milestones preview, recent tributes, and featured photo highlights.
- **Tributes** (`/tributes`) — Public tribute submission form (with optional location/place) and display of recent tributes.
- **All Tributes** (`/tributes/all`) — Complete searchable archive of all submitted tributes.
- **Eulogy** (`/eulogy`) — Authentic testimony celebrating Prof. Rajaguru’s life and legacy.
- **Photographs** (`/photos`) — Editorial photo archive with featured compositions, fullscreen interactive lightbox, keyboard navigation, and OneDrive archive integration.
- **Videos** (`/videos` and `/videos/:videoId`) — Playable 16:9 YouTube recordings celebrating funeral services and memories.
- **Timeline** (`/timeline`) — Refined winding SVG life-path with scroll-reveal milestone chapters.

---

## Color Palette & Aesthetic

Designed strictly following memorial and church brochure aesthetics:
- **Warm Ivory / Paper**: `#F7F4ED`
- **Soft White**: `#FFFDF8`
- **Muted Dusty / Periwinkle Blue**: `#6675B5`
- **Deep Muted Blue**: `#303A5D`
- **Soft Blue-Lavender**: `#BFC9E5`
- **Pale Sage Green**: `#CBD4CA`
- **Muted Antique Gold**: `#B08C43` / `#CBB77A`
- **Dark Ink**: `#28272B`
- **Warm Muted Gray**: `#74736E`

---

## Media Configuration

All media settings are centralized in `src/config/media.js`:
- **OneDrive shared folder**: `https://1drv.ms/f/c/0C611E8D3ECCD702/Ei4SU4pGo7JLu-Vi6GSR3VEB0R5vkIwBKLEg6j9-Z1iEmw`
- **YouTube Embed IDs**:
  - `QFhyRZfiRnI` ("Funeral Service & Memories")
  - `CPZcEnu2Ab4` ("A Life Remembered")

---

## OneDrive Image Integration & Architecture

The application implements a secure production pipeline to display photographs without exposing Microsoft credentials to the browser:

```text
React frontend (PhotosPage)
      ↓
photoService.js
      ↓ (invokes)
Supabase Edge Function (supabase/functions/onedrive-photos)
      ↓
Microsoft Graph API (/shares/{token}/driveItem/children)
      ↓
Normalized image list
      ↓
React Gallery & Fullscreen Lightbox
```

### Microsoft Graph Server-Side Setup
To enable dynamic enumeration of private or organizational OneDrive folders:
1. Register an App in the [Azure Portal](https://portal.azure.com/) under **Microsoft Entra ID > App registrations**.
2. Add API permission: `Files.Read.All` (Application permission).
3. Generate a Client Secret under **Certificates & secrets**.
4. Set the following secrets in your Supabase project:
   ```bash
   supabase secrets set MICROSOFT_CLIENT_ID="<your-client-id>"
   supabase secrets set MICROSOFT_CLIENT_SECRET="<your-client-secret>"
   supabase secrets set MICROSOFT_TENANT_ID="<your-tenant-id-or-consumers>"
   supabase secrets set ONEDRIVE_FOLDER_URL="https://1drv.ms/f/c/0C611E8D3ECCD702/Ei4SU4pGo7JLu-Vi6GSR3VEB0R5vkIwBKLEg6j9-Z1iEmw"
   ```
5. Deploy the edge function:
   ```bash
   supabase functions deploy onedrive-photos
   ```

*Note: If the Edge Function is not yet deployed, `photoService.js` automatically falls back to curated verified photos in `src/data/memorial.js` with direct access to the OneDrive folder link, ensuring zero broken image icons or blank states.*

---

## Supabase Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and execute `supabase.sql`.
3. This creates the `tributes` table with columns:
   - `id` (UUID, primary key)
   - `name` (varchar 100, required)
   - `place` (varchar 100, optional — never displays "Not specified" if empty)
   - `message` (text, 3 to 1000 characters)
   - `created_at` (timestamptz)
4. Row Level Security (RLS) policies allow public visitors to read tributes and submit new ones securely via the public anon key.
5. Create `.env` based on `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

---

## Vercel Deployment

1. Connect your repository in the Vercel dashboard.
2. In Project Settings > **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Single Page Application (SPA) routing is pre-configured in `vercel.json` with direct rewrites to `/index.html`.

---

## Development Harness & Workflows

- **CodeRabbit**: Integrated via `.coderabbit.yaml` for automated reviews covering component modularity, security, and palette compliance.
- **Get Shit Done (GSD)**: Spec-driven milestone tracking organized in `.planning/` (`PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`) and `.agent/skills/gsd/`.
- **Ralph Loop**: Task execution harness in `prd.json`, `progress.txt`, and executable scripts `scripts/ralph.ps1` / `scripts/ralph.sh`.
