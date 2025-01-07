import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.css';
import Cadmin from './Cadmin';
import { ToastContainer, toast } from 'react-toastify'; // For feedback
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
    const [lecturers, setLecturers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        image: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchLecturers();
    }, []);

    const fetchLecturers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/lecturers");
            setLecturers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            setLoading(false);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                await axios.put(`http://localhost:3001/api/lecturers/${editingId}`, formData);
                toast.success("Lecturer updated successfully!");
                setEditingId(null);
            } else {
                await axios.post("http://localhost:3001/api/lecturers", formData);
                toast.success("Lecturer added successfully!");
            }
            fetchLecturers();
            setFormData({ name: "", subject: "", image: "" });
        } catch (error) {
            toast.error("Error occurred. Please try again.");
            console.error(editingId ? "Error updating lecturer:" : "Error adding lecturer:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (lecturer) => {
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
                await axios.delete(`http://localhost:3001/api/lecturers/${id}`);
                toast.success("Lecturer deleted successfully!");
                fetchLecturers();
            } catch (error) {
                toast.error("Error deleting lecturer. Please try again.");
                console.error("Error deleting lecturer:", error);
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="admin-container">
            <header className="header">
                <nav className="navigation">
                    <button className="coursesbtn">
                        <a href="#courseadd" className="nav-link">Courses</a>
                    </button>
                    <button className="lecturbtn">
                        <a href="#lecturers" className="nav-link">Lecturers</a>
                    </button>
                </nav>
            </header>

            <div className="admin-panel" id="lecturers">
                <h1 className="panel-title">Add Lecturer</h1>

                <form onSubmit={handleSubmit} className="form-container">
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
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : editingId ? "Update Lecturer" : "Add Lecturer"}
                    </button>
                </form>

                <div className="lecturers-list">
                    <h2>Lecturers</h2>
                    {lecturers.map((lecturer) => (
                        <div key={lecturer._id} className="lecturer-card">
                            <div className="lecturer-info">
                                <img
                                    src={lecturer.image}
                                    alt={lecturer.name}
                                    className="lecturer-image"
                                />
                                <div>
                                    <h4>{lecturer.name}</h4>
                                    <p>{lecturer.subject}</p>
                                </div>
                            </div>
                            <div className="lecturer-actions">
                                <button
                                    onClick={() => handleEdit(lecturer)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(lecturer._id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Cadmin />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
};

export default AdminPanel;
