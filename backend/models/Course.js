const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    entry: { type: String, required: true },
    commencement: { type: String, required: true },
    structure: { type: String, required: true },
    startDate: { type: String, required: true },
    image: { type: String, required: true }, // Base64 encoded image
});

module.exports = mongoose.model('Course', courseSchema);
