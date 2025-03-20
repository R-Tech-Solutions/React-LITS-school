const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String }, // Base64 string (image/video)
    mainVideo: { type: String }, // Base64 string (video)
    subImages: [{ type: String }], // Array of Base64 images
    subVideos: [{ type: String }] // Array of Base64 videos
}, { timestamps: true });

module.exports = mongoose.model("Gallery", GallerySchema);