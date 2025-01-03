const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    image: { type: String, required: true }, // Base64 encoded image string
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
