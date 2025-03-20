// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');

// Create a new blog post
router.post('/blogs', BlogController.createBlog);

// Get all blog posts
router.get('/blogs', BlogController.getAllBlogs);

// Get a specific blog by ID
router.get('/blogs/:id', BlogController.getBlogById);

// Update a blog post by ID
router.put('/blogs/:id', BlogController.updateBlog);

// Delete a blog post by ID
router.delete('/blogs/:id', BlogController.deleteBlog);

module.exports = router;
