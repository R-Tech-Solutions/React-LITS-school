const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String } // Base64 image string
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);