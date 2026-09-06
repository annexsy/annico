import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Rsvp from './pages/Rsvp';
import { asset } from './lib/assets';
import './styles/global.css';

export default function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(asset('data/site.json'))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load site');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setSite(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <div className="page-error">Unable to load the site</div>;
  }

  if (!site) {
    return <div className="page-loading">Loading</div>;
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <div className="app">
        <Nav tabs={site.tabs} />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  couple={site.couple}
                  hero={site.hero}
                  venue={site.venue}
                  schedule={site.schedule}
                />
              }
            />
            <Route path="/rsvp" element={<Rsvp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
