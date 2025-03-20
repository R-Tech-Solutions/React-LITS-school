import React, { useState, useEffect } from "react";
import "../styles/heroadmin.css";

const API_BASE_URL = "http://localhost:3001/api";

const HeroAdmin = () => {
    const [formData, setFormData] = useState({ textTitle: "", textDetails: "" });
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // State for images
    const [imageData, setImageData] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Fetch all hero text and images
    useEffect(() => {
        fetch(`${API_BASE_URL}/hero-text`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error fetching hero text:", err));

        fetch(`${API_BASE_URL}/hero-image`)
            .then((res) => res.json())
            .then((data) => setImageData(data))
            .catch((err) => console.error("Error fetching images:", err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${API_BASE_URL}/hero-text/${editingId}`
            : `${API_BASE_URL}/hero-text`;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save data");
            const savedData = await response.json();

            if (editingId) {
                setData(data.map((item) => (item._id === editingId ? savedData.data : item)));
                setEditingId(null);
            } else {
                setData([...data, savedData.data]);
            }

            setFormData({ textTitle: "", textDetails: "" });
        } catch (error) {
            console.error("Error saving hero text:", error);
        }
    };

    const handleEdit = (id) => {
        const itemToEdit = data.find((item) => item._id === id);
        setFormData(itemToEdit);
        setEditingId(id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/hero-text/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete data");

            setData(data.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Error deleting hero text:", error);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    // Handle image upload
    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        if (imageData.length + selectedFiles.length > 5) {
            alert("You can only upload a maximum of 5 images.");
            return;
        }

        try {
            const uploadPromises = selectedFiles.map((file) => {
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.onloadend = async () => {
                        try {
                            const response = await fetch(`${API_BASE_URL}/hero-image`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ imageData: reader.result }),
                            });

                            if (!response.ok) throw new Error("Failed to upload image");
                            const uploadedData = await response.json();
                            resolve(uploadedData.data);
                        } catch (error) {
                            reject(error);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setImageData([...imageData, ...uploadedImages]);
            setSelectedFiles([]);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    // Handle image deletion
    const handleImageDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/hero-image/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete image");

            setImageData(imageData.filter((image) => image._id !== id));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="admin-container">
            {/* Hero Text Form */}
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
                    {editingId ? "Update" : "Save"}
                </button>
            </form>

            {/* Display Hero Text */}
            <div className="display-container">
                {data.map((item) => (
                    <div key={item._id} className="card">
                        <p><strong>{item.textTitle}</strong></p>
                        <p>{item.textDetails}</p>
                        <div className="card-buttons">
                            <button onClick={() => handleEdit(item._id)} className="edit-btn">EDIT</button>
                            <button onClick={() => handleDelete(item._id)} className="delete-btn">DELETE</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Image Upload */}
            <div className="image-container">
                <h2 className="section-title">Edit Hero Image</h2>
                {imageData.length < 2 && <p className="error-message">You must have at least 2 images.</p>}
                <div className="image-gallery">
                    {imageData.map((image) => (
                        <div key={image._id} className="image-card">
                            <img src={image.imageData} alt="Hero Section" className="hero-image" />
                            <button onClick={() => handleImageDelete(image._id)} className="delete-icon">❌</button>
                        </div>
                    ))}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" multiple />
                <button onClick={handleUpload} className="upload-btn">Upload</button>
            </div>
        </div>
    );
};

export default HeroAdmin;
