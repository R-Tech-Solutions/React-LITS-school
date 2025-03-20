// routes/contactRoutes.js

const express = require('express');
const { sendEmail, getContactSubmissions, deleteContactSubmission } = require('../controllers/contactController'); // Import the delete function

const router = express.Router();

// Define the route for handling contact form submissions
router.post('/contact', sendEmail);

// Define the route for fetching contact form submissions
router.get('/contact-submissions', getContactSubmissions); // New route

// Define the route for deleting contact form submissions
router.delete('/contact-submissions/:id', deleteContactSubmission); // New route

module.exports = router;
