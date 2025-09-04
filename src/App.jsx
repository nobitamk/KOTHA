import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import './App.css';

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark-theme" : "light-theme";
    return () => { document.body.className = ""; };
  }, [dark]);

  return (
    <Router>
      <button
        onClick={() => setDark((d) => !d)}
        style={{
          position: "fixed",
          top: 20,
          right: 30,
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: 20,
          border: "none",
          background: dark ? "#222" : "#eee",
          color: dark ? "#fff" : "#222",
          cursor: "pointer",
          fontWeight: 700,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "background 0.2s, color 0.2s"
        }}
        aria-label="Toggle theme"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;