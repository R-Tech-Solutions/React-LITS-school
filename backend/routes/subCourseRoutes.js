// backend/routes/subCourseRoutes.js
const express = require("express");
const router = express.Router();
const { createSubCourse, getAllSubCourses, updateSubCourse, deleteSubCourse, patchSubCourse, getSubCoursesByTitle } = require("../controllers/subCourseController");

// POST, GET routes
router.post("/add", createSubCourse);
router.get("/", getAllSubCourses);
router.get("/title/:title", getSubCoursesByTitle);

// PUT, DELETE, and PATCH routes
router.put("/update/:id", updateSubCourse);  // For full update
router.patch("/patch/:id", patchSubCourse); // For partial update
router.delete("/delete/:id", deleteSubCourse);  // For delete

module.exports = router;
