const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    addCourse,
    deleteCourse,
    updateCourse,
} = require('../controllers/courseController');

// Get all courses
router.get('/', getAllCourses);

// Add a course
router.post('/', addCourse);

// Delete a course
router.delete('/:id', deleteCourse);

// Update a course
router.put('/:id', updateCourse);

module.exports = router;
