const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error });
    }
};

// Add a new course
exports.addCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: "Error adding course", error });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course", error });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error });
    }
};
