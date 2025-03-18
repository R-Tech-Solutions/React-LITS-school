import React, { useState, useRef } from "react";
import "../styles/lectures.css"

const Lectures = () => {
    const [lecturers, setLecturers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        image: "",
    });
    const [editingId, setEditingId] = useState(null);
    const formRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            setLecturers(lecturers.map((lecturer, index) => 
                index === editingId ? { ...formData } : lecturer
            ));
            setEditingId(null);
        } else {
            setLecturers([...lecturers, formData]);
        }
        setFormData({ name: "", subject: "", image: "" });
    };

    const handleEdit = (index) => {
        setEditingId(index);
        setFormData(lecturers[index]);
        formRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const handleDelete = (index) => {
        setLecturers(lecturers.filter((_, i) => i !== index));
    };

    return (
        <div className="admin-container">
            <div className="admin-panel" id="lecturers">
                <h1 className="panel-title">Add Lecturer</h1>

                <form onSubmit={handleSubmit} className="form-container" ref={formRef}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input"
                            required={!editingId}
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        {editingId !== null ? "Update Lecturer" : "Add Lecturer"}
                    </button>
                </form>
                <h2>Lecturers</h2>
                <div className="lecturers-list">
                    {lecturers.map((lecturer, index) => (
                        <div key={index} className="lecturer-card">
                            <div className="lecturer-info">
                                {lecturer.image && (
                                    <img
                                        src={lecturer.image}
                                        alt={lecturer.name}
                                        className="lecturer-image"
                                    />
                                )}
                                <div>
                                    <h4>{lecturer.name}</h4>
                                    <p>{lecturer.subject}</p>
                                </div>
                            </div>
                            <div className="lecturer-actions">
                                <button onClick={() => handleEdit(index)} className="edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(index)} className="delete-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Lectures;
