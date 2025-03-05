const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
    } = req.body;

    // Construct email content
    const message = `
      New Admission Form Submission:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Mobile: ${mobile}
      Address: ${address}
      Class: ${classValue}
      Section: ${sectionValue}
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

    res.status(200).json({ success: true, message: 'Form submitted and emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error submitting form' });
  }
};

// Route to handle form submission
router.post('/submit-form', submitFormController);

// Export the controller function
module.exports = {
  submitFormController,
};
