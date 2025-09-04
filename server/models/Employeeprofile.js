const mongoose = require("mongoose");

const employeeProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  dob: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String },
  lastCompany: { type: String },
  parentName: { type: String, required: true },
  certificates: {
    tenth: { type: String, default: "" },
    inter: { type: String, default: "" },
    graduation: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model("EmployeeProfile", employeeProfileSchema);
