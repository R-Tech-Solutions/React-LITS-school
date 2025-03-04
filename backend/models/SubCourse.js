// backend/models/SubCourse.js
const mongoose = require("mongoose");

const SubCourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    entry: { type: String, required: true },
    payment: { type: String, required: true },
    structure: { type: String, required: true },
    startDate: { type: String, required: true },
    duration: { type: String, required: true },
    time: { type: String, required: true },
    lecturer: { type: String, required: true },
    image: { type: String, required: true }, // Base64 image
}, { timestamps: true });

module.exports = mongoose.model("SubCourse", SubCourseSchema);