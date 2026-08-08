# Anne & Nico — Wedding Website

React wedding site with an RSVP form. Content is static JSON; RSVPs are stored in Supabase. The app is meant to deploy to **GitHub Pages**.

## Quick start

```bash
npm install --prefix frontend
cp frontend/.env.example frontend/.env
# fill in Supabase values in frontend/.env
npm run dev --prefix frontend
```

Open http://localhost:5173/annico/

## Supabase setup (once)

1. Create a free project at [supabase.com](https://supabase.com).
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
3. Authentication → Users → add one admin user (email + password).
4. Project Settings → API → copy URL and anon key into `frontend/.env`:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ADMIN_EMAIL=the-admin-user-email@example.com
```

## Pages

| Path | Purpose |
|------|---------|
| `/` | Home (hero + schedule) |
| `/rsvp` | Guest RSVP form |
| `/admin` | Password-protected RSVP list (not in nav) |

Admin login asks only for the password; the email comes from `VITE_ADMIN_EMAIL`.

## Content

Edit [`frontend/public/data/site.json`](frontend/public/data/site.json) for names, tabs, schedule, and image paths. Keep [`backend/data/site.json`](backend/data/site.json) in sync if you still use the Express server locally.

Replace images in `frontend/public/images/`.

## GitHub Pages deploy

1. Repo Settings → Pages → Source: **GitHub Actions**.
2. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_EMAIL`
3. Push to `master` (or `main`). Workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds and deploys.

Site URL: `https://annexsy.github.io/annico/`

## Optional Express backend

The Express app under `backend/` is optional and not used for GitHub Pages hosting.

```bash
npm install
npm install --prefix backend
npm run dev
```
