import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import './styles/global.css';

export default function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/site')
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
    <BrowserRouter>
      <div className="app">
        <Nav tabs={site.tabs} />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<Home couple={site.couple} hero={site.hero} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
