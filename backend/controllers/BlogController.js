// controllers/BlogController.js

const Blog = require('../models/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  const { title, description, image } = req.body;
  
  try {
    const newBlog = new Blog({ title, description, image });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Update an existing blog post
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, description, image }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};
