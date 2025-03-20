const Footer = require("../models/Footer");

// Get Footer Data
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: "No footer data found" });
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Footer Data (Allow only one entry)
exports.createFooter = async (req, res) => {
  try {
    const existingFooter = await Footer.findOne();
    if (existingFooter) {
      return res.status(400).json({ message: "Only one footer entry is allowed." });
    }

    const newFooter = new Footer(req.body);
    await newFooter.save();
    res.status(201).json(newFooter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Footer Data (Only modify the existing entry)
exports.updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "No footer found to update" });
    }

    const updatedFooter = await Footer.findByIdAndUpdate(footer._id, req.body, { new: true });
    res.json(updatedFooter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Footer Data
exports.deleteFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "No footer found to delete" });
    }

    await Footer.findByIdAndDelete(footer._id);
    res.json({ message: "Footer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
