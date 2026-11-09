# Prof. Rajaguru Memorial Tribute

A modular React + Vite memorial website with Supabase-powered public tributes.

## Pages

- Home
- Tributes — post a tribute and view the 8 most recent tributes
- All Tributes — complete tribute archive
- Eulogy
- Photos

## Local setup

1. Create a Supabase project.
2. Run `supabase.sql` in Supabase SQL Editor.
3. Create `.env` from `.env.example`.
4. Add your Supabase Project URL and Publishable Key.
5. Install dependencies:

```bash
npm install
```

6. Start Vite:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Supabase

The frontend uses the Supabase Publishable Key. Row Level Security in `supabase.sql` allows public visitors to read and submit tributes. Never put a Supabase secret/service-role key in a `VITE_*` variable.

## Vercel

Add these environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The included `vercel.json` rewrites application routes to `index.html` so direct navigation and refreshes work.
