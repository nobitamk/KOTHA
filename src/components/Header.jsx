// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";

const Header = ({ dark, setDark }) => {
  const [showContact, setShowContact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const name = localStorage.getItem("loggedInUser");
      console.log("Checking login status, loggedInUser:", name);
      setUsername(name || null);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 1000); // Poll every 1s for reliability
    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Placeholder API call; uncomment if backend supports
      // const response = await fetch("/api/logout", { method: "POST" });
      // if (!response.ok) throw new Error("Logout failed");
      // console.log("API logout successful");

      localStorage.removeItem("loggedInUser");
      setUsername(null);
      setToast({ message: "Logged out successfully", type: "success" });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setToast({ message: "Logout failed", type: "error" });
    }

    // Clear toast after 3 seconds
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="InfoYieldX Logo" className="logo" />
        </div>

        <nav className={`nav ${mobileMenuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Our Services</Link>
          <Link to="/blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
        </nav>

        <div className="header-right">
          {username && (
            <div className="icon-wrapper auth-section">
              <span className="username">Hi, {username}</span>
              <button className="logout-button" onClick={handleLogout} aria-label="Logout">
                Logout
              </button>
            </div>
          )}

          <div
            className="icon-wrapper"
            onMouseEnter={() => setShowContact(true)}
            onMouseLeave={() => setShowContact(false)}
          >
            <Link to="/contact" className="icon">📞</Link>
            {showContact && (
              <div className="dropdown">
                <div>✉️ <a href="mailto:info@infoyieldx.com">info@Kotha.com</a></div>
                <div>📱 <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a></div>
                <div>📸 <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">Instagram</a></div>
                <div>🌐 <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">Website</a></div>
              </div>
            )}
          </div>

          {!username && (
            <div
              className="icon-wrapper"
              onMouseEnter={() => {
                const tooltip = document.querySelector(".login-tooltip");
                if (tooltip) {
                  tooltip.style.opacity = "1";
                  tooltip.style.visibility = "visible";
                }
              }}
              onMouseLeave={() => {
                const tooltip = document.querySelector(".login-tooltip");
                if (tooltip) {
                  tooltip.style.opacity = "0";
                  tooltip.style.visibility = "hidden";
                }
              }}
            >
              <Link to="/login" className="icon">👤</Link>
              <span className="login-tooltip">Login</span>
            </div>
          )}

          <button className="theme-toggle" onClick={() => setDark((d) => !d)} aria-label="Toggle Theme">
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </header>

      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem clamp(1rem, 5vw, 1.5rem);
          background: ${dark ? "#1a1e24" : "#ffffff"};
          color: ${dark ? "#ffffff" : "#1a1e24"};
          box-shadow: 0 2px 8px rgba(0, 0, 0, ${dark ? 0.3 : 0.1});
          position: sticky;
          top: 0;
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .logo {
          height: clamp(2rem, 6vw, 2.75rem);
          object-fit: contain;
        }

        .nav {
          display: flex;
          gap: clamp(1rem, 3vw, 1.5rem);
          transition: transform 0.3s ease;
        }

        .nav.open {
          transform: translateX(0);
        }

        .nav-link {
          text-decoration: none;
          color: ${dark ? "#ffffff" : "#1a1e24"};
          font-weight: 500;
          font-size: clamp(0.875rem, 3vw, 1rem);
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #1ca9c9;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: clamp(0.75rem, 3vw, 1.25rem);
        }

        .icon {
          font-size: 1.5rem;
          text-decoration: none;
          color: ${dark ? "#ffffff" : "#1a1e24"};
          transition: color 0.3s;
        }

        .icon:hover {
          color: #1ca9c9;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .auth-section {
          gap: 0.75rem;
        }

        .username {
          font-weight: 600;
          font-size: clamp(0.875rem, 3vw, 1rem);
          color: ${dark ? "#ffffff" : "#1a1e24"};
        }

        .logout-button {
          padding: 0.5rem 1rem;
          background: #dc2626;
          border: none;
          border-radius: 6px;
          color: #ffffff;
          font-weight: 600;
          font-size: clamp(0.875rem, 3vw, 1rem);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        .logout-button:hover {
          background: #b91c1c;
          transform: scale(1.05);
        }

        .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: ${dark ? "#23272f" : "#ffffff"};
          color: ${dark ? "#ffffff" : "#1a1e24"};
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, ${dark ? 0.4 : 0.2});
          padding: 1rem;
          min-width: 12rem;
          z-index: 1001;
          font-size: 0.875rem;
        }

        .dropdown a {
          color: ${dark ? "#6dd5ed" : "#0072ff"};
          text-decoration: none;
          transition: color 0.3s;
        }

        .dropdown a:hover {
          color: #1ca9c9;
        }

        .dropdown > div {
          margin-bottom: 0.5rem;
        }

        .dropdown > div:last-child {
          margin-bottom: 0;
        }

        .theme-toggle {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: none;
          background: ${dark ? "#374151" : "#e5e7eb"};
          color: ${dark ? "#ffffff" : "#1a1e24"};
          cursor: pointer;
          font-size: clamp(0.875rem, 3vw, 1rem);
          transition: background 0.3s;
        }

        .theme-toggle:hover {
          background: ${dark ? "#4b5563" : "#d1d5db"};
        }

        .login-tooltip {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: ${dark ? "#23272f" : "#ffffff"};
          color: ${dark ? "#ffffff" : "#1a1e24"};
          border-radius: 6px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, ${dark ? 0.4 : 0.2});
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          transition: opacity 0.2s, visibility 0.2s;
          z-index: 1002;
          pointer-events: none;
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: ${dark ? "#ffffff" : "#1a1e24"};
          transition: color 0.3s;
        }

        .hamburger:hover {
          color: #1ca9c9;
        }

        .toast {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 500;
          z-index: 1003;
          animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2.7s forwards;
        }

        .toast.success {
          background: #10b981;
        }

        .toast.error {
          background: #ef4444;
        }

        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeOut {
          to { opacity: 0; }
        }
@media (max-width: 768px) {
  .header {
    padding: 0.75rem 1rem;
  }

  .logo {
    height: 3rem !important; /* Bigger logo on mobile */
  }

  .nav {
    position: fixed;
    top: 4.5rem;
    left: 0;
    right: 0;
    flex-direction: column;
    background: ${dark ? "#1a1e24" : "#ffffff"};
    padding: 1.5rem;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
  }

  .nav.open {
    transform: translateX(0);
  }

  .nav-link {
    padding: 0.75rem 0;
    font-size: 1rem;
    text-align: center;
  }

  .hamburger {
    display: block;
    font-size: 1.5rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .icon,
  .theme-toggle,
  .logout-button {
    font-size: 1.2rem !important;
    padding: 0.4rem !important;
    border-radius: 6px;
  }

  .login-tooltip {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }

  .username {
    font-size: 0.875rem;
  }

  .auth-section {
    gap: 0.4rem;
    flex-direction: row;
    align-items: center;
  }

  .dropdown {
    font-size: 0.85rem;
    padding: 0.75rem;
  }
    @media (max-width: 768px) {
  .icon-wrapper:hover .dropdown {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none;
  }

  .dropdown {
    display: none !important;
  }
}

}

      `}</style>
    </>
  );
};

export default Header;