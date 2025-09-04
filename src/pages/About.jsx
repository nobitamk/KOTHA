import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";


// Example team members
const teamMembers = [
  { name: "Alice Johnson", role: "Frontend Developer", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Bob Smith", role: "Backend Developer", photo: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "Carol Lee", role: "UI/UX Designer", photo: "https://randomuser.me/api/portraits/women/47.jpg" },
  { name: "David Kim", role: "DevOps Engineer", photo: "https://randomuser.me/api/portraits/men/48.jpg" }
];

// Tech stack with captions
const technologies = [
  { name: "MERN Stack", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", caption: "🚀 Full-stack for rapid MVPs" },
  { name: "Oracle", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", caption: "🏛️ For true enterprise muscle" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", caption: "⚛️ Because speed matters" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", caption: "🚦 Async, scalable, and fun" },
  { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", caption: "🛣️ Minimal, fast, flexible" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", caption: "🍃 Flexible data, fast results" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", caption: "🐍 Readable, powerful, everywhere" },
  { name: "Django", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", caption: "🦄 Batteries included" },
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", caption: "☕ Robust and everywhere" },
  { name: "Accounting", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", caption: "💹 For business clarity" },
  { name: "App Dev Tools", img: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png", caption: "🛠️ Build, test, repeat" }
];

const About = ({ dark }) => {
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // GSAP Animation for section and buttons
  useEffect(() => {
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1, y: 0 });
      gsap.fromTo(
        sectionRef.current,
        { y: 50 },
        { y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
    if (cardRefs.current.length) {
      gsap.fromTo(
        cardRefs.current,
        { y: 30, scale: 0.9 },
        { y: 0, scale: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
    return () => {
      gsap.killTweensOf([sectionRef.current, cardRefs.current]);
    };
  }, []);

  // GSAP Animation for card appearance
  useEffect(() => {
    if (activeCard) {
      gsap.fromTo(
        `.card-${activeCard}`,
        { y: 50, scale: 0.95, rotate: -2 },
        { y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeCard]);

  const showCard = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  const closeCard = () => {
    gsap.to(`.card-${activeCard}`, {
      y: 50,
      scale: 0.95,
      rotate: 2,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setActiveCard(null)
    });
  };

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          padding: "80px 0",
          background: dark
            ? "linear-gradient(135deg, #1a1e24 0%, #23272f 100%)"
            : "linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)",
          color: dark ? "#fff" : "#222",
          transition: "background 0.3s, color 0.3s",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          opacity: 0.9, // Reduced section opacity
          visibility: "visible"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: dark
              ? "linear-gradient(45deg, rgba(0, 198, 255, 0.05), rgba(109, 213, 237, 0.02), rgba(0, 198, 255, 0.05))"
              : "linear-gradient(45deg, rgba(0, 114, 255, 005), rgba(0, 180, 216, 0.02), rgba(0, 114, 255, 0.05))",
            animation: "gradientShift 15s ease infinite",
            pointerEvents: "none",
            zIndex: 1
          }}
        />
        <h2
          style={{
            marginBottom: "40px",
            fontSize: "2.8rem",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: dark ? "#fff" : "#222",
            zIndex: 2, // Ensure title is above overlay
            position: "relative"
          }}
        >
         Kotha
        </h2>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 40,
            position: "relative",
            zIndex: 2 // Ensure cards are above overlay
          }}
        >
          {["mission", "vision", "passion"].map((cardId, index) => (
            <div
              key={cardId}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => showCard(cardId)}
              style={{
                background: dark ? "#2a2f38" : "#ffffff", // Solid background for better visibility
                borderRadius: 20,
                padding: "20px 36px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 19,
                color: dark ? "#e0e0e0" : "#333",
                boxShadow: dark
                  ? "0 4px 20px rgba(0, 198, 255, 0.3)"
                  : "0 4px 12px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s, box-shadow 0.3s",
                minWidth: 150,
                textAlign: "center",
                border: dark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)"
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: dark
                    ? "0 6px 24px rgba(0, 198, 255, 0.4)"
                    : "0 6px 16px rgba(0, 0, 0, 0.2)",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotate: 0,
                  boxShadow: dark
                    ? "0 4px 20px rgba(0, 198, 255, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.15)",
                  duration: 0.3
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
              background: dark ? "#2a2f38" : "#ffffff", // Solid background
              borderRadius: 24,
              padding: 48,
              maxWidth: 900,
              margin: "0 auto",
              boxShadow: dark
                ? "0 6px 24px rgba(0, 198, 255, 0.3)"
                : "0 6px 16px rgba(0, 0, 0, 0.15)",
              position: "relative",
              textAlign: "left",
              border: dark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
              zIndex: 2
            }}
          >
            <button
              onClick={closeCard}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "none",
                border: "none",
                fontSize: 28,
                fontWeight: 500,
                cursor: "pointer",
                color: dark ? "#6dd5ed" : "#0072ff",
                transition: "color 0.3s, transform 0.3s"
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.2, rotate: 5, duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3 })}
              aria-label="Close card"
            >
              ×
            </button>
            {activeCard === "mission" && (
              <>
                <h3 style={{ color: dark ? "#fff" : "#222", marginBottom: 20, fontSize: 28, fontWeight: 700 }}>
                  Our Mission
                </h3>
                <p style={{ color: dark ? "#d0d0d0" : "#444", fontSize: 18, lineHeight: 1.7 }}>
                  To empower businesses with innovative solutions that drive growth and efficiency through cutting-edge technology. We aim to deliver transformative tools that simplify complexity and unlock potential for organizations worldwide.
                </p>
              </>
            )}
            {activeCard === "vision" && (
              <>
                <h3 style={{ color: dark ? "#fff" : "#222", marginBottom: 20, fontSize: 28, fontWeight: 700 }}>
                  Our Vision
                </h3>
                <p style={{ color: dark ? "#d0d0d0" : "#444", fontSize: 18, lineHeight: 1.7 }}>
                  To be the global leader in transformative digital experiences, shaping the future of technology. We envision a world where intuitive, powerful solutions redefine how businesses operate and thrive.
                </p>
              </>
            )}
            {activeCard === "passion" && (
              <>
                <h3 style={{ color: dark ? "#fff" : "#222", marginBottom: 20, fontSize: 28, fontWeight: 700 }}>
                  Our Passion
                </h3>
                <p style={{ color: dark ? "#d0d0d0" : "#444", fontSize: 18, lineHeight: 1.7 }}>
                  We are driven by a relentless pursuit of excellence, creating impactful solutions with enthusiasm and creativity. Our passion fuels our commitment to crafting technology that inspires and empowers.
                </p>
              </>
            )}
          </div>
        )}
      </section>

      {/* About Us Section */}
      <section
        style={{
          padding: "80px 0",
          background: dark ? "#23272f" : "#fff",
          color: dark ? "#fff" : "#222",
          transition: "background 0.3s, color 0.3s",
          textAlign: "center",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
      >
        <h2 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: 24 }}>About Us</h2>
        <p
          style={{
            maxWidth: 900,
            margin: "16px auto",
            color: dark ? "#bbb" : "#555",
            fontSize: 18,
            lineHeight: 1.7
          }}
        >
          Kotha is a forward-thinking technology company dedicated to delivering innovative solutions that empower businesses to thrive in the digital age. Our team is passionate about leveraging the latest advancements in software development, cloud computing, and user experience design to create products that drive real value. With a focus on collaboration, creativity, and continuous improvement, we strive to exceed client expectations and foster long-term partnerships. From startups to established enterprises,Kotha provides tailored services that address unique challenges and unlock new opportunities. Our commitment to excellence, integrity, and customer satisfaction sets us apart in a rapidly evolving industry. We believe in the power of technology to transform organizations and improve lives, and we are dedicated to making a positive impact through our work.
        </p>
      </section>

      {/* The Team Section */}
      <section
        style={{
          padding: "80px 0",
          background: dark ? "#23272f" : "#fff",
          color: dark ? "#fff" : "#222",
          transition: "background 0.3s, color 0.3s",
          textAlign: "center",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
      >
        <h2 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: 24 }}>The Team</h2>
        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 32
          }}
        >
          {teamMembers.map((member) => (
            <div
              key={member.name}
              style={{
                width: 220,
                background: dark ? "#2a2f38" : "#f7f9fa",
                borderRadius: 24,
                boxShadow: dark
                  ? "0 4px 20px rgba(0, 198, 255, 0.3)"
                  : "0 4px 12px rgba(0, 0, 0, 0.15)",
                padding: 24,
                textAlign: "center",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -10,
                  rotate: 2,
                  boxShadow: dark
                    ? "0 8px 28px rgba(0, 198, 255, 0.4)"
                    : "0 8px 20px rgba(0, 0, 0, 0.2)",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  rotate: 0,
                  boxShadow: dark
                    ? "0 4px 20px rgba(0, 198, 255, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.15)",
                  duration: 0.3
                });
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 16,
                  border: `4px solid ${dark ? "#00d4ff" : "#00b4d8"}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  filter: dark ? "brightness(0.9)" : "none"
                }}
              />
              <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 4 }}>{member.name}</div>
              <div style={{ color: dark ? "#bbb" : "#555", fontSize: 16 }}>{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Use Section */}
      <section
        style={{
          padding: "80px 0",
          background: dark ? "#181c24" : "#f7f9fa",
          color: dark ? "#fff" : "#222",
          transition: "background 0.3s, color 0.3s",
          textAlign: "center",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
      >
        <h2 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: 24 }}>What We Use</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            marginTop: 32,
            justifyContent: "center"
          }}
        >
          {technologies.map((tech) => (
            <div
              key={tech.name}
              style={{
                background: dark ? "#2a2f38" : "#fff",
                borderRadius: 20,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: dark
                  ? "0 4px 20px rgba(0, 198, 255, 0.3)"
                  : "0 4px 12px rgba(0, 0, 0, 0.15)",
                minWidth: 180,
                maxWidth: 200,
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  rotate: 1,
                  boxShadow: dark
                    ? "0 6px 24px rgba(0, 198, 255, 0.4)"
                    : "0 6px 16px rgba(0, 0, 0, 0.2)",
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  rotate: 0,
                  boxShadow: dark
                    ? "0 4px 20px rgba(0, 198, 255, 0.3)"
                    : "0 4px 12px rgba(0, 0, 0, 0.15)",
                  duration: 0.3
                });
              }}
            >
              <img
                src={tech.img}
                alt={tech.name}
                style={{
                  width: 48,
                  height: 48,
                  marginBottom: 12,
                  objectFit: "contain",
                  filter: dark ? "brightness(0.9) invert(0.9)" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                }}
              />
              <span style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, color: dark ? "#fff" : "#222" }}>
                {tech.name}
              </span>
              <span style={{ color: dark ? "#6dd5ed" : "#0072ff", fontSize: 14, textAlign: "center" }}>
                {tech.caption}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="cta-section"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)",
          color: "#fff",
          padding: "80px 32px",
          textAlign: "center",
          borderRadius: 32,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          margin: "48px auto",
          maxWidth: "1200px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05))",
            animation: "gradientShift 10s ease infinite",
            pointerEvents: "none"
          }}
        />
        <h2 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: 24, letterSpacing: "-0.025em" }}>
          Shape the Future with Kotha
        </h2>
        <p style={{ fontSize: "1.25rem", marginBottom: 32, maxWidth: "800px", margin: "0 auto", opacity: 0.9 }}>
          Join our passionate team to build innovative solutions that empower businesses worldwide.
        </p>
        <Link to="/career">
          <button
            style={{
              background: "#fff",
              color: "#4f46e5",
              fontWeight: 600,
              fontSize: 18,
              padding: "16px 32px",
              borderRadius: "9999px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s",
              animation: "pulseButton 2s infinite ease-in-out"
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                rotate: 3,
                boxShadow: "0 6px 24px rgba(0, 198, 255, 0.4)",
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                rotate: 0,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                duration: 0.3
              });
            }}
            aria-label="View open career positions"
          >
            Explore Career Opportunities
          </button>
        </Link>
      </section>

      <style jsx>{`
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

        @keyframes pulseButton {
          0% {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 6px 24px rgba(0, 198, 255, 0.4);
          }
          100% {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 48px 16px !important;
          }

          .cta-section {
            padding: 48px 24px !important;
          }

          .cta-section h2 {
            font-size: 2rem !important;
          }

          .cta-section p {
            font-size: 1.125rem !important;
          }

          .cta-section button {
            width: 100%;
            padding: 14px 24px;
          }
        }
      `}</style>

      
    </>
  );
};

export default About;