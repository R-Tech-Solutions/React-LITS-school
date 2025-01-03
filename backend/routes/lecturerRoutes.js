const express = require('express');
const { getAllLecturers, addLecturer, updateLecturer, deleteLecturer } = require('../controllers/lecturerController');

const router = express.Router();

router.get('/', getAllLecturers);
router.post('/', addLecturer);
router.put('/:id', updateLecturer); // Update lecturer by ID
router.delete('/:id', deleteLecturer); // Delete lecturer by ID

module.exports = router;