import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function RoboModel() {
  const gltf = useGLTF("/robo.glb");
  return <primitive object={gltf.scene} scale={2.2} />;
}

const funColors = ["#00c6ff", "#ffb347", "#ff5e62"];

const AnimatedHero = () => (
  <div className="animated-hero">
    <div className="hero-text">
      <span className="hero-title">Kotha</span>
      <div className="hero-bar" />
      <div className="hero-badges">
        {["Mission", "Vision", "Passion"].map((word, i) => (
          <span key={word} className="badge" style={{ backgroundColor: funColors[i], boxShadow: `0 2px 8px ${funColors[i]}22` }}>
            {word}
          </span>
        ))}
      </div>
      <p className="hero-desc">Discover how we turn vision into value.</p>
    </div>

    <div className="hero-canvas">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Stage environment={null} intensity={0.7}>
            <RoboModel />
          </Stage>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>

    {/* Responsive styles */}
    <style>{`
      .animated-hero {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 48px 0;
        min-height: 220px;
        padding: 0 20px;
        gap: 40px;
      }

      .hero-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 500px;
      }

      .hero-title {
        font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
        font-weight: 900;
        font-size: 3.2rem;
        color: white;
        letter-spacing: 1px;
        margin-bottom: 10px;
        line-height: 1.1;
      }

      .hero-bar {
        height: 4px;
        width: 64px;
        background: linear-gradient(90deg,#00c6ff,#ffb347);
        border-radius: 2px;
        margin: 8px 0 18px;
      }

      .hero-badges {
        display: flex;
        gap: 14px;
        margin-bottom: 22px;
        flex-wrap: wrap;
      }

      .badge {
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        border-radius: 24px;
        padding: 7px 22px;
        letter-spacing: 1px;
        opacity: 0.96;
        animation: popIn 0.8s ease forwards;
      }

      .hero-desc {
        color: #aaa;
        margin-top: 12px;
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        max-width: 400px;
        margin-left: 2px;
      }

      .hero-canvas {
        width: 280px;
        height: 280px;
      }

      @keyframes popIn {
        0% { opacity: 0; transform: scale(0.7) translateY(20px);}
        80% { opacity: 1; transform: scale(1.1) translateY(-4px);}
        100% { opacity: 1; transform: scale(1) translateY(0);}
      }

      @media (max-width: 768px) {
        .animated-hero {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-text {
          align-items: center;
        }

        .hero-title {
          font-size: 2.2rem;
        }

        .hero-desc {
          text-align: center;
          font-size: 16px;
        }

        .hero-canvas {
          width: 240px;
          height: 240px;
          margin-top: 20px;
        }
      }
    `}</style>
  </div>
);

export default AnimatedHero;
