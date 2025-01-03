// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [lecturers, setLecturers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        image: "",
    });
    const [loading, setLoading] = useState(true);

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
        try {
            await axios.post("http://localhost:3001/api/lecturers", formData);
            fetchLecturers();
            setFormData({ name: "", subject: "", image: "" });
        } catch (error) {
            console.error("Error adding lecturer:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/lecturers/${id}`);
            fetchLecturers();
        } catch (error) {
            console.error("Error deleting lecturer:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="admin-panel" style={{ padding: "20px" }}>
            <h1>Admin Panel</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Subject:
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image:
                        <input type="file" accept="image/*" onChange={handleImageChange} required />
                    </label>
                </div>
                <button type="submit" style={{ marginTop: "10px" }}>Add Lecturer</button>
            </form>

            <div className="lecturers-list">
                <h2>Lecturers</h2>
                {lecturers.map((lecturer) => (
                    <div
                        key={lecturer._id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={lecturer.image}
                                alt={lecturer.name}
                                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                            />
                            <div>
                                <h4>{lecturer.name}</h4>
                                <p>{lecturer.subject}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(lecturer._id)}
                            style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px" }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
