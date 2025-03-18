import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Admin.css';
import Cadmin from './Cadmin';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // For feedback
import 'react-toastify/dist/ReactToastify.css';
import { backEndURL } from "../../Backendurl";

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
                await axios.put(`${backEndURL}/api/lecturers/${editingId}`, formData);
                toast.success("Lecturer updated successfully!");
                setEditingId(null);
            } else {
                await axios.post(`${backEndURL}/api/lecturers`, formData);
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
        formRef.current.scrollIntoView({ behavior: "smooth" });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the form
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this lecturer?");
        if (isConfirmed) {
            try {
                await axios.delete(`${backEndURL}/api/lecturers/${id}`);
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
                        <a href="#addcourse" className="nav-link">Courses</a>
                    </button>
                    <button className="lecturbtn">
                        <a href="#lecturers" className="nav-link">Lecturers</a>
                    </button>
                    <Link to="/adminvision" className="visionbtn">
                        Vision
                    </Link>
                    <Link to="/adminfooter" className="visionbtn">
                        Footer
                    </Link>
                    <Link to="/whychooseus" className="visionbtn">
                        Why Choose Us
                    </Link>
                </nav>
            </header>

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
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : editingId ? "Update Lecturer" : "Add Lecturer"}
                    </button>
                </form>
                <h2>Lecturers</h2>
                <div className="lecturers-list">

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
