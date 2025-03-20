import React, { useState, useEffect } from "react";
import "../styles/vision-mission.css";
import axios from "axios";
import { backEndURL } from "../Backendurl";

const AdminVisionMission = () => {
    const [formData, setFormData] = useState({
        visionTitle: "",
        visionText: "",
        missionTitle: "",
        missionText: "",
    });
    const [data, setData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${backEndURL}/api/vision-mission`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (editingIndex !== null) {
                const id = data[editingIndex]._id;
                await axios.put(`${backEndURL}/api/vision-mission/${id}`, formData);
                const updatedData = [...data];
                updatedData[editingIndex] = formData;
                setData(updatedData);
                setEditingIndex(null);
            } else {
                if (data.length >= 1) {
                    setError("Only one record is allowed. Please delete the existing record before adding a new one.");
                    return;
                }
                const response = await axios.post(`${backEndURL}/api/vision-mission`, formData);
                setData([...data, response.data.data]);
            }
            setFormData({ visionTitle: "", visionText: "", missionTitle: "", missionText: "" });
        } catch (error) {
            console.error("Error saving data", error);
        }
    };

    const handleEdit = (index) => {
        setFormData(data[index]);
        setEditingIndex(index);
    };

    const handleDelete = async (index) => {
        try {
            const id = data[index]._id;
            await axios.delete(`${backEndURL}/api/vision-mission/${id}`);
            const updatedData = data.filter((_, i) => i !== index);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting data", error);
        }
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
                />
                <textarea
                    name="missionText"
                    value={formData.missionText}
                    onChange={handleInputChange}
                    placeholder="Type Your Mission"
                    className="textarea-field"
                    required
                ></textarea>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="save-btn">
                    {editingIndex !== null ? "Update" : "Save"}
                </button>
                <button type="button" className="back-btn">
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
