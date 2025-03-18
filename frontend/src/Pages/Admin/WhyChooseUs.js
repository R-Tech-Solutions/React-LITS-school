import React, { useState } from "react";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [reasons, setReasons] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.description) {
            setReasons([...reasons, { ...formData, id: Date.now() }]);
            setFormData({ title: "", description: "" });
        }
    };

    const handleEdit = (id) => {
        const reasonToEdit = reasons.find((reason) => reason.id === id);
        setFormData(reasonToEdit);
        setReasons(reasons.filter((reason) => reason.id !== id));
    };

    const handleDelete = (id) => {
        setReasons(reasons.filter((reason) => reason.id !== id));
    };

    return (
        <div className="admin-why-container">
            <h1>WHY CHOOSE US</h1>
            <form onSubmit={handleSubmit} className="why-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="save-btn">Save</button>
                <button type="submit" className="back-btn">
                    <a href="/admin" className="back-btn">Back</a>
                </button>
            </form>

            <div className="reasons-list">
                {reasons.map((reason) => (
                    <div key={reason.id} className="reason-card">
                        <h2>{reason.title}</h2>
                        <p>{reason.description}</p>
                        <div className="button-group">
                            <button className="edit-btn" onClick={() => handleEdit(reason.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(reason.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
