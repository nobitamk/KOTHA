import React, { useEffect, useState } from "react";

const CMSManager = () => {
  const [page, setPage] = useState("home");
  const [cmsData, setCmsData] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    section: "",
    type: "text",
    value: {},
  });
  const [entryList, setEntryList] = useState([]); // Unified list for posts/jobList/projects

  useEffect(() => {
    fetchCMS();
  }, [page]);

  const fetchCMS = async () => {
    try {
      console.log(`Fetching CMS data for ${page}`);
      const res = await fetch(`http://localhost:5000/api/cms/${page}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log(`CMS data for ${page}:`, JSON.stringify(data, null, 2));
      setCmsData(data);
      const sectionKey = page === "blog" ? "posts" : page === "career" ? "jobList" : page === "portfolio" ? "projects" : "";
      if (sectionKey) {
        const section = data.find((entry) => entry.section === sectionKey);
        setEntryList(section && Array.isArray(section.value) ? section.value : []);
      }
    } catch (err) {
      console.error("Error fetching CMS data:", err.message);
      alert("Failed to fetch content");
    }
  };

  const handleInputChange = (e, field, isArray = false) => {
    const value = isArray ? e.target.value.split(",").map((t) => t.trim()) : e.target.value;
    setFormData((prev) => ({
      ...prev,
      value: { ...prev.value, [field]: value },
    }));
  };

  const handleFileChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      value: { ...prev.value, [field]: e.target.files[0] },
    }));
  };

  const addToList = () => {
    if (!formData.value.title) {
      alert("Please fill in the title");
      return;
    }
    setEntryList((prev) => {
      const newList = [...prev, formData.value];
      console.log(`Updated ${page} list:`, JSON.stringify(newList, null, 2));
      return newList;
    });
    setFormData((prev) => ({ ...prev, value: {} }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("page", page);
      data.append("section", formData.section);
      data.append("type", formData.type);

      const sectionKey = page === "blog" ? "posts" : page === "career" ? "jobList" : page === "portfolio" ? "projects" : formData.section;
      if (["posts", "jobList", "projects"].includes(formData.section)) {
        // Fetch existing data
        const existingRes = await fetch(`http://localhost:5000/api/cms/${page}`);
        const existingData = await existingRes.json();
        const existingSection = existingData.find((entry) => entry.section === sectionKey);
        let existingValue = existingSection && Array.isArray(existingSection.value) ? existingSection.value : [];

        // Combine existing and new entries
        const newValue = [...entryList, ...(formData.value.title ? [formData.value] : [])].filter((item) => item && item.title);
        const combinedValue = [...existingValue, ...newValue].filter(
          (item, index, self) => index === self.findIndex((t) => t.id === item.id || t.title === item.title)
        ); // Dedupe by id or title
        console.log(`Saving ${page} data:`, JSON.stringify(combinedValue, null, 2));
        data.append("value", JSON.stringify(combinedValue));
      } else {
        Object.keys(formData.value).forEach((key) => {
          if (formData.value[key] instanceof File) {
            data.append("file", formData.value[key]);
          } else if (Array.isArray(formData.value[key])) {
            data.append(`value[${key}]`, JSON.stringify(formData.value[key]));
          } else {
            data.append(`value[${key}]`, formData.value[key]);
          }
        });
      }

      console.log(`Sending CMS data to /api/cms for ${page}`);
      const res = await fetch("http://localhost:5000/api/cms", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchCMS();
      setFormData({ section: "", type: "text", value: {} });
      setEntryList([]);
      setIsAdding(false);
      alert("Content saved successfully");
    } catch (err) {
      console.error("Error saving CMS entry:", err.message);
      alert("Failed to save content: " + err.message);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cms/${entryId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchCMS();
      alert("Content deleted successfully");
    } catch (err) {
      console.error("Error deleting CMS entry:", err.message);
      alert("Failed to delete content");
    }
  };

  const pageFields = {
    home: [
      { name: "heroText", type: "text", label: "Hero Text" },
      { name: "heroImage", type: "file", label: "Hero Image" },
    ],
    about: [
      { name: "mission", type: "textarea", label: "Mission Statement" },
      { name: "teamImage", type: "file", label: "Team Image" },
    ],
    services: [
      { name: "serviceTitle", type: "text", label: "Service Title" },
      { name: "serviceDescription", type: "textarea", label: "Service Description" },
    ],
    blog: [
      { name: "title", type: "text", label: "Post Title" },
      { name: "author", type: "text", label: "Author" },
      { name: "date", type: "text", label: "Date" },
      { name: "link", type: "text", label: "Link" },
      { name: "category", type: "text", label: "Category" },
      { name: "image", type: "file", label: "Post Image" },
      { name: "description", type: "textarea", label: "Post Description" },
      { name: "tags", type: "array", label: "Tags (comma-separated)" },
      { name: "id", type: "text", label: "Post ID" },
    ],
    career: [
      { name: "title", type: "text", label: "Job Title" },
      { name: "location", type: "text", label: "Location" },
      { name: "type", type: "text", label: "Job Type" },
      { name: "description", type: "textarea", label: "Job Description" },
      { name: "id", type: "text", label: "Job ID" },
    ],
    portfolio: [
      { name: "title", type: "text", label: "Project Title" },
      { name: "image", type: "file", label: "Project Image" },
      { name: "description", type: "textarea", label: "Project Description" },
      { name: "developer", type: "text", label: "Developer" },
      { name: "technologies", type: "array", label: "Technologies (comma-separated)" },
      { name: "link", type: "text", label: "Project Link" },
      { name: "id", type: "text", label: "Project ID" },
    ],
  };

  const renderFormFields = (fields) => (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "4px", color: "#333" }}>
          Section
        </label>
        <input
          type="text"
          value={formData.section}
          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
          placeholder="e.g., posts, jobList, projects"
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", fontWeight: "600", marginBottom: "4px", color: "#333" }}>
          Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
          style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
        >
          <option value="text">Text</option>
          <option value="html">HTML</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="link">Link</option>
          <option value="file">File</option>
          <option value="tags">Tags</option>
          <option value="json">JSON</option>
        </select>
      </div>
      {(page === "blog" && formData.section === "posts") ||
      (page === "career" && formData.section === "jobList") ||
      (page === "portfolio" && formData.section === "projects") ? (
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "4px", color: "#333" }}>
            Current {page === "blog" ? "Posts" : page === "career" ? "Jobs" : "Projects"}
          </label>
          {entryList.length > 0 ? (
            <ul>
              {entryList.map((item, i) => (
                <li key={i}>{item.title || "Untitled"}</li>
              ))}
            </ul>
          ) : (
            <p>No entries added yet.</p>
          )}
          <button
            type="button"
            onClick={addToList}
            style={{
              padding: "8px 16px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            Add to List
          </button>
        </div>
      ) : null}
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "4px", color: "#333" }}>
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              value={formData.value[field.name] || ""}
              onChange={(e) => handleInputChange(e, field.name)}
              placeholder={`Enter ${field.label}`}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                height: "100px",
                resize: "vertical",
              }}
            />
          ) : field.type === "file" ? (
            <input
              type="file"
              onChange={(e) => handleFileChange(e, field.name)}
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          ) : field.type === "array" ? (
            <input
              type="text"
              value={formData.value[field.name]?.join(", ") || ""}
              onChange={(e) => handleInputChange(e, field.name, true)}
              placeholder="Enter comma-separated values"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          ) : (
            <input
              type="text"
              value={formData.value[field.name] || ""}
              onChange={(e) => handleInputChange(e, field.name)}
              placeholder={`Enter ${field.label}`}
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <style>{`
        .cms-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .cms-container h2 {
          font-size: 28px;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .page-selector {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
        }
        .page-selector label {
          font-weight: 600;
          color: #333;
        }
        .page-selector select {
          padding: 8px;
          border: 1px solid #ccc;
          borderRadius: 4px;
          font-size: 16px;
        }
        .page-selector button {
          padding: 8px 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .page-selector button:hover {
          background: #0056b3;
        }
        .cms-form {
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .form-actions button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: white;
        }
        .form-actions button:first-child {
          background: #28a745;
        }
        .form-actions button:first-child:hover {
          background: #218838;
        }
        .form-actions button:last-child {
          background: #dc3545;
        }
        .form-actions button:last-child:hover {
          background: #c82333;
        }
        .cms-entry {
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .cms-entry button {
          padding: 8px 16px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 12px;
        }
        .cms-entry button:hover {
          background: #c82333;
        }
      `}</style>
      <div className="cms-container">
        <h2>🛠️ CMS Manager</h2>
        <div className="page-selector">
          <label>Select Page:</label>
          <select value={page} onChange={(e) => setPage(e.target.value)}>
            <option value="home">Home</option>
            <option value="about">About</option>
            <option value="services">Services</option>
            <option value="blog">Blog</option>
            <option value="career">Career</option>
            <option value="portfolio">Portfolio</option>
          </select>
          <button onClick={() => setIsAdding(true)}>Add New Content</button>
        </div>
        {isAdding && (
          <form onSubmit={handleSubmit} className="cms-form">
            <h3>Add New Content</h3>
            {renderFormFields(pageFields[page] || [{ name: "content", type: "text", label: "Content" }])}
            <div className="form-actions">
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        )}
        <div className="cms-list">
          {cmsData.map((entry, index) => (
            <div key={index} className="cms-entry">
              <p><strong>Section:</strong> {entry.section}</p>
              {Array.isArray(entry.value) ? (
                entry.value.map((item, i) => (
                  <div key={i}>
                    <strong>Title:</strong> {item.title || "N/A"}
                    {Object.entries(item).map(
                      ([key, value]) =>
                        key !== "title" && (
                          <div key={key}>
                            <strong>{key}:</strong>{" "}
                            {typeof value === "string" && key.includes("image") ? (
                              <img src={`http://localhost:5000${value}`} alt={key} style={{ width: "100px", height: "100px" }} />
                            ) : Array.isArray(value) ? (
                              value.join(", ")
                            ) : (
                              value || "N/A"
                            )}
                          </div>
                        )
                    )}
                  </div>
                ))
              ) : (
                <div>
                  {Object.entries(entry.value || {}).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong>{" "}
                      {typeof value === "string" && key.includes("image") ? (
                        <img src={`http://localhost:5000${value}`} alt={key} style={{ width: "100px", height: "100px" }} />
                      ) : Array.isArray(value) ? (
                        value.join(", ")
                      ) : (
                        value || "N/A"
                      )}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => handleDelete(entry._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMSManager;