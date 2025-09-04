import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const InfoYieldx = ({ dark = false }) => {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // GSAP Animation for section and buttons
  useEffect(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  // GSAP Animation for card appearance
  useEffect(() => {
    if (activeCard) {
      gsap.fromTo(
        `.card-${activeCard}`,
        { opacity: 0, y: 50, scale: 0.95, rotate: -2 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeCard]);

  const showCard = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const closeCard = () => {
    gsap.to(`.card-${activeCard}`, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotate: 2,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setActiveCard(null),
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="info-yieldx-section"
        style={{
          padding: "5rem 0",
          background: dark
            ? "linear-gradient(135deg, #1a1e24 0%, #23272f 100%)"
            : "linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)",
          color: dark ? "#fff" : "#222",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          minHeight: "50vh",
        }}
      >
        <div
          className="gradient-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: dark
              ? "linear-gradient(45deg, rgba(0, 198, 255, 0.1), rgba(109, 213, 237, 0.05), rgba(0, 198, 255, 0.1))"
              : "linear-gradient(45deg, rgba(0, 114, 255, 0.1), rgba(0, 180, 216, 0.05), rgba(0, 114, 255, 0.1))",
            pointerEvents: "none",
          }}
        />
        <h2
          style={{
            marginBottom: "2.5rem",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
          }}
        >
          InfoYieldx
        </h2>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "2.5rem",
            padding: "0 1rem",
          }}
        >
          {["mission", "vision", "passion"].map((cardId, index) => (
            <div
              key={cardId}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => showCard(cardId)}
              className="info-card-button"
              style={{
                background: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.95)",
                borderRadius: "1.25rem",
                padding: "1rem 2rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "clamp(1rem, 3vw, 1.1rem)",
                color: dark ? "#e0e0e0" : "#333",
                boxShadow: dark
                  ? "0 0.25rem 1.25rem rgba(0, 198, 255, 0.2)"
                  : "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                minWidth: "9rem",
                textAlign: "center",
                backdropFilter: dark ? "blur(0.625rem)" : "none",
                border: dark ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: dark
                    ? "0 0.375rem 1.5rem rgba(0, 198, 255, 0.3)"
                    : "0 0.375rem 1rem rgba(0, 0, 0, 0.15)",
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotate: 0,
                  boxShadow: dark
                    ? "0 0.25rem 1.25rem rgba(0, 198, 255, 0.2)"
                    : "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
                  duration: 0.3,
                });
              }}
              aria-label={`Show ${cardId} details`}
            >
              {cardId.charAt(0).toUpperCase() + cardId.slice(1)}
            </div>
          ))}
        </div>
        {activeCard && (
          <div
            className={`card-${activeCard}`}
            style={{
              background: dark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.98)",
              borderRadius: "1.5rem",
              padding: "clamp(1.5rem, 5vw, 3rem)",
              maxWidth: "min(90%, 56.25rem)",
              margin: "0 auto",
              boxShadow: dark
                ? "0 0.375rem 1.5rem rgba(0, 198, 255, 0.25)"
                : "0 0.375rem 1rem rgba(0, 0, 0, 0.15)",
              position: "relative",
              textAlign: "left",
              backdropFilter: dark ? "blur(0.75rem)" : "none",
              border: dark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <button
              onClick={closeCard}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "none",
                border: "none",
                fontSize: "1.75rem",
                fontWeight: 500,
                cursor: "pointer",
                color: dark ? "#6dd5ed" : "#0072ff",
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, rotate: 5, duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3 })}
              aria-label="Close card"
            >
              ×
            </button>
            {activeCard === "mission" && (
              <>
                <h3
                  style={{
                    color: dark ? "#fff" : "#222",
                    marginBottom: "1.25rem",
                    fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
                    fontWeight: 700,
                  }}
                >
                  Our Mission
                </h3>
                <p
                  style={{
                    color: dark ? "#d0d0d0" : "#444",
                    fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
                    lineHeight: 1.7,
                  }}
                >
                  To empower businesses with innovative solutions that drive growth and efficiency through cutting-edge technology. We aim to deliver transformative tools that simplify complexity and unlock potential for organizations worldwide.
                </p>
              </>
            )}
            {activeCard === "vision" && (
              <>
                <h3
                  style={{
                    color: dark ? "#fff" : "#222",
                    marginBottom: "1.25rem",
                    fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
                    fontWeight: 700,
                  }}
                >
                  Our Vision
                </h3>
                <p
                  style={{
                    color: dark ? "#d0d0d0" : "#444",
                    fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
                    lineHeight: 1.7,
                  }}
                >
                  To be the global leader in transformative digital experiences, shaping the future of technology. We envision a world where intuitive, powerful solutions redefine how businesses operate and thrive.
                </p>
              </>
            )}
            {activeCard === "passion" && (
              <>
                <h3
                  style={{
                    color: dark ? "#fff" : "#222",
                    marginBottom: "1.25rem",
                    fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
                    fontWeight: 700,
                  }}
                >
                  Our Passion
                </h3>
                <p
                  style={{
                    color: dark ? "#d0d0d0" : "#444",
                    fontSize: "clamp(0.875rem, 3vw, 1.125rem)",
                    lineHeight: 1.7,
                  }}
                >
                  We are driven by a relentless pursuit of excellence, creating impactful solutions with enthusiasm and creativity. Our passion fuels our commitment to crafting technology that inspires and empowers.
                </p>
              </>
            )}
          </div>
        )}
      </section>

      <style>
        {`
          .info-yieldx-section {
            transition: background 0.3s, color 0.3s;
          }

          .gradient-overlay {
            animation: gradientShift 15s ease infinite;
            background-size: 200% 200%;
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .info-card-button {
            transition: transform 0.3s, box-shadow 0.3s;
          }

          @media (max-width: 768px) {
            .info-yieldx-section {
              padding: 2.5rem 0 !important;
              min-height: auto;
            }

            .info-yieldx-section h2 {
              margin-bottom: 1.5rem !important;
            }

            .info-card-button {
              padding: 0.75rem 1.5rem !important;
              min-width: 7.5rem !important;
              font-size: 0.875rem !important;
            }

            .card-mission,
            .card-vision,
            .card-passion {
              padding: 1.5rem !important;
              max-width: 95% !important;
            }

            .card-mission h3,
            .card-vision h3,
            .card-passion h3 {
              margin-bottom: 0.75rem !important;
            }
          }

          @media (max-width: 480px) {
            .info-yieldx-section {
              padding: 2rem 0.5rem !important;
            }

            .info-card-button {
              min-width: 100% !important;
              margin-bottom: 0.5rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default InfoYieldx;