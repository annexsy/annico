import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Nav.css';

export default function Nav({ tabs }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `nav__link${isActive ? ' nav__link--active' : ''}`
            }
            onClick={() => setOpen(false)}
            end={tab.path === '/'}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
