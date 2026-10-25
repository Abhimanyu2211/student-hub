import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span>Student</span>Hub
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/health" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            System Health
          </NavLink>
          <a
            href="https://abhimanyu2211.github.io/student-hub/"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            Static Live Site ↗
          </a>
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
            Portal Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
