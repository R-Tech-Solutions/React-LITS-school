// models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // base64 string for image
    required: false,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
