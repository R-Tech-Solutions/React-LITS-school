import React, { useState } from "react";
import "./AdminVisionMission.css";

const AdminVisionMission = () => {
    const [formData, setFormData] = useState({
        visionTitle: "",
        visionText: "",
        missionTitle: "",
        missionText: "",
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
        setFormData({ visionTitle: "", visionText: "", missionTitle: "", missionText: "" });
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
            <h2 className="section-title">VISION</h2>
                <input
                    type="text"
                    name="visionTitle"
                    value={formData.visionTitle}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="input-field"
                    required
                />
                <textarea
                    name="visionText"
                    value={formData.visionText}
                    onChange={handleInputChange}
                    placeholder="Type Your Vision"
                    className="textarea-field"
                    required
                ></textarea>
                <h2 className="section-title">MISSION</h2>
                <input
                    type="text"
                    name="missionTitle"
                    value={formData.missionTitle}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="input-field"
                    required
                />
                <textarea
                    name="missionText"
                    value={formData.missionText}
                    onChange={handleInputChange}
                    placeholder="Type Your Mission"
                    className="textarea-field"
                    required
                ></textarea>
                <button type="submit" className="save-btn">
                    {editingIndex !== null ? "Update" : "Save"}
                </button>

                <button type="submit" className="back-btn">
                <a href="/admin" className="back-btn">Back</a>
                </button>
            </form>

            <div className="display-container">
                {data.map((item, index) => (
                    <div key={index} className="card">
                        <p><strong>{item.visionTitle}</strong></p>
                        <p>{item.visionText}</p>
                        <p><strong>{item.missionTitle}</strong></p>
                        <p>{item.missionText}</p>
                        <div className="card-buttons">
                            <button onClick={() => handleEdit(index)} className="edit-btn">EDIT</button>
                            <button onClick={() => handleDelete(index)} className="delete-btn">DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminVisionMission;
