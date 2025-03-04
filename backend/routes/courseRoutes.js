const express = require('express');
const router = express.Router();
const { addCourse, getCourses, updateCourse, deleteCourse, getCourseTitles} = require('../controllers/courseController');

router.post('/add', addCourse);
router.get('/', getCourses);
router.put('/update/:id', updateCourse);
router.delete('/delete/:id', deleteCourse);
router.get('/titles', getCourseTitles); // New route for fetching only titles

module.exports = router;