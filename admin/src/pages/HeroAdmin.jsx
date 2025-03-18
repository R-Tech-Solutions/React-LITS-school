import React, { useState } from "react";
import "../styles/heroadmin.css";
import HeroImage from "./HeroImage"

const HeroAdmin = () => {
    const [formData, setFormData] = useState({
        textTitle: "",
        textDetails: "",
    });
    const [data, setData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updatedData = [...data];
            updatedData[editingIndex] = formData;
            setData(updatedData);
            setEditingIndex(null);
        } else {
            setData([...data, formData]);
        }
        setFormData({ textTitle: "", textDetails: "" });
    };

    const handleEdit = (index) => {
        setFormData(data[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    return (
        <div className="admin-container">

            <form onSubmit={handleSubmit} className="form-box">
                <h2 className="section-title">Edit Hero Section</h2>
                <input
                    type="text"
                    name="textTitle"
                    value={formData.textTitle}
                    onChange={handleInputChange}
                    placeholder="Type Your Title"
                    className="input-field"
                    required
                />
                <textarea
                    name="textDetails"
                    value={formData.textDetails}
                    onChange={handleInputChange}
                    placeholder="Type Your Description"
                    className="textarea-field"
                    required
                ></textarea>

                <button type="submit" className="save-btn">
                    {editingIndex !== null ? "Update" : "Save"}
                </button>
            </form>

            <div className="display-container">
                {data.map((item, index) => (
                    <div key={index} className="card">
                        <p><strong>{item.textTitle}</strong></p>
                        <p>{item.textDetails}</p>
                        <div className="card-buttons">
                            <button onClick={() => handleEdit(index)} className="edit-btn">EDIT</button>
                            <button onClick={() => handleDelete(index)} className="delete-btn">DELETE</button>
                        </div>
                    </div>
                ))}
                
            </div>
            <div>
            <HeroImage />
            </div>
           
        </div>
    );
};

export default HeroAdmin;
