const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  projectType: String,
  budget: String,
  details: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
