"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, X, Save, Video } from "lucide-react"
import "../styles/lectures.css"

function Lectures() {
  // Sample lectures data
  const [lectures, setLectures] = useState([
    { id: 1, title: "Introduction to HTML", course: "Web Development", duration: "45 min", status: "Published" },
    { id: 2, title: "CSS Fundamentals", course: "Web Development", duration: "55 min", status: "Published" },
    { id: 3, title: "JavaScript Basics", course: "Web Development", duration: "60 min", status: "Draft" },
    { id: 4, title: "Calculus I", course: "Advanced Mathematics", duration: "75 min", status: "Published" },
    { id: 5, title: "Linear Algebra", course: "Advanced Mathematics", duration: "65 min", status: "Published" },
    { id: 6, title: "Newton's Laws", course: "Basic Physics", duration: "50 min", status: "Draft" },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingLecture, setEditingLecture] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    duration: "",
    status: "Published",
  })

  const handleAddNew = () => {
    setEditingLecture(null)
    setFormData({
      title: "",
      course: "",
      duration: "",
      status: "Published",
    })
    setShowForm(true)
  }

  const handleEdit = (lecture) => {
    setEditingLecture(lecture)
    setFormData({
      title: lecture.title,
      course: lecture.course,
      duration: lecture.duration,
      status: lecture.status,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      setLectures(lectures.filter((lecture) => lecture.id !== id))
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

    if (editingLecture) {
      // Update existing lecture
      setLectures(lectures.map((lecture) => (lecture.id === editingLecture.id ? { ...lecture, ...formData } : lecture)))
    } else {
      // Add new lecture
      const newLecture = {
        id: lectures.length > 0 ? Math.max(...lectures.map((l) => l.id)) + 1 : 1,
        ...formData,
      }
      setLectures([...lectures, newLecture])
    }

    setShowForm(false)
    setEditingLecture(null)
  }

  return (
    <div className="lectures-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Lectures Management</h2>
          <p>Manage your course lectures</p>
        </div>
        <button className="add-button" onClick={handleAddNew}>
          <Plus size={16} />
          <span>Add New Lecture</span>
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h3>{editingLecture ? "Edit Lecture" : "Add New Lecture"}</h3>
            <button className="close-button" onClick={() => setShowForm(false)}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Lecture Title</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course</label>
              <input type="text" id="course" name="course" value={formData.course} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
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
                <span>Save Lecture</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="lectures-grid">
        {lectures.map((lecture) => (
          <div className="lecture-card" key={lecture.id}>
            <div className="lecture-header">
              <div className="lecture-icon">
                <Video size={24} />
              </div>
              <h3 className="lecture-title">{lecture.title}</h3>
              <div className="lecture-actions">
                <button className="edit-button" onClick={() => handleEdit(lecture)}>
                  <Edit size={16} />
                </button>
                <button className="delete-button" onClick={() => handleDelete(lecture.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="lecture-details">
              <div className="detail-item">
                <span className="detail-label">Course:</span>
                <span className="detail-value">{lecture.course}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{lecture.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${lecture.status.toLowerCase()}`}>{lecture.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lectures

