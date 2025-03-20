const VisionMission = require("../models/VisionMission");

// Get all Vision & Mission records
exports.getAllVisionMissions = async (req, res) => {
    try {
        const data = await VisionMission.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data", error });
    }
};

// Create a new Vision & Mission record
exports.createVisionMission = async (req, res) => {
    try {
        const { visionTitle, visionText, missionTitle, missionText } = req.body;
        const newEntry = new VisionMission({ visionTitle, visionText, missionTitle, missionText });
        await newEntry.save();
        res.status(201).json({ message: "Vision & Mission saved successfully", data: newEntry });
    } catch (error) {
        res.status(500).json({ message: "Error saving data", error });
    }
};

// Update an existing Vision & Mission record
exports.updateVisionMission = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = await VisionMission.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedData) return res.status(404).json({ message: "Data not found" });
        res.status(200).json({ message: "Updated successfully", data: updatedData });
    } catch (error) {
        res.status(500).json({ message: "Error updating data", error });
    }
};

// Delete a Vision & Mission record
exports.deleteVisionMission = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await VisionMission.findByIdAndDelete(id);
        if (!deletedData) return res.status(404).json({ message: "Data not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting data", error });
    }
};
