// src/pages/Welcome.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Welcome = ({ dark = false }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Check for logged-in user
    const storedName = localStorage.getItem("loggedInUser");
    if (!storedName) {
      console.log("No user found, redirecting to /");
      navigate("/");
    } else {
      setName(storedName);
    }

    // GSAP animations for hero entrance
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    // Progress circle animation (4 seconds)
    if (circleRef.current) {
      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: 314 },
        { strokeDashoffset: 0, duration: 4, ease: "linear" }
      );
    }

    // Cinematic zoom transition after 4 seconds
    const timer = setTimeout(() => {
      if (containerRef.current) {
        console.log("Starting zoom transition to /");
        gsap.to(containerRef.current, {
          scale: 3,
          opacity: 0,
          rotate: 5,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            console.log("Redirecting to /");
            navigate("/");
          },
        });
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    if (containerRef.current) {
      console.log("Continue button clicked, starting zoom transition to /");
      gsap.to(containerRef.current, {
        scale: 3,
        opacity: 0,
        rotate: 5,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          console.log("Redirecting to /");
          navigate("/");
        },
      });
    }
  };

  return (
    <div ref={containerRef} style={{ ...styles.fullscreen, background: dark ? styles.fullscreen.background : "linear-gradient(135deg, #f0f4f8 0%, #e0f0ff 100%)" }}>
      <div style={{ ...styles.waveBackground, background: dark ? styles.waveBackground.background : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(28,169,201,0.1)" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,144C384,139,480,149,576,170.7C672,192,768,224,864,213.3C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom` }} />
      <div ref={heroRef} style={styles.hero}>
        <h1 style={{ ...styles.heading, color: dark ? "#fff" : "#1a1e24" }}>
          Welcome, <span style={{ ...styles.name, color: dark ? "#ffd700" : "#d4a017" }}>{name || "Guest"}</span>
        </h1>
        <p style={{ ...styles.subheading, color: dark ? "rgba(255, 255, 255, 0.9)" : "rgba(26, 30, 36, 0.8)" }}>
          Discover innovation with <span style={styles.brand}>Kotha</span>
        </p>
        <button
          style={{ ...styles.button, background: dark ? "#1ca9c9" : "#0072ff", color: "#fff" }}
          onClick={handleContinue}
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, {
              scale: 1.05,
              background: dark ? "#00b4d8" : "#005bb5",
              duration: 0.3,
            })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, {
              scale: 1,
              background: dark ? "#1ca9c9" : "#0072ff",
              duration: 0.3,
            })
          }
          aria-label="Continue to homepage"
        >
          Get Started
        </button>
        <div style={styles.progressCircle}>
          <svg width="40" height="40" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={dark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}
              strokeWidth="10"
            />
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={dark ? "#1ca9c9" : "#0072ff"}
              strokeWidth="10"
              strokeDasharray="314"
              strokeDashoffset="314"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            />
          </svg>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>
        {`
          .fullscreen {
            overflow: hidden;
          }

          .wave-background {
            animation: waveMove 15s ease-in-out infinite;
          }

          .brand {
            animation: pulseBrand 2s infinite ease-in-out;
          }

          .name {
            animation: fadeInName 1.5s ease-out;
          }

          @keyframes waveMove {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }

          @keyframes pulseBrand {
            0% { text-shadow: 0 0 0.5rem rgba(28, 169, 201, 0.5); }
            50% { text-shadow: 0 0 1rem rgba(28, 169, 201, 0.8); }
            100% { text-shadow: 0 0 0.5rem rgba(28, 169, 201, 0.5); }
          }

          @keyframes fadeInName {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .button:active::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
          }

          @keyframes ripple {
            to {
              width: 12rem;
              height: 12rem;
              opacity: 0;
            }
          }

          @media (max-width: 768px) {
            .fullscreen { padding: 1rem; }
            .hero { padding: 2rem; }
            .heading { font-size: clamp(2rem, 6vw, 2.5rem); }
            .subheading { font-size: clamp(0.875rem, 3vw, 1rem); }
            .button { padding: 0.75rem 2rem; font-size: clamp(0.875rem, 3vw, 1rem); }
            .progress-circle { bottom: 1rem; }
          }

          @media (max-width: 480px) {
            .hero { padding: 1.5rem; }
            .heading { font-size: clamp(1.5rem, 5vw, 2rem); }
            .subheading { font-size: clamp(0.75rem, 2.5vw, 0.875rem); }
            .button { width: 100%; padding: 0.75rem; }
            .wave-background { height: 40%; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  fullscreen: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "clamp(1rem, 5vw, 2rem)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  waveBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "50%",
    background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(28,169,201,0.2)" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,144C384,139,480,149,576,170.7C672,192,768,224,864,213.3C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom`,
    backgroundSize: "cover",
    zIndex: 1,
    pointerEvents: "none",
  },
  hero: {
    maxWidth: "min(90%, 60rem)",
    padding: "clamp(2rem, 5vw, 3rem)",
    position: "relative",
    zIndex: 2,
  },
  heading: {
    fontSize: "clamp(2.5rem, 7vw, 3.5rem)",
    fontWeight: 800,
    marginBottom: "0.75rem",
    letterSpacing: "-0.02em",
  },
  name: {
    color: "#ffd700",
  },
  subheading: {
    fontSize: "clamp(1rem, 3vw, 1.5rem)",
    marginBottom: "2rem",
    lineHeight: 1.5,
  },
  brand: {
    color: "#1ca9c9",
  },
  button: {
    fontWeight: 600,
    fontSize: "clamp(1rem, 3vw, 1.25rem)",
    padding: "1rem 2.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 0.25rem 1rem rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflow: "hidden",
    transition: "background 0.3s",
  },
  progressCircle: {
    position: "absolute",
    bottom: "1.5rem",
    right: "1.5rem",
    zIndex: 3,
  },
};

export default Welcome;