import React, { useState, useRef } from 'react';
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
      setBlogs((prevBlogs) =>
        prevBlogs.map((blogs, index) =>
          index === selectedBlogsId ? { ...formData } : blogs
        )
      );
    } else {
      setBlogs((prevBlogs) => [...prevBlogs, formData]);
    }
    setFormData({ title: '', description: '', image: '' });
    setImagePreview('');
    setSelectedBlogsId(null);
  };

  const handleUpdateClick = (index) => {
    setFormData(blogs[index]);
    setImagePreview(blogs[index].image || '');
    setSelectedBlogsId(index);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    setBlogs((prevBlogs) => prevBlogs.filter((_, i) => i !== index));
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
          {blogs.map((blogs, index) => (
            <li key={index}>
              <h3>{blogs.title}</h3>
              <p>{blogs.description}</p>
              {blogs.image && <img src={blogs.image} alt={blogs.title} className="image-preview" />}
              <div className='button-container'>
                <button className='edit-button' onClick={() => handleUpdateClick(index)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
