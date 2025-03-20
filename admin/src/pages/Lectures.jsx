import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/lectures.css"
import { backEndURL } from "../Backendurl";

const Lectures = () => {
    const [lecturers, setLecturers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        image: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        fetchLecturers();
    }, []);

    const fetchLecturers = async () => {
        try {
            const response = await axios.get(`${backEndURL}/api/lecturers`);
            setLecturers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} with value:`, value); // Debugging
        setFormData((prev) => ({ ...prev, [name]: value }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log("Submitting Form Data:", formData); // Debugging

        try {
            if (editingId) {
                await axios.put(`${backEndURL}/api/lecturers/${editingId}`, formData, {
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                await axios.post(`${backEndURL}/api/lecturers`, formData, {
                    headers: { "Content-Type": "application/json" },
                });
            }
            fetchLecturers();
            setFormData({ name: "", subject: "", image: "" });
            setEditingId(null);
        } catch (error) {
            console.error("Error submitting lecturer:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (lecturer) => {
        console.log("Editing lecturer:", lecturer);
        setEditingId(lecturer._id);
        setFormData({
            name: lecturer.name,
            subject: lecturer.subject,
            image: lecturer.image,
        });
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this lecturer?");
        if (isConfirmed) {
            try {
                await axios.delete(`${backEndURL}/api/lecturers/${id}`);
                fetchLecturers();
            } catch (error) {
                console.error("Error deleting lecturer:", error);
            }
        }
    };

    if (loading) {
        
    }

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
                        <label>Description:</label>
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
                    {lecturers.map((lecturer) => (
                        <div key={lecturer._id} className="lecturer-card">
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
                                <button onClick={() => handleEdit(lecturer)} className="edit-btn">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(lecturer._id)} className="delete-btn">
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
