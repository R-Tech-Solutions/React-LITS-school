const mongoose = require('mongoose');

// Define the schema for the form submission
const submissionSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  guardianName: { type: String, required: true },
  guardianMobile: { type: String, required: true },
  guardianRelation: { type: String, required: true },
  classValue: { type: String, required: true },
  sectionValue: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model based on the schema
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
