"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, X, Save, Calendar, User } from "lucide-react"
import "../styles/blog.css"

function Blog() {
  // Sample blog posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "10 Tips for Effective Online Learning",
      excerpt: "Discover the best practices for successful online education...",
      author: "John Smith",
      date: "2023-05-15",
      status: "Published",
      category: "Learning Tips",
    },
    {
      id: 2,
      title: "The Future of Education Technology",
      excerpt: "Exploring emerging technologies that will transform education...",
      author: "Sarah Johnson",
      date: "2023-06-22",
      status: "Published",
      category: "EdTech",
    },
    {
      id: 3,
      title: "Building Critical Thinking Skills",
      excerpt: "How to develop essential critical thinking abilities in students...",
      author: "Michael Brown",
      date: "2023-07-10",
      status: "Draft",
      category: "Teaching Methods",
    },
    {
      id: 4,
      title: "Inclusive Education Strategies",
      excerpt: "Creating inclusive learning environments for all students...",
      author: "Emily Davis",
      date: "2023-08-05",
      status: "Published",
      category: "Inclusive Education",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    date: "",
    status: "Published",
    category: "",
  })

  const handleAddNew = () => {
    setEditingPost(null)
    setFormData({
      title: "",
      excerpt: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      status: "Published",
      category: "",
    })
    setShowForm(true)
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      status: post.status,
      category: post.category,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingPost) {
      // Update existing post
      setPosts(posts.map((post) => (post.id === editingPost.id ? { ...post, ...formData } : post)))
    } else {
      // Add new post
      const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
        ...formData,
      }
      setPosts([...posts, newPost])
    }

    setShowForm(false)
    setEditingPost(null)
  }

  return (
    <div className="blog-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Blog Management</h2>
          <p>Manage your blog posts and articles</p>
        </div>
        <button className="add-button" onClick={handleAddNew}>
          <Plus size={16} />
          <span>Add New Post</span>
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h3>{editingPost ? "Edit Blog Post" : "Add New Blog Post"}</h3>
            <button className="close-button" onClick={() => setShowForm(false)}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Post Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                <span>Save Post</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blog-grid">
        {posts.map((post) => (
          <div className="blog-card" key={post.id}>
            <div className="blog-header">
              <h3 className="blog-title">{post.title}</h3>
              <div className="blog-actions">
                <button className="edit-button" onClick={() => handleEdit(post)}>
                  <Edit size={16} />
                </button>
                <button className="delete-button" onClick={() => handleDelete(post.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="blog-category">{post.category}</div>
            <p className="blog-excerpt">{post.excerpt}</p>
            <div className="blog-meta">
              <div className="meta-item">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <span className={`status-badge ${post.status.toLowerCase()}`}>{post.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog

