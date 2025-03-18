import React, { useState } from "react";
import ImageVideo from "./ImageVideo"; // Import the ImageVideo component
import "../styles/admingallery.css";

export default function AdminGallery() {
    const [gallery, setGallery] = useState([]);
    const [newCategory, setNewCategory] = useState({
        title: "",
        description: "",
        thumbnail: "",
        items: [],
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCategory({ ...newCategory, thumbnail: reader.result });
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewVideo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addCategory = () => {
        setGallery([...gallery, newCategory]);
        setNewCategory({ title: "", description: "", thumbnail: "", items: [] });
        setPreviewImage(null);
        setPreviewVideo(null);
    };

    return (
        <div className="admin-gallery-container">
            <h1>Admin Panel - Manage Gallery</h1>

            <div className="upload-section">
                <input
                    type="text"
                    placeholder="Category Title"
                    value={newCategory.title}
                    onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />

                <button onClick={addCategory}>Add Category</button>
            </div>
            {/* Use the ImageVideo component here */}
           
            

            {/* Display Categories */}
            <div className="gallery-preview">
                {gallery.map((category, index) => (
                    <div key={index} className="category-card">
                        <h2>{category.title}</h2>
                        <p>{category.description}</p>
                        {category.thumbnail && <img src={category.thumbnail} alt="Category Thumbnail" />}
                    </div>
                ))}
            </div>

            <ImageVideo handleImageUpload={handleImageUpload} handleVideoUpload={handleVideoUpload} />
        </div>
    );
}
