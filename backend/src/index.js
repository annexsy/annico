import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const siteData = JSON.parse(
  readFileSync(path.join(__dirname, '../data/site.json'), 'utf-8')
);

app.use(cors());
app.use(express.json());

app.get('/api/site', (_req, res) => {
  const { couple, hero, tabs } = siteData;
  res.json({ couple, hero, tabs });
});

app.get('/api/schedule', (_req, res) => {
  res.json({ events: siteData.schedule });
});

const frontendDist = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
