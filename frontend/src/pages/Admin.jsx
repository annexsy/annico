import { useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import './Admin.css';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authStatus, setAuthStatus] = useState('checking');
  const [rsvps, setRsvps] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [loadingRsvps, setLoadingRsvps] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setAuthStatus('ready');
      return undefined;
    }

    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSession(data.session);
        setAuthStatus('ready');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session || !supabase) return undefined;

    let cancelled = false;

    async function loadRsvps() {
      setLoadingRsvps(true);
      setLoadError('');

      const { data, error } = await supabase
        .from('rsvps')
        .select('id, name, attending, dietary, created_at')
        .order('created_at', { ascending: false });

      if (cancelled) return;

      if (error) {
        setLoadError('Could not load RSVPs.');
        setRsvps([]);
      } else {
        setRsvps(data ?? []);
      }

      setLoadingRsvps(false);
    }

    loadRsvps();

    return () => {
      cancelled = true;
    };
  }, [session]);

  const counts = useMemo(() => {
    const attending = rsvps.filter((row) => row.attending).length;
    return {
      total: rsvps.length,
      attending,
      declining: rsvps.length - attending,
    };
  }, [rsvps]);

  async function handleLogin(event) {
    event.preventDefault();
    setAuthError('');

    if (!isSupabaseConfigured || !supabase) {
      setAuthError('Supabase is not configured.');
      return;
    }

    const email = import.meta.env.VITE_ADMIN_EMAIL;
    if (!email) {
      setAuthError('Admin email is not configured.');
      return;
    }

    setAuthStatus('signing-in');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError('Incorrect password.');
      setAuthStatus('ready');
      return;
    }

    setPassword('');
    setAuthStatus('ready');
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setRsvps([]);
  }

  if (authStatus === 'checking') {
    return <div className="page-loading">Loading</div>;
  }

  if (!session) {
    return (
      <section className="admin-page">
        <div className="admin-page__inner admin-page__inner--narrow">
          <h1 className="admin-page__title">Admin</h1>
          <p className="admin-page__lead">Enter the admin password to view RSVPs.</p>

          <form className="admin-login" onSubmit={handleLogin}>
            <label className="admin-login__field">
              <span className="admin-login__label">Password</span>
              <input
                className="admin-login__input"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {authError ? <p className="admin-login__error">{authError}</p> : null}

            <button
              type="submit"
              className="admin-page__button"
              disabled={authStatus === 'signing-in'}
            >
              {authStatus === 'signing-in' ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-page__inner">
        <div className="admin-page__header">
          <div>
            <h1 className="admin-page__title">RSVPs</h1>
            <p className="admin-page__lead">Guest responses for Anne &amp; Nico.</p>
          </div>
          <button type="button" className="admin-page__button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>

        <div className="admin-counts">
          <div className="admin-counts__item">
            <span className="admin-counts__value">{counts.total}</span>
            <span className="admin-counts__label">Total</span>
          </div>
          <div className="admin-counts__item">
            <span className="admin-counts__value">{counts.attending}</span>
            <span className="admin-counts__label">Attending</span>
          </div>
          <div className="admin-counts__item">
            <span className="admin-counts__value">{counts.declining}</span>
            <span className="admin-counts__label">Declining</span>
          </div>
        </div>

        {loadError ? <p className="admin-login__error">{loadError}</p> : null}
        {loadingRsvps ? <p className="admin-page__status">Loading responses…</p> : null}

        {!loadingRsvps && rsvps.length === 0 ? (
          <p className="admin-page__status">No RSVPs yet.</p>
        ) : null}

        {rsvps.length > 0 ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Attending</th>
                  <th>Dietary / allergies</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.attending ? 'Yes' : 'No'}</td>
                    <td>{row.dietary || '—'}</td>
                    <td>
                      {new Date(row.created_at).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}
