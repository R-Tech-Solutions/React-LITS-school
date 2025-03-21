import React, { useState, useEffect } from "react";

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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Hero Text Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Edit Hero Section</h2>
                <input
                    type="text"
                    name="textTitle"
                    value={formData.textTitle}
                    onChange={handleInputChange}
                    placeholder="Type Your Title"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                    }}
                    required
                />
                <textarea
                    name="textDetails"
                    value={formData.textDetails}
                    onChange={handleInputChange}
                    placeholder="Type Your Description"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        minHeight: '100px',
                    }}
                    required
                ></textarea>
                <button type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    {editingId ? "Update" : "Save"}
                </button>
            </form>

            {/* Display Hero Text */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data.map((item) => (
                    <div key={item._id} style={{
                        width: '250px',
                        padding: '15px',
                        margin: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                        <p><strong>{item.textTitle}</strong></p>
                        <p>{item.textDetails}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={() => handleEdit(item._id)} style={{
                                padding: '5px 10px',
                                backgroundColor: '#ffa500',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>EDIT</button>
                            <button onClick={() => handleDelete(item._id)} style={{
                                padding: '5px 10px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Image Upload */}
            <div style={{ marginTop: '30px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Edit Hero Image</h2>
                {imageData.length < 2 && <p style={{ color: 'red' }}>You must have at least 2 images.</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {imageData.map((image) => (
                        <div key={image._id} style={{
                            width: '200px',
                            height: '200px',
                            margin: '10px',
                            position: 'relative',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}>
                            <img src={image.imageData} alt="Hero Section" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button onClick={() => handleImageDelete(image._id)} style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}>❌</button>
                        </div>
                    ))}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: '20px' }}
                    multiple
                />
                <button onClick={handleUpload} style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>Upload</button>
            </div>
        </div>
    );
};

export default HeroAdmin;
