const express = require('express');
const { submitFormController, getSubmissionsController, deleteSubmissionController } = require('../controllers/mailController');

const router = express.Router();

// Route to handle form submission
router.post('/submit-form', submitFormController);

// Route to get all submissions
router.get('/contact-submissions', getSubmissionsController);

// Route to delete a submission
router.delete('/contact-submissions/:id', deleteSubmissionController);

module.exports = router;
