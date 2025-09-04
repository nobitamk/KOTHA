import React, { useEffect } from "react";
import "./AppDevelopment.css";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Phone = () => {
  const { scene } = useGLTF("/transparent-phone.glb");
  return <primitive object={scene} scale={30} position={[0, -1, 0]} />;
};

const AppDevelopment = ({ dark }) => {
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`app-dev-page ${dark ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="app-hero">
        <div className="hero-content equal-columns">
          <div className="hero-text">
            <h1>We Craft Experiences in Your Pocket</h1>
            <p>Elegant, fast & user-first mobile app development.</p>
            <a href="/contact" className="cta-btn">
              Let’s Talk
            </a>
          </div>
          <div className="hero-image-3d">
            <div className="canvas-container">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[3, 3, 3]} intensity={1.2} />
                <React.Suspense fallback={null}>
                  <Phone />
                </React.Suspense>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="features-overview">
        <h2>Why Brands Trust Us for App Development</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📱</div>
            <h3>Native Performance</h3>
            <p>Built using platform-specific best practices.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎨</div>
            <h3>Pixel-Perfect UI</h3>
            <p>Designs that follow Human Interface Guidelines.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🚀</div>
            <h3>Scalable Architecture</h3>
            <p>Engineered to grow with your business.</p>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="development-process">
        <h2>Our App Development Journey Together</h2>
        <div className="timeline">
          <div className="timeline-step">
            <span>1</span>
            <h4>Ideation & Wireframes</h4>
            <p>Understanding your vision and creating wireframes.</p>
          </div>
          <div className="timeline-step">
            <span>2</span>
            <h4>UI/UX Design</h4>
            <p>Designing a beautiful and functional interface.</p>
          </div>
          <div className="timeline-step">
            <span>3</span>
            <h4>Development & Testing</h4>
            <p>Bringing the design to life and ensuring it’s flawless.</p>
          </div>
          <div className="timeline-step">
            <span>4</span>
            <h4>Deployment</h4>
            <p>Getting your app approved and published.</p>
          </div>
          <div className="timeline-step">
            <span>5</span>
            <h4>Post-Launch</h4>
            <p>Support, updates, and growth scaling.</p>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="app-showcase">
        <h2>Peek Into Our Portfolio</h2>
        <div className="showcase-slider">
          <div className="phone-mockup">
            <img src="/assets/app1.png" alt="App 1" />
            <p>Fintech App</p>
          </div>
          <div className="phone-mockup">
            <img src="/assets/app2.png" alt="App 2" />
            <p>Education App</p>
          </div>
          <div className="phone-mockup">
            <img src="/assets/app3.png" alt="App 3" />
            <p>Healthcare App</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Have a Vision? Let’s Make It Real.</h2>
        <a href="/contact" className="cta-btn">Start Your App Project</a>
      </section>
    </div>
  );
};

export default AppDevelopment;
