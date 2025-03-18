import { useState } from "react"
import { Edit, Trash2, Plus, X, Save } from "lucide-react"
import "../styles/courses.css"

function Courses() {
  // Sample courses data
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to Web Development", category: "Development", students: 125, status: "Active" },
    { id: 2, title: "Advanced Mathematics", category: "Mathematics", students: 87, status: "Active" },
    { id: 3, title: "Basic Physics", category: "Science", students: 64, status: "Inactive" },
    { id: 4, title: "Digital Marketing Fundamentals", category: "Marketing", students: 112, status: "Active" },
    { id: 5, title: "English Literature", category: "Language", students: 45, status: "Active" },
    { id: 6, title: "Introduction to Psychology", category: "Psychology", students: 93, status: "Inactive" },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "Active",
  })

  const handleAddNew = () => {
    setEditingCourse(null)
    setFormData({
      title: "",
      category: "",
      status: "Active",
    })
    setShowForm(true)
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      category: course.category,
      status: course.status,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id))
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

    if (editingCourse) {
      // Update existing course
      setCourses(courses.map((course) => (course.id === editingCourse.id ? { ...course, ...formData } : course)))
    } else {
      // Add new course
      const newCourse = {
        id: courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
        ...formData,
        students: 0,
      }
      setCourses([...courses, newCourse])
    }

    setShowForm(false)
    setEditingCourse(null)
  }

  return (
    <div className="courses-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Courses Management</h2>
          <p>Manage your educational courses</p>
        </div>
        <button className="add-button" onClick={handleAddNew}>
          <Plus size={16} />
          <span>Add New Course</span>
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h3>{editingCourse ? "Edit Course" : "Add New Course"}</h3>
            <button className="close-button" onClick={() => setShowForm(false)}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
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
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                <span>Save Course</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-header">
              <h3 className="course-title">{course.title}</h3>
              <div className="course-actions">
                <button className="edit-button" onClick={() => handleEdit(course)}>
                  <Edit size={16} />
                </button>
                <button className="delete-button" onClick={() => handleDelete(course.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="course-details">
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{course.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Students:</span>
                <span className="detail-value">{course.students}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${course.status.toLowerCase()}`}>{course.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses

