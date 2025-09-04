import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGES = ["home", "about", "services", "contact", "footer"];

const AdminCmsEditor = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchPageData = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/cms/${selectedPage}`);
      const mapped = {};
      data.forEach(block => {
        mapped[block.section] = block.value;
      });
      setFormData(mapped);
    };
    fetchPageData();
  }, [selectedPage]);

  const handleChange = (section, value) => {
    setFormData({ ...formData, [section]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const section in formData) {
      await axios.post("http://localhost:5000/api/cms", {
        page: selectedPage,
        section,
        value: formData[section],
        type: "text"
      });
    }
    alert("Updated successfully!");
  };

  return (
    <div className="p-6">
      <select onChange={(e) => setSelectedPage(e.target.value)} value={selectedPage}>
        {PAGES.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
      </select>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {Object.entries(formData).map(([section, value]) => (
          <div key={section}>
            <label>{section}</label>
            <textarea
              value={value}
              onChange={(e) => handleChange(section, e.target.value)}
              className="w-full border p-2"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Save</button>
      </form>
    </div>
  );
};

export default AdminCmsEditor;
