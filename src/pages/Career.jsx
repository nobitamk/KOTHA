import React, { useEffect, useState } from "react";

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    resume: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Fetching jobs from /api/cms/career");
        const res = await fetch("http://localhost:5000/api/cms/career");
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        console.log("Career CMS response:", JSON.stringify(data, null, 2));

        let jobsData = [];
        const jobSection = data.find((entry) => entry.section === "jobList") || data[0];
        if (jobSection) {
          console.log("Job section:", JSON.stringify(jobSection, null, 2));
          const value = jobSection.value;
          if (Array.isArray(value)) {
            jobsData = value;
            console.log("Value is array:", jobsData);
          } else if (value && typeof value === "object" && Object.keys(value).length > 0) {
            jobsData = [value];
            console.log("Value is object, wrapped in array:", jobsData);
          } else {
            console.warn("Invalid value format:", value);
          }
          jobsData = jobsData
            .filter((job) => job && job.title)
            .map((job, i) => ({ ...job, id: job.id || `job-${i}` }));
          console.log("Processed jobs:", JSON.stringify(jobsData, null, 2));
          setJobs(jobsData);
        } else {
          console.warn("No job section found:", data);
          setError("No job listings found. Showing sample data.");
          jobsData = [
            { id: "sample-1", title: "Frontend Developer", location: "Remote", type: "Full-time" },
            { id: "sample-2", title: "Backend Engineer", location: "Hyderabad", type: "Internship" },
          ];
          setJobs(jobsData);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err.message);
        setError(`Failed to load jobs: ${err.message}. Using sample data.`);
        setJobs([
          { id: "sample-1", title: "Frontend Developer", location: "Remote", type: "Full-time" },
          { id: "sample-2", title: "Backend Engineer", location: "Hyderabad", type: "Internship" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    data.append("job", selectedJob);
    data.append("resume", formData.resume);

    try {
      console.log("Submitting application to /api/career/apply");
      const res = await fetch("http://localhost:5000/api/career/apply", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      alert(result.message);
      setFormData({ name: "", email: "", message: "", resume: null });
      setSelectedJob("");
    } catch (err) {
      alert("Application failed: " + err.message);
    }
  };

  return (
    <div className="career-container">
      <style>{`
        .career-container { padding: 40px 20px; font-family: Arial, sans-serif; }
        .career-heading { text-align: center; font-size: 32px; margin-bottom: 30px; color: #333; }
        .career-content { display: flex; flex-direction: column; }
        @media (min-width: 768px) { .career-content { flex-direction: row; gap: 40px; } }
        .job-listings { flex: 1; }
        .job-card { border: 1px solid #ddd; padding: 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s ease; border-radius: 8px; }
        .job-card:hover { background-color: #f9f9f9; }
        .job-card.selected { border-color: #007bff; background-color: #eef5ff; }
        .application-form { flex: 1; background: #f7f7f7; padding: 24px; border-radius: 8px; margin-top: 30px; }
        @media (min-width: 768px) { .application-form { margin-top: 0; } }
        .application-form form { display: flex; flex-direction: column; }
        .application-form input, .application-form textarea { padding: 10px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 4px; }
        .application-form button { background-color: #007bff; color: #fff; border: none; padding: 10px; cursor: pointer; border-radius: 4px; transition: 0.3s; }
        .application-form button:hover { background-color: #0056b3; }
        .application-form label { font-weight: bold; margin-bottom: 6px; }
        .error { color: red; text-align: center; padding: 20px; }
      `}</style>

      <h1 className="career-heading">Join Our Team</h1>
      {loading && <p style={{ textAlign: "center" }}>Loading jobs...</p>}
      {error && <p className="error">{error}</p>}
      <div className="career-content">
        <div className="job-listings">
          <h2>Open Positions</h2>
          {jobs.length === 0 ? (
            <p>No positions available.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className={`job-card ${selectedJob === job.title ? "selected" : ""}`}
                onClick={() => setSelectedJob(job.title)}
              >
                <h3>{job.title || "Untitled Job"}</h3>
                <p>{job.location || "N/A"}</p>
                <p>{job.type || "N/A"}</p>
                {job.description && <p>{job.description}</p>}
              </div>
            ))
          )}
        </div>
        <div className="application-form">
          <h2>Apply Now</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type="text"
              name="job"
              value={selectedJob}
              placeholder="Job Title"
              required
              onChange={(e) => setSelectedJob(e.target.value)}
            />
            <textarea
              name="message"
              placeholder="Why should we hire you?"
              rows="4"
              required
              onChange={handleChange}
              value={formData.message}
            />
            <label>
              Upload Resume:
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleChange}
              />
            </label>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Career;