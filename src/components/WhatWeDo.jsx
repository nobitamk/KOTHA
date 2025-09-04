import React from "react";
import { TbWorld, TbDeviceImac, TbCurrencyDollar, TbPuzzle, TbDatabase } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const whatWeDo = [
  {
    title: "Web Development",
    description: "Building modern, responsive, and scalable websites tailored to your business needs.",
    icon: <TbWorld size={56} color="#00c6ff" />,
    link: "/services/web-development"
  },
  {
    title: "App Development",
    description: "Creating high-performance mobile and desktop applications for all platforms.",
    icon: <TbDeviceImac size={56} color="#ffb300" />,
    link: "/services/app-development"
  },
  {
    title: "Accounting",
    description: "Providing robust accounting software solutions for efficient business management.",
    icon: <TbCurrencyDollar size={56} color="#00e676" />,
    link: "/services/accounting"
  },
  {
    title: "Oracle EBS",
    description: "Implementation and support for Oracle E-Business Suite (EBS) for enterprise resource planning.",
    icon: <TbPuzzle size={56} color="#ff5252" />,
    link: "/services/oracle-ebs"
  },
  {
    title: "Oracle Database",
    description: "Expertise in Oracle Database management, optimization, and support for enterprise-grade solutions.",
    icon: <TbDatabase size={56} color="#7c4dff" />,
    link: "/services/oracle-database"
  }
];

const WhatWeDo = ({ dark }) => {
  const navigate = useNavigate();

  return (
    <section
      className="what-we-do-bg"
      style={{
        padding: "60px 0",
        background: dark ? "#23272f" : "#f7f9fa",
        transition: "background 0.3s"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 40,
          color: dark ? "#fff" : "#222",
          fontWeight: 800,
          fontSize: 32,
          letterSpacing: 1
        }}
      >
        What We Do
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 32
        }}
      >
        {whatWeDo.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.link)}
            style={{
              background: dark ? "#181c24" : "#fff",
              borderRadius: 20,
              boxShadow: dark
                ? "0 2px 12px rgba(0,198,255,0.10)"
                : "0 2px 8px rgba(0,0,0,0.06)",
              padding: "32px 28px",
              minWidth: 240,
              maxWidth: 320,
              textAlign: "center",
              transition: "background 0.3s, box-shadow 0.3s",
              cursor: "pointer"
            }}
          >
            <div className="icon-3d" style={{ marginBottom: 16 }}>
              {item.icon}
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
                color: dark ? "#fff" : "#222"
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                color: dark ? "#bbb" : "#555",
                fontSize: 16
              }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .icon-3d {
          display: inline-block;
          animation: float3d 2.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.10));
          will-change: transform;
          transition: transform 0.3s ease;
        }
        .what-we-do-bg .icon-3d:hover {
          transform: rotateY(10deg) scale(1.1);
        }
        @keyframes float3d {
          0% {
            transform: rotateY(0deg) translateY(0px) scale(1);
          }
          50% {
            transform: rotateY(18deg) translateY(-10px) scale(1.08);
          }
          100% {
            transform: rotateY(-18deg) translateY(0px) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDo;
