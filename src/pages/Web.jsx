import React, { useEffect, useState } from "react";
import "./WebDevelopment.css";

const WebDevelopment = ({ dark }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const steps = [
    {
      number: "01",
      title: "Gathering Requirements",
      description:
        "Our initial meetings are all about understanding your vision. From there, we define a roadmap, select technology, set timelines, and align the right team."
    },
    {
      number: "02",
      title: "UI/UX",
      description: "Crafting intuitive and engaging interfaces that deliver seamless user experiences."
    },
    {
      number: "03",
      title: "Development",
      description: "Bringing your designs to life with clean code, scalable architecture, and modern frameworks."
    },
    {
      number: "04",
      title: "Testing",
      description: "Rigorous QA to ensure performance, reliability, and perfection across devices."
    }
  ];

  return (
    <div className="web-dev-page">
      {/* Hero Section */}
      <section className="hero updated-hero real-code-hero">
        <div className="hero-content">
          <h1>
            Crafting the Future of <span className="highlight">Web Development</span>
          </h1>
          <p>
            We don't just code — we engineer stunning digital experiences.
          </p>
          <pre className="code-snippet">
{`function buildWebsite() {
  const idea = getClientVision();
  const design = createUIDesign(idea);
  const app = developApp(design);
  return deploy(app);
}`}
          </pre>
        </div>
        <div className="hero-bg-overlay"></div>
      </section>

      {/* Process Steps Section */}
      <section className={`process-steps ${dark ? "dark" : ""}`}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === activeStep ? "active" : ""}`}
            onMouseEnter={() => setActiveStep(index)}
          >
            <div className="step-number">{step.number}</div>
            {index === activeStep && (
              <div className="step-details">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            )}
            {index !== activeStep && <div className="step-title">{step.title}</div>}
          </div>
        ))}
      </section>

      {/* Project Showcase */}
      <section className="projects">
        <h2>Our Digital Masterpieces</h2>
        <div className="project-grid">
          {[1, 2, 3].map((id) => (
            <div className="project-card" key={id}>
              <div className="project-img" />
              <h4>Project {id}</h4>
              <p>Custom-built web solution designed for excellence.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Call to Action */}
      <section className="cta modern-cta">
        <h2>Let’s Build Your Vision</h2>
        <p>Your ideas deserve the perfect digital home. We're ready to bring them to life.</p>
        <a href="/contact" className="cta-btn creative-btn">
          Start Your Journey
        </a>
      </section>
    </div>
  );
};

export default WebDevelopment;
