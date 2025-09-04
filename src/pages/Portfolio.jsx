import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/cms/portfolio");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("Portfolio CMS response:", JSON.stringify(data, null, 2));
        const validProjects = data
          .filter((entry) => entry.type === "json" && entry.value?.title)
          .map((entry) => ({
            ...entry.value,
            id: entry._id || Math.random().toString(36).slice(2),
          }));
        setProjects(validProjects);
      } catch (err) {
        console.error("Error fetching portfolio:", err.message);
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading portfolio...</div>;
  if (error) return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>{error}</div>;

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Our Portfolio</h1>
      <p style={styles.subtitle}>Websites developed by our team</p>

      <div style={styles.grid}>
        {projects.map((project, idx) => (
          <div style={styles.card} key={project.id || idx}>
            <img src={project.image} alt={project.title} style={styles.image} />
            <div style={styles.content}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Tech Stack:</strong>{" "}
                {Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "N/A"}
              </p>
              <p>
                <strong>Developer:</strong> {project.developer || "Unknown"}
              </p>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" style={styles.button}>
                  Visit Site
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "50px",
    background: "#fdfdfd",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#666",
  },
  grid: {
    display: "grid",
    gap: "30px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  card: {
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "20px",
    textAlign: "left",
  },
  button: {
    display: "inline-block",
    marginTop: "10px",
    color: "#fff",
    background: "#007bff",
    padding: "8px 12px",
    textDecoration: "none",
    borderRadius: "8px",
  },
};

export default Portfolio;