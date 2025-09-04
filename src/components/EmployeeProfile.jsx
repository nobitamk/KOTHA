import React, { useState } from "react";

const EmployeeProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    parentsName: "",
    education: {
      tenth: "",
      inter: "",
      graduation: ""
    },
    jobHistory: {
      hasExperience: false,
      company: "",
      designation: "",
      experienceYears: "",
      skills: ""
    },
    certificates: {
      tenthCert: null,
      interCert: null,
      gradCert: null
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "hasExperience") {
      setForm({
        ...form,
        jobHistory: { ...form.jobHistory, hasExperience: checked }
      });
    } else if (name in form.jobHistory) {
      setForm({
        ...form,
        jobHistory: { ...form.jobHistory, [name]: value }
      });
    } else if (name in form.education) {
      setForm({
        ...form,
        education: { ...form.education, [name]: value }
      });
    } else if (name in form.certificates) {
      setForm({
        ...form,
        certificates: { ...form.certificates, [name]: e.target.files[0] }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Profile:", form);
    // You can send this to the backend using FormData if files are involved
  };

  return (
    <div className="profile-container">
      <h2>Employee Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
        <input name="parentsName" placeholder="Parent's Name" value={form.parentsName} onChange={handleChange} required />

        <h4>Education Background</h4>
        <input name="tenth" placeholder="10th School Name" value={form.education.tenth} onChange={handleChange} required />
        <input name="inter" placeholder="Intermediate College" value={form.education.inter} onChange={handleChange} required />
        <input name="graduation" placeholder="Graduation College" value={form.education.graduation} onChange={handleChange} required />

        <h4>Experience</h4>
        <label>
          <input type="checkbox" name="hasExperience" checked={form.jobHistory.hasExperience} onChange={handleChange} />
          I have prior work experience
        </label>

        {form.jobHistory.hasExperience && (
          <>
            <input name="company" placeholder="Company Name" value={form.jobHistory.company} onChange={handleChange} />
            <input name="designation" placeholder="Designation" value={form.jobHistory.designation} onChange={handleChange} />
            <input name="experienceYears" placeholder="Years of Experience" value={form.jobHistory.experienceYears} onChange={handleChange} />
            <input name="skills" placeholder="Skills / Tech Stack" value={form.jobHistory.skills} onChange={handleChange} />
          </>
        )}

        <h4>Upload Certificates</h4>
        <label>10th Certificate: <input type="file" name="tenthCert" onChange={handleChange} /></label>
        <label>Inter Certificate: <input type="file" name="interCert" onChange={handleChange} /></label>
        <label>Graduation Certificate: <input type="file" name="gradCert" onChange={handleChange} /></label>

        <button type="submit">Save Profile</button>
      </form>

      <style>{`
        .profile-container {
          padding: 20px;
          max-width: 600px;
          margin: auto;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .profile-form input[type='text'],
        .profile-form input[type='email'],
        .profile-form input[type='file'] {
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .profile-form button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .profile-form button:hover {
          background-color: #0056b3;
        }

        h2, h4 {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default EmployeeProfile;
