import React from "react";

const services = [
  { title: "Web Development", desc: "Modern responsive websites." },
  { title: "App Development", desc: "Cross-platform mobile apps." },
  { title: "Oracle EBS", desc: "Enterprise Oracle implementations." },
  { title: "Accounting", desc: "Smart financial solutions." },
];

const Services = () => {
  return (
    <div style={{ padding: 40 }}>
      <h2>Our Services</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {services.map((service, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: 20, borderRadius: 10 }}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;