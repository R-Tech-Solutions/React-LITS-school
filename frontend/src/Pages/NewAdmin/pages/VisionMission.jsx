"use client"

import { useState } from "react"
import { Save, Eye } from "lucide-react"
import "../styles/vision-mission.css"

function VisionMission() {
  const [visionMission, setVisionMission] = useState({
    vision: "To become a leading global institution that transforms education through innovation and excellence.",
    mission:
      "To empower individuals with knowledge, skills, and values to excel in a rapidly changing world through quality education, research, and community engagement.",
    values: [
      "Excellence in teaching and learning",
      "Innovation and creativity",
      "Integrity and ethics",
      "Diversity and inclusion",
      "Community engagement",
    ],
    goals: [
      "Provide high-quality education that meets global standards",
      "Foster innovation and research that addresses societal challenges",
      "Develop partnerships with industry and community",
      "Promote lifelong learning and professional development",
      "Create an inclusive and supportive learning environment",
    ],
  })

  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ ...visionMission })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]]
    newArray[index] = e.target.value
    setFormData({
      ...formData,
      [field]: newArray,
    })
  }

  const addItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    })
  }

  const removeItem = (index, field) => {
    const newArray = [...formData[field]]
    newArray.splice(index, 1)
    setFormData({
      ...formData,
      [field]: newArray,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setVisionMission({ ...formData })
    setEditing(false)
  }

  return (
    <div className="vision-mission-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Vision & Mission</h2>
          <p>Define your institution's vision, mission, values, and goals</p>
        </div>
        <button className={`edit-button ${editing ? "active" : ""}`} onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {editing ? (
        <form className="vision-mission-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Vision Statement</h3>
            <textarea name="vision" value={formData.vision} onChange={handleChange} rows="4" required></textarea>
          </div>

          <div className="form-section">
            <h3>Mission Statement</h3>
            <textarea name="mission" value={formData.mission} onChange={handleChange} rows="4" required></textarea>
          </div>

          <div className="form-section">
            <h3>Core Values</h3>
            {formData.values.map((value, index) => (
              <div className="array-input" key={index}>
                <input type="text" value={value} onChange={(e) => handleArrayChange(e, index, "values")} required />
                <button type="button" className="remove-button" onClick={() => removeItem(index, "values")}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem("values")}>
              Add Value
            </button>
          </div>

          <div className="form-section">
            <h3>Strategic Goals</h3>
            {formData.goals.map((goal, index) => (
              <div className="array-input" key={index}>
                <input type="text" value={goal} onChange={(e) => handleArrayChange(e, index, "goals")} required />
                <button type="button" className="remove-button" onClick={() => removeItem(index, "goals")}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addItem("goals")}>
              Add Goal
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="vision-mission-display">
          <div className="display-card">
            <div className="card-icon">
              <Eye size={24} />
            </div>
            <h3>Vision Statement</h3>
            <p>{visionMission.vision}</p>
          </div>

          <div className="display-card">
            <div className="card-icon">
              <Eye size={24} />
            </div>
            <h3>Mission Statement</h3>
            <p>{visionMission.mission}</p>
          </div>

          <div className="display-card">
            <h3>Core Values</h3>
            <ul className="values-list">
              {visionMission.values.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>

          <div className="display-card">
            <h3>Strategic Goals</h3>
            <ul className="goals-list">
              {visionMission.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default VisionMission

