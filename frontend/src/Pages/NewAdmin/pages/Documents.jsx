"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, X, Save, FileText, Download, Eye } from "lucide-react"
import "../styles/documents.css"

function Documents() {
  // Sample documents data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Student Handbook 2023",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Admin",
      date: "2023-01-15",
      category: "Handbooks",
    },
    {
      id: 2,
      title: "Course Catalog",
      type: "PDF",
      size: "5.1 MB",
      uploadedBy: "Admin",
      date: "2023-02-10",
      category: "Catalogs",
    },
    {
      id: 3,
      title: "Faculty Guidelines",
      type: "DOCX",
      size: "1.8 MB",
      uploadedBy: "HR Manager",
      date: "2023-03-22",
      category: "Guidelines",
    },
    {
      id: 4,
      title: "Research Paper Template",
      type: "DOCX",
      size: "0.5 MB",
      uploadedBy: "Research Dept",
      date: "2023-04-05",
      category: "Templates",
    },
    {
      id: 5,
      title: "Campus Map",
      type: "PDF",
      size: "3.2 MB",
      uploadedBy: "Admin",
      date: "2023-05-18",
      category: "Maps",
    },
    {
      id: 6,
      title: "Academic Calendar",
      type: "PDF",
      size: "1.1 MB",
      uploadedBy: "Admin",
      date: "2023-06-01",
      category: "Calendars",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "PDF",
    size: "",
    uploadedBy: "",
    date: "",
    category: "",
  })

  const handleAddNew = () => {
    setEditingDocument(null)
    setFormData({
      title: "",
      type: "PDF",
      size: "",
      uploadedBy: "Admin",
      date: new Date().toISOString().split("T")[0],
      category: "",
    })
    setShowForm(true)
  }

  const handleEdit = (document) => {
    setEditingDocument(document)
    setFormData({
      title: document.title,
      type: document.type,
      size: document.size,
      uploadedBy: document.uploadedBy,
      date: document.date,
      category: document.category,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter((document) => document.id !== id))
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

    if (editingDocument) {
      // Update existing document
      setDocuments(
        documents.map((document) => (document.id === editingDocument.id ? { ...document, ...formData } : document)),
      )
    } else {
      // Add new document
      const newDocument = {
        id: documents.length > 0 ? Math.max(...documents.map((d) => d.id)) + 1 : 1,
        ...formData,
      }
      setDocuments([...documents, newDocument])
    }

    setShowForm(false)
    setEditingDocument(null)
  }

  return (
    <div className="documents-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Documents Management</h2>
          <p>Manage your institution's documents</p>
        </div>
        <button className="add-button" onClick={handleAddNew}>
          <Plus size={16} />
          <span>Add New Document</span>
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h3>{editingDocument ? "Edit Document" : "Add New Document"}</h3>
            <button className="close-button" onClick={() => setShowForm(false)}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Document Title</label>
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
              <label htmlFor="type">File Type</label>
              <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
                <option value="PPTX">PPTX</option>
                <option value="TXT">TXT</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="size">File Size</label>
              <input
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                placeholder="e.g. 2.4 MB"
              />
            </div>
            <div className="form-group">
              <label htmlFor="uploadedBy">Uploaded By</label>
              <input
                type="text"
                id="uploadedBy"
                name="uploadedBy"
                value={formData.uploadedBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Upload Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                <span>Save Document</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="documents-grid">
        {documents.map((document) => (
          <div className="document-card" key={document.id}>
            <div className="document-icon">
              <FileText size={24} />
            </div>
            <div className="document-header">
              <h3 className="document-title">{document.title}</h3>
              <div className="document-actions">
                <button className="view-button" title="View Document">
                  <Eye size={16} />
                </button>
                <button className="download-button" title="Download Document">
                  <Download size={16} />
                </button>
                <button className="edit-button" onClick={() => handleEdit(document)}>
                  <Edit size={16} />
                </button>
                <button className="delete-button" onClick={() => handleDelete(document.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="document-details">
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{document.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Size:</span>
                <span className="detail-value">{document.size}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{document.category}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Uploaded:</span>
                <span className="detail-value">{document.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">By:</span>
                <span className="detail-value">{document.uploadedBy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents

