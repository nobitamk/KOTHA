const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  projectType: String,
  budget: String,
  urgent: Boolean,
  nda: Boolean,
  zoom: Boolean,
  file: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", contactSchema);
