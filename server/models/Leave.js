const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "EmployeeProfile" },
  name: String,
  reason: String,
  startDate: String,
  endDate: String,
  status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Leave", LeaveSchema);
