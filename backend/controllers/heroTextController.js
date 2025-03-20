    const HeroText = require("../models/HeroText");

    // Get all hero text entries
    exports.getAllHeroText = async (req, res) => {
        try {
            const data = await HeroText.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving hero text", error });
        }
    };

    // Create a new hero text entry
    exports.createHeroText = async (req, res) => {
        try {
            const { textTitle, textDetails } = req.body;
            const newEntry = new HeroText({ textTitle, textDetails });
            await newEntry.save();
            res.status(201).json({ message: "Hero text saved successfully", data: newEntry });
        } catch (error) {
            res.status(500).json({ message: "Error saving hero text", error });
        }
    };

    // Update hero text by ID
    exports.updateHeroText = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = await HeroText.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedData) return res.status(404).json({ message: "Hero text not found" });
            res.status(200).json({ message: "Hero text updated successfully", data: updatedData });
        } catch (error) {
            res.status(500).json({ message: "Error updating hero text", error });
        }
    };

    // Delete hero text by ID
    exports.deleteHeroText = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedData = await HeroText.findByIdAndDelete(id);
            if (!deletedData) return res.status(404).json({ message: "Hero text not found" });
            res.status(200).json({ message: "Hero text deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting hero text", error });
        }
    };
