const Course = require('../models/Course');

exports.addCourse = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        const newCourse = new Course({ title, description, image });
        await newCourse.save();
        res.status(201).json({ message: 'Course added successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, { title, description, image }, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCourseTitles = async (req, res) => {
    try {
        const courses = await Course.find({}, '_id title'); // Fetch only id and title
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
