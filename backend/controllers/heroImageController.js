const HeroImage = require("../models/HeroImage");

// Fetch all images
exports.getHeroImages = async (req, res) => {
    try {
        const images = await HeroImage.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ message: "Error fetching images" });
    }
};

// Upload a new image
exports.uploadHeroImage = async (req, res) => {
    const { imageData } = req.body;

    try {
        const images = await HeroImage.find();
        if (images.length >= 5) {
            return res.status(400).json({ message: "You can only upload a maximum of 5 images." });
        }

        const newImage = new HeroImage({ imageData });
        await newImage.save();
        res.status(201).json({ message: "Image uploaded successfully", data: newImage });
    } catch (err) {
        res.status(500).json({ message: "Error uploading image" });
    }
};

// Delete an image
exports.deleteHeroImage = async (req, res) => {
    const { id } = req.params;

    try {
        await HeroImage.findByIdAndDelete(id);
        const images = await HeroImage.find();
        if (images.length < 2) {
            return res.status(400).json({ message: "You must have at least 2 images." });
        }
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting image" });
    }
};
