import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';  // Import Axios to make API requests
import '../styles/blog.css';

const Blog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [selectedBlogsId, setSelectedBlogsId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [blogs, setBlogs] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    // Fetch blogs when the component mounts
    axios.get('http://localhost:3001/api/blogs')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBlogsId !== null) {
      // Update an existing blog
      axios.put(`http://localhost:3001/api/blogs/${selectedBlogsId}`, formData)
        .then((response) => {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog._id === selectedBlogsId ? response.data : blog
            )
          );
        })
        .catch((error) => console.error('Error updating blog:', error));
    } else {
      // Add a new blog
      axios.post('http://localhost:3001/api/blogs', formData)
        .then((response) => {
          setBlogs((prevBlogs) => [...prevBlogs, response.data]);
        })
        .catch((error) => console.error('Error adding blog:', error));
    }

    // Reset form
    setFormData({ title: '', description: '', image: '' });
    setImagePreview('');
    setSelectedBlogsId(null);
  };

  const handleUpdateClick = (id) => {
    const blog = blogs.find((blog) => blog._id === id);
    setFormData(blog);
    setImagePreview(blog.image || '');
    setSelectedBlogsId(id);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/blogs/${id}`)
      .then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      })
      .catch((error) => console.error('Error deleting blog:', error));
  };

  return (
    <div className="blog-admin">
      <div className='title-section'>
        <h1>{selectedBlogsId !== null ? 'Edit Blog' : 'Create Blog'}</h1>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="blog-form">
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Blog Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Blog Description"
          required
        />
        <input type="file" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        <button type="submit">
          {selectedBlogsId !== null ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>
      
      <h2>Blogs</h2>
      <div className='blog-list'>
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              {blog.image && <img src={blog.image} alt={blog.title} className="image-preview" />}
              <div className='button-container'>
                <button className='edit-button' onClick={() => handleUpdateClick(blog._id)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
