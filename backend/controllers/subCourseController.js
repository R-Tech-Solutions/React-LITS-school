// backend/controllers/subCourseController.js
const SubCourse = require("../models/SubCourse");

exports.createSubCourse = async (req, res) => {
    try {
        const newSubCourse = new SubCourse(req.body);
        await newSubCourse.save();
        res.status(201).json({ message: "Sub-course created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error creating sub-course", error });
    }
};

exports.getAllSubCourses = async (req, res) => {
    try {
        const subCourses = await SubCourse.find();
        res.status(200).json(subCourses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sub-courses", error });
    }
};

exports.getSubCoursesByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const subCourses = await SubCourse.find({ title });
        if (!subCourses.length) {
            return res.status(404).json({ message: "No sub-courses found for the given title" });
        }
        res.status(200).json(subCourses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sub-courses", error });
    }
};

exports.updateSubCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSubCourse = await SubCourse.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedSubCourse) {
            return res.status(404).json({ message: "Sub-course not found" });
        }

        res.status(200).json({ message: "Sub-course updated successfully", updatedSubCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating sub-course", error });
    }
};

exports.patchSubCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSubCourse = await SubCourse.findByIdAndUpdate(id, req.body, { new: true, overwrite: false });
        
        if (!updatedSubCourse) {
            return res.status(404).json({ message: "Sub-course not found" });
        }

        res.status(200).json({ message: "Sub-course patched successfully", updatedSubCourse });
    } catch (error) {
        res.status(500).json({ message: "Error patching sub-course", error });
    }
};

exports.deleteSubCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubCourse = await SubCourse.findByIdAndDelete(id);
        
        if (!deletedSubCourse) {
            return res.status(404).json({ message: "Sub-course not found" });
        }

        res.status(200).json({ message: "Sub-course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting sub-course", error });
    }
};
