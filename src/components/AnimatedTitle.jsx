import React from "react";

const HeroSection = ({ dark }) => (
  <section
    style={{
      padding: "100px 20px",
      background: dark ? "#1a1e27" : "#fff",
      color: dark ? "#fff" : "#222",
      textAlign: "center",
      minHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "background 0.3s, color 0.3s",
      position: "relative",
      overflow: "hidden",
      perspective: "1200px",
    }}
  >
    {/* Background Glowing Particle Effect */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: dark
          ? "radial-gradient(circle at 50% 30%, rgba(0,198,255,0.3) 0%, transparent 50%)"
          : "radial-gradient(circle at 50% 30%, rgba(0,114,255,0.25) 0%, transparent 50%)",
        zIndex: 1,
        animation: "pulseGlow 8s infinite ease-in-out",
      }}
    />
    {/* Main Content Container */}
    <div
      style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* Left: Text Content */}
      <div
        style={{
          flex: "1 1 50%",
          textAlign: "left",
          transformStyle: "preserve-3d",
          transition: "transform 0.4s ease-out",
          paddingRight: 20,
          minWidth: 300,
        }}
        onMouseMove={(e) => {
          const { clientX, clientY, currentTarget } = e;
          const { width, height, left, top } = currentTarget.getBoundingClientRect();
          const x = (clientX - left - width / 2) / width;
          const y = (clientY - top - height / 2) / height;
          currentTarget.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(60px)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "900",
            marginBottom: "24px",
            lineHeight: 1.1,
            color: dark ? "#fff" : "#1a1e27",
            textShadow: dark ? "0 0 12px rgba(0,198,255,0.6)" : "0 0 6px rgba(0,0,0,0.15)",
            animation: "fadeIn3D 1.3s ease-out",
            transform: "translateZ(40px)",
          }}
        >
          Innovate Today, Lead Tomorrow
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: dark ? "#ccddee" : "#333",
            marginBottom: "48px",
            lineHeight: 1.6,
            maxWidth: 500,
            animation: "fadeIn3D 1.3s ease-out 0.3s",
            animationFillMode: "backwards",
            transform: "translateZ(30px)",
          }}
        >
          InfoYieldX delivers cutting-edge software, cloud expertise, and bold designs to transform your business for the digital future.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            background: dark
              ? "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)"
              : "linear-gradient(90deg, #0072ff 0%, #00c6ff 100%)",
            color: dark ? "#1a1e27" : "#fff",
            padding: "20px 48px",
            borderRadius: 50,
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: dark
              ? "0 8px 24px rgba(0,198,255,0.6)"
              : "0 8px 24px rgba(0,114,255,0.5)",
            transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
            animation: "fadeIn3D 1.3s ease-out 0.6s",
            animationFillMode: "backwards",
            transform: "translateZ(50px)",
            position: "relative",
            overflow: "hidden",
            zIndex: 3,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1) translateZ(70px)";
            e.target.style.boxShadow = dark
              ? "0 10px 30px rgba(0,198,255,0.8)"
              : "0 10px 30px rgba(0,114,255,0.7)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1) translateZ(50px)";
            e.target.style.boxShadow = dark
              ? "0 8px 24px rgba(0,198,255,0.6)"
              : "0 8px 24px rgba(0,114,255,0.5)";
          }}
        >
          Get Started
          <span
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
              opacity: 0,
              transition: "opacity 0.3s",
              pointerEvents: "none",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.6)}
            onMouseLeave={(e) => (e.target.style.opacity = 0)}
          />
        </a>
      </div>
      {/* Right: Stylized X Image */}
      <div
        style={{
          flex: "1 1 50%",
          minWidth: 300,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src="/image1.png" // Replace with the actual path or URL to the image (e.g., "/images/stylized-x.png")
          alt="Stylized X"
          style={{
            width: "350px",
            height: "350px",
            objectFit: "contain",
            zIndex: 3,
          }}
        />
        {/* Background Glow */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: dark
              ? "radial-gradient(circle, rgba(0,198,255,0.4) 0%, transparent 60%)"
              : "radial-gradient(circle at 50% 30%, rgba(0,114,255,0.3) 0%, transparent 60%)",
            borderRadius: "50%",
            animation: "glowBurst 4s ease-in-out infinite",
            zIndex: 1,
          }}
        />
      </div>
    </div>
    {/* CSS Animation Keyframes */}
    <style jsx>{`
      @keyframes fadeIn3D {
        from {
          opacity: 0;
          transform: translateY(40px) translateZ(-60px);
        }
        to {
          opacity: 1;
          transform: translateY(0) translateZ(0);
        }
      }
      @keyframes pulseGlow {
        0% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 0.8;
          transform: scale(1);
        }
      }
      @keyframes glowBurst {
        0% {
          opacity: 0.4;
          transform: scale(0.8);
        }
        50% {
          opacity: 0.6;
          transform: scale(1);
        }
        100% {
          opacity: 0.4;
          transform: scale(0.8);
        }
      }
      @media (max-width: 768px) {
        h1 {
          font-size: 40px;
        }
        p {
          font-size: 18px;
          maxWidth: 100%;
        }
        a {
          padding: 16px 32px;
          font-size: 18px;
        }
        div[style*="height: 400"] {
          height: 300px;
        }
        img[style*="width: 350px"] {
          width: 250px;
          height: 250px;
        }
        div[style*="width: 400px"] {
          width: 300px;
          height: 300px;
        }
      }
    `}</style>
  </section>
);

export default HeroSection;