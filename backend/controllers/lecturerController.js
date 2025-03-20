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
    if (!name ||  !subject || !image) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newLecturer = new Lecturer({ name,  subject, image });
        await newLecturer.save();
        res.status(201).json({ message: "Lecturer added successfully", newLecturer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a lecturer
exports.updateLecturer = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedLecturer = await Lecturer.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedLecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }

        res.status(200).json({ message: 'Lecturer updated successfully', updatedLecturer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a lecturer
exports.deleteLecturer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLecturer = await Lecturer.findByIdAndDelete(id);

        if (!deletedLecturer) {
            return res.status(404).json({ error: 'Lecturer not found' });
        }

        res.status(200).json({ message: 'Lecturer deleted successfully', deletedLecturer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
