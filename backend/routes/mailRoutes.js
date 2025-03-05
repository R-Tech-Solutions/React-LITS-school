const express = require('express');
const { submitFormController } = require('../controllers/mailController');

const router = express.Router();

// Route to handle form submission
router.post('/submit-form', submitFormController);

module.exports = router;
