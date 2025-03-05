// routes/contactRoutes.js

const express = require('express');
const { sendEmail } = require('../controllers/contactController');

const router = express.Router();

// Define the route for handling contact form submissions
router.post('/contact', sendEmail);

module.exports = router;
