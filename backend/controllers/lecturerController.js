const Lecturer = require('../models/Lecturer');

// Get all lecturers
exports.getAllLecturers = async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.status(200).json(lecturers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new lecturer
exports.addLecturer = async (req, res) => {
    const { name, subject, image } = req.body;

    if (!name || !subject || !image) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newLecturer = new Lecturer({ name, subject, image });
        await newLecturer.save();
        res.status(201).json({ message: 'Lecturer added successfully', newLecturer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
