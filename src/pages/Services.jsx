import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";


const services = [
  {
    title: "Web Development",
    description: "Building modern, responsive, and scalable websites tailored to your business needs.",
    icon: "🌐",
    details: "We use the latest technologies (React, Node.js, etc.) to deliver fast, secure, and scalable web solutions. Our agile process ensures your site is delivered on time and exceeds expectations.",
    efficiency: "Our team delivers most web projects within 4-8 weeks, with 99% client satisfaction.",
    persona: "Priya Sharma (Lead Web Developer)",
    
  },
  {
    title: "App Development",
    description: "Creating high-performance mobile and desktop applications for all platforms.",
    icon: "📱",
    details: "We build robust apps for iOS, Android, and desktop using Flutter, React Native, and native stacks. Our apps are user-friendly, secure, and scalable.",
    efficiency: "Rapid prototyping and deployment—MVPs in as little as 3 weeks.",
    persona: "Rahul Mehta (Senior App Architect)",
    
  },
  {
    title: "Accounting",
    description: "Providing robust accounting software solutions for efficient business management.",
    icon: "💹",
    details: "Our accounting solutions automate invoicing, payroll, and reporting. We integrate with popular ERPs and ensure compliance with local regulations.",
    efficiency: "Automated workflows reduce manual effort by 70%.",
    persona: "Anjali Verma (Accounting Solutions Lead)",
    
  },
  {
    title: "Oracle EBS",
    description: "Implementation and support for Oracle E-Business Suite (EBS) for enterprise resource planning.",
    icon: "🧩",
    details: "Certified Oracle experts for EBS implementation, migration, and support. We ensure seamless integration and minimal downtime.",
    efficiency: "99.9% uptime and 24/7 support for all Oracle EBS clients.",
    persona: "Suresh Kumar (Oracle EBS Specialist)",
    
  },
  {
    title: "Oracle Database",
    description: "Expertise in Oracle Database management, optimization, and support for enterprise-grade solutions.",
    icon: "🗄️",
    details: "We offer database design, tuning, backup, and disaster recovery. Our DBAs ensure your data is always secure and available.",
    efficiency: "Average query performance improved by 60% after our optimization.",
    persona: "Meena Joshi (Chief DBA)",
    
  }
];

const Services = ({ dark }) => {
  const [selected, setSelected] = useState(null);
  const [viewed, setViewed] = useState([]);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animate each service card on load
    cardsRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            delay: i * 0.2,
            duration: 0.8,
            ease: "power3.out"
          }
        );
      }
    });

    // Animate CTA when it comes into view
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const handleCardClick = (index) => {
    setSelected(index);
    if (!viewed.includes(index)) setViewed([...viewed, index]);
  };

  const handleClose = () => setSelected(null);

  return (
    <>
      <section
        style={{
          padding: "60px 0",
          background: dark ? "#23272f" : "#f7f9fa",
          minHeight: "80vh",
          transition: "background 0.3s"
        }}
      >
        <h2 style={{ textAlign: "center", color: dark ? "#fff" : "#222" }}>Our Services</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            filter: selected !== null ? "blur(2px) brightness(0.7)" : "none",
            transition: "filter 0.3s"
          }}
        >
          {services.map((service, idx) => (
            <div
              ref={(el) => (cardsRef.current[idx] = el)}
              key={service.title}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                efficiency={service.efficiency}
                persona={service.persona}
                contact={service.contact}
                onClick={() => handleCardClick(idx)}
                dimmed={selected !== null && selected !== idx}
                dark={dark}
              />
            </div>
          ))}
        </div>

        {selected !== null && services[selected] && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: dark ? "rgba(30,34,44,0.85)" : "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
            onClick={handleClose}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: dark ? "#23272f" : "#fff",
                color: dark ? "#fff" : "#222",
                borderRadius: 24,
                padding: 40,
                minWidth: 350,
                maxWidth: 500,
                boxShadow: dark
                  ? "0 8px 32px rgba(0,198,255,0.18)"
                  : "0 8px 32px rgba(0,0,0,0.25)",
                position: "relative",
                animation: "popIn 0.3s cubic-bezier(.68,-0.55,.27,1.55)"
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{ fontSize: 80 }}>{services[selected].icon}</span>
              </div>
              <h2 style={{ textAlign: "center", color: dark ? "#fff" : "#222" }}>
                {services[selected].title}
              </h2>
              <p style={{ fontSize: 18, margin: "16px 0", color: dark ? "#bbb" : "#555" }}>
                {services[selected].details}
              </p>
              <div style={{ margin: "12px 0", color: dark ? "#fff" : "#222" }}>
                <strong>Efficiency:</strong> {services[selected].efficiency}
              </div>
              <div style={{ margin: "12px 0", color: dark ? "#fff" : "#222" }}>
                <strong>Best Persona:</strong> {services[selected].persona}
              </div>
              <div style={{ margin: "12px 0" }}>
                <strong>Contact:</strong>{" "}
                <a
                  href={`mailto:${services[selected].contact}`}
                  style={{ color: dark ? "#6dd5ed" : "#0072ff" }}
                >
                  {services[selected].contact}
                </a>
              </div>
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "#00c6ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontSize: 20,
                  cursor: "pointer"
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </section>

      

      {viewed.length === services.length && selected === null && (
        <div style={{
          background: "#00c6ff",
          color: "#fff",
          padding: "24px 0",
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 32
        }}>
          Liked our services? <a href="/contact" style={{ color: "#fff", textDecoration: "underline" }}>Contact us now!</a>
        </div>
      )}

      {/* 🟢 Animated CTA to Portfolio */}
      <div
        ref={ctaRef}
        style={{
          background: "#111",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
          marginTop: "60px",
          borderRadius: "16px",
          opacity: 0 // animate to 1 with GSAP
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          See What We’ve Built
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "25px", color: "#ccc" }}>
          Explore the websites and applications developed by our talented team.
        </p>
        <a
          href="/portfolio"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            fontSize: "1rem",
            backgroundColor: "#00b894",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          View Our Portfolio
        </a>
      </div>

      <style>
        {`
          @keyframes popIn {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

      {/* <Footer /> */}
    </>
  );
};

export default Services;
