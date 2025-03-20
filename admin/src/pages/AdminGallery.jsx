import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../styles/admingallery.css";

export default function AdminGallery() {
    const [gallery, setGallery] = useState([]);
    const [newCategory, setNewCategory] = useState({
        title: "",
        description: "",
        thumbnail: "",
        mainVideo: "",
        subImages: [],
        subVideos: []
    });
    const [preview, setPreview] = useState({
        thumbnail: "",
        mainVideo: "",
        subImages: [],
        subVideos: []
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Fetch gallery data from backend
        axios.get("http://localhost:3001/api/gallery")
            .then(response => setGallery(response.data))
            .catch(error => console.error("Error fetching gallery data:", error));
    }, []);

    const handleFileUpload = (e, type) => {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCategory((prev) => {
                    if (type === "thumbnail") return { ...prev, thumbnail: reader.result };
                    if (type === "mainVideo") return { ...prev, mainVideo: reader.result };
                    if (type === "subImages") return { ...prev, subImages: [...prev.subImages, reader.result] };
                    if (type === "subVideos") return { ...prev, subVideos: [...prev.subVideos, reader.result] };
                    return prev;
                });
                setPreview((prev) => {
                    if (type === "thumbnail") return { ...prev, thumbnail: reader.result };
                    if (type === "mainVideo") return { ...prev, mainVideo: reader.result };
                    if (type === "subImages") return { ...prev, subImages: [...prev.subImages, reader.result] };
                    if (type === "subVideos") return { ...prev, subVideos: [...prev.subVideos, reader.result] };
                    return prev;
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const addOrUpdateCategory = (e) => {
        e.preventDefault();
        const url = selectedCategoryId !== null ? `http://localhost:3001/api/gallery/${selectedCategoryId}` : "http://localhost:3001/api/gallery";
        const method = selectedCategoryId !== null ? "put" : "post";

        axios[method](url, newCategory)
            .then(response => {
                if (selectedCategoryId !== null) {
                    setGallery(gallery.map((category, index) => (index === selectedCategoryId ? response.data : category)));
                } else {
                    setGallery([...gallery, response.data]);
                }
                resetForm();
            })
            .catch(error => console.error("Error saving gallery data:", error));
    };

    const resetForm = () => {
        setNewCategory({ title: "", description: "", thumbnail: "", mainVideo: "", subImages: [], subVideos: [] });
        setPreview({ thumbnail: "", mainVideo: "", subImages: [], subVideos: [] });
        setSelectedCategoryId(null);
    };

    const editCategory = (index) => {
        setNewCategory(gallery[index]);
        setPreview({
            thumbnail: gallery[index].thumbnail,
            mainVideo: gallery[index].mainVideo,
            subImages: gallery[index].subImages,
            subVideos: gallery[index].subVideos,
        });
        setSelectedCategoryId(index);
        formRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const deleteCategory = (index) => {
        const categoryId = gallery[index]._id;
        axios.delete(`http://localhost:3001/api/gallery/${categoryId}`)
            .then(() => {
                setGallery(gallery.filter((_, i) => i !== index));
            })
            .catch(error => console.error("Error deleting gallery data:", error));
    };

    return (
        <div className="admin-gallery-container">
            <h1>Admin Panel - Manage Gallery</h1>

            <form ref={formRef} onSubmit={addOrUpdateCategory} className="image-video-form">
                <input type="text" placeholder="Category Title" value={newCategory.title} onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })} />
                <textarea className="description" placeholder="Description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                
                <label>Upload Thumbnail Image:</label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "thumbnail")} />
                {preview.thumbnail && <img src={preview.thumbnail} alt="Thumbnail Preview" className="image-preview" />}

                <label>Upload Main Video (Optional):</label>
                <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "mainVideo")} />
                {preview.mainVideo && <video src={preview.mainVideo} controls className="video-preview" />}

                <label>Upload Additional Images:</label>
                <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload(e, "subImages")} />
                <div className="sub-images">
                    {preview.subImages.map((img, idx) => (
                        <img key={idx} src={img} alt={`Sub ${idx}`} className="sub-image-preview" />
                    ))}
                </div>

                <label>Upload Additional Videos:</label>
                <input type="file" accept="video/*" multiple onChange={(e) => handleFileUpload(e, "subVideos")} />
                <div className="sub-videos">
                    {preview.subVideos.map((vid, idx) => (
                        <video key={idx} src={vid} controls className="sub-video-preview" />
                    ))}
                </div>

                <button type="submit" className="image-video-form-button">
                    {selectedCategoryId !== null ? "Update Images & Videos" : "Add Images & Videos"}
                </button>
            </form>

            <div className="gallery-preview">
                {gallery.map((category, index) => (
                    <div key={index} className="category-card">
                        <h2>{category.title}</h2>
                        <p>{category.description}</p>
                        {category.thumbnail && <img src={category.thumbnail} alt="Category Thumbnail" className="image-preview" />}
                        {category.mainVideo && <video src={category.mainVideo} controls className="video-preview" />}
                        <div className="sub-images">
                            {category.subImages.map((img, idx) => (
                                <img key={idx} src={img} alt={`Sub ${idx}`} className="sub-image-preview" />
                            ))}
                        </div>
                        <div className="sub-videos">
                            {category.subVideos.map((vid, idx) => (
                                <video key={idx} src={vid} controls className="sub-video-preview" />
                            ))}
                        </div>
                        <div className="button-container">
                            <button className="edit-button" onClick={() => editCategory(index)}>Edit</button>
                            <button className="delete-button" onClick={() => deleteCategory(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
