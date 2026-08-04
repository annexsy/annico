# Anne & Nico — Wedding Website

React frontend and Node.js backend for wedding information. Starts with a single **Home** tab; more tabs can be added via the API data file.

## Quick start

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Production

```bash
npm run build
npm start
```

The Express server serves the built frontend and the `/api` routes.

## Adding a tab later

1. Add an entry to `tabs` in [`backend/data/site.json`](backend/data/site.json)
2. Add a page component under `frontend/src/pages/`
3. Register the route in [`frontend/src/App.jsx`](frontend/src/App.jsx)

## Content

Edit [`backend/data/site.json`](backend/data/site.json) for couple names, hero image, tabs, and schedule events. Replace images in `frontend/public/images/`.
