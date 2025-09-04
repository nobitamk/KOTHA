import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Blog = ({ dark }) => {
  const [cmsBlogs, setCmsBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log("Fetching posts from /api/cms/blog");
        const res = await fetch("http://localhost:5000/api/cms/blog");
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        console.log("Blog CMS response:", JSON.stringify(data, null, 2));

        let postsData = [];
        const postSection = data.find((entry) => entry.section === "posts") || data[0];
        if (postSection) {
          console.log("Post section:", JSON.stringify(postSection, null, 2));
          const value = postSection.value;
          if (Array.isArray(value)) {
            postsData = value;
            console.log("Value is array:", postsData);
          } else if (value && typeof value === "object" && Object.keys(value).length > 0) {
            postsData = [value];
            console.log("Value is object, wrapped in array:", postsData);
          } else {
            console.warn("Invalid value format:", value);
          }
          postsData = postsData
            .filter((post) => post && post.title)
            .map((post, i) => ({
              id: post.id || `post-${i}`,
              section: postSection.section || "Post",
              value: {
                title: post.title || "Untitled",
                author: post.author || "Unknown",
                date: post.date || postSection.updatedAt?.slice(0, 10) || "N/A",
                link: post.link || "",
                category: post.category || "Uncategorized",
                image: post.image ? `http://localhost:5000${post.image}` : "https://via.placeholder.com/300",
                description: post.description || "No description",
                tags: Array.isArray(post.tags) ? post.tags : [],
                summary: post.description?.slice(0, 100) || "No summary",
                readTime: post.readTime || "5 min read",
              },
            }));
          console.log("Structured blogs:", JSON.stringify(postsData, null, 2));
          setCmsBlogs(postsData);
        } else {
          console.warn("No posts section found:", data);
          setError("No blog posts found. Showing sample data.");
          postsData = [
            {
              id: "sample-1",
              section: "Post",
              value: {
                title: "Sample Post",
                author: "Jane Doe",
                date: "2025-06-01",
                link: "/blog/sample",
                category: "Sample",
                image: "https://via.placeholder.com/300",
                description: "This is a sample post.",
                tags: ["sample"],
                summary: "This is a sample post.",
                readTime: "5 min read",
              },
            },
          ];
          setCmsBlogs(postsData);
        }
      } catch (err) {
        console.error("Error loading blogs:", err.message);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".blog-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [cmsBlogs]);

  const filteredBlogs = cmsBlogs.filter(
    (b) =>
      b?.value &&
      (category === "All" || b.value.category === category) &&
      (b.value.title?.toLowerCase()?.includes(search.toLowerCase()) || "")
  );

  const categories = ["All", ...new Set(cmsBlogs.map((b) => b.value?.category).filter(Boolean))];
  const allTags = [...new Set(cmsBlogs.flatMap((b) => b.value?.tags || []))];

  const handleLinkClick = (e, link) => {
    if (!link) {
      e.preventDefault();
      return;
    }
    console.log("Navigating to:", link);
    if (link.startsWith("/")) {
      e.preventDefault();
      navigate(link);
    }
    // External links use <a> default behavior
  };

  if (loading) return <div style={{ textAlign: "center", padding: "60px" }}>Loading blogs...</div>;
  if (error) return <div style={{ textAlign: "center", padding: "60px", color: "red" }}>{error}</div>;

  return (
    <>
      <section
        style={{
          backgroundColor: dark ? "#0e0e0e" : "#f4f7fa",
          color: dark ? "#fff" : "#111",
          padding: "60px 16px",
          minHeight: "100vh",
          transition: "0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "60px",
              borderRadius: "16px",
              marginBottom: "40px",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>
              Discover Our Latest Innovations
            </h2>
            <p style={{ fontSize: "18px" }}>
              Dive into projects, tech stories, and solutions from the kotha team
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "30px" }}>
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: dark ? "#1a1c20" : "#fff",
                color: dark ? "#eee" : "#111",
              }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                background: dark ? "#1a1c20" : "#fff",
                color: dark ? "#eee" : "#111",
                border: "1px solid #ccc",
              }}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "40px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {allTags.map((tag, i) => (
              <span
                key={i}
                onClick={() => setSearch(tag)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: dark ? "#222" : "#e4e6eb",
                  color: dark ? "#bbb" : "#333",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredBlogs.map((b, i) => (
              <a
                key={b.id || i}
                href={b.value.link || "#"}
                onClick={(e) => handleLinkClick(e, b.value.link)}
                target={b.value.link?.startsWith("/") ? undefined : "_blank"}
                rel={b.value.link?.startsWith("/") ? undefined : "noopener noreferrer"}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="blog-card"
                  style={{
                    background: dark ? "#1c1f24" : "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: dark
                      ? "0 4px 14px rgba(0,198,255,0.15)"
                      : "0 4px 12px rgba(0,0,0,0.08)",
                    position: "relative",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <img
                    src={b.value.image}
                    alt={b.value.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      filter: dark ? "brightness(0.85)" : "none",
                      transition: "0.3s ease",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", b.value.image);
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                  />
                  {hovered === i && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        padding: "12px",
                        fontSize: "14px",
                      }}
                    >
                      {b.value.summary.slice(0, 60)}...
                    </div>
                  )}
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>
                      {b.value.title}
                    </h3>
                    <small style={{ color: dark ? "#aaa" : "#666" }}>
                      {b.value.date} · {b.value.category} · {b.value.readTime}
                    </small>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        color: dark ? "#6dd5ed" : "#00c6ff",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      Read more →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
          .blog-card:hover {
            transform: translateY(-6px);
          }
          @media (max-width: 768px) {
            .blog-card img {
              height: 140px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Blog;