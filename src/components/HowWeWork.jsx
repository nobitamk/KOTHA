import React from "react";

const steps = [
  {
    title: "Consultation",
    desc: "We listen to your needs and understand your business goals.",
    icon: "🤝",
  },
  {
    title: "Planning",
    desc: "We design a tailored solution and create a clear project roadmap.",
    icon: "📝",
  },
  {
    title: "Execution",
    desc: "Our team develops, tests, and delivers your solution on time.",
    icon: "🚀",
  },
  {
    title: "Support",
    desc: "We provide ongoing support and improvements for your success.",
    icon: "💡",
  },
];

const HowWeWork = ({ dark }) => (
  <section
    className="how-we-work-bg"
    style={{
      padding: "60px 0",
      background: dark ? "#23272f" : "#fff",
      transition: "background 0.3s"
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: 40,
        fontWeight: 700,
        fontSize: "2.2rem",
        color: dark ? "#fff" : "#222"
      }}
    >
      How We Work
    </h2>
    <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          style={{
            background: dark ? "#181c24" : "#f7f9fa",
            borderRadius: 12,
            boxShadow: dark
              ? "0 2px 16px rgba(0,198,255,0.10)"
              : "0 2px 16px rgba(0,0,0,0.06)",
            padding: 32,
            width: 260,
            textAlign: "center",
            transition: "background 0.3s, box-shadow 0.3s"
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>{step.icon}</div>
          <h3 style={{ fontSize: "1.1rem", marginBottom: 10, color: dark ? "#fff" : "#222" }}>
            {step.title}
          </h3>
          <p style={{ color: dark ? "#bbb" : "#555" }}>{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowWeWork;