const express = require('express');
const { getAllLecturers, addLecturer } = require('../controllers/lecturerController');

const router = express.Router();

router.get('/', getAllLecturers);
router.post('/', addLecturer);

module.exports = router;
