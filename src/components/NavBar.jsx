import { NavLink } from "react-router-dom";

function NavBar({ isDarkMode = false, onToggleTheme }) {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects (API)" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="portfolio-navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <ul className="navbar-menu">
          {navLinks.map((link) => (
            <li key={link.to} className="navbar-item">
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {onToggleTheme && (
          <div className="navbar-actions">
            <button
              type="button"
              onClick={onToggleTheme}
              className="theme-toggle-btn"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              <span className="theme-icon" aria-hidden="true">
                {isDarkMode ? "☀️" : "🌙"}
              </span>
              <span className="theme-label">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
