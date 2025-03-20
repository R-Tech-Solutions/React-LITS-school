// controllers/galleryController.js
const Gallery = require("../models/Gallery");

// Create or update a gallery entry
exports.createOrUpdateGallery = async (req, res) => {
    try {
        const { id, title, description, thumbnail, mainVideo, subImages, subVideos } = req.body;
        if (id) {
            const updatedGallery = await Gallery.findByIdAndUpdate(id, { title, description, thumbnail, mainVideo, subImages, subVideos }, { new: true });
            return res.status(200).json(updatedGallery);
        } else {
            const newGallery = new Gallery({ title, description, thumbnail, mainVideo, subImages, subVideos });
            await newGallery.save();
            return res.status(201).json(newGallery);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all gallery entries
exports.getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find();
        res.status(200).json(galleries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a gallery entry
exports.deleteGallery = async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Gallery deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};