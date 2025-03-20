const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Submission = require('../models/submissionModel'); // Import the Submission model

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Controller function to handle form submission and send email
const submitFormController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      guardianName,
      guardianMobile,
      guardianRelation,
      classValue,
      sectionValue,
      gender,
      dob,
    } = req.body;

    // Save the submission data to the database
    const newSubmission = new Submission({
      firstName,
      lastName,
      email,
      mobile,
      address,
      guardianName,
      guardianMobile,
      guardianRelation,
      classValue,
      sectionValue,
      gender,
      dob,
    });

    // Save the new submission
    await newSubmission.save();

    // Construct email content
    const message = `
      New Admission Form Submission:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Mobile: ${mobile}
      Address: ${address}
      Class: ${classValue}
      Section: ${sectionValue}
      Gender: ${gender}
      Date of Birth: ${dob}
      Guardian Name: ${guardianName}
      Guardian Relation: ${guardianRelation}
      Guardian Mobile: ${guardianMobile}
    `;

    // Send email to admin (your email)
    await transporter.sendMail({
      from: email, // User's email
      to: process.env.EMAIL_USER, // Admin's email
      subject: 'New Admission Form Submission',
      text: message,
    });

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admission Form Submission Successful',
      text: 'Thank you for contacting us! Your admission form has been received successfully.',
    });

    res.status(200).json({ success: true, message: 'Form submitted, data saved, and emails sent successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Error submitting form' });
  }
};

// Controller function to get all submissions
const getSubmissionsController = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json({ success: true, contactSubmissions: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, message: 'Error fetching submissions' });
  }
};

// Controller function to delete a submission
const deleteSubmissionController = async (req, res) => {
  try {
    const { id } = req.params;
    await Submission.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ success: false, message: 'Error deleting submission' });
  }
};

// Route to handle form submission
router.post('/submit-form', submitFormController);

// Export the controller function
module.exports = {
  submitFormController,
  getSubmissionsController,
  deleteSubmissionController,
};
