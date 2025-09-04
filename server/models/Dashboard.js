const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  employees: Number,
  interns: Number,
  projects: Number,
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
