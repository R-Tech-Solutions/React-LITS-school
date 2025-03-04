import React, { useState } from 'react';
import axios from 'axios';
import './Cadmin.css';
import { backEndURL } from "../Backendurl";

const CourseAdmin = ({ fetchCourses }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${backEndURL}/api/courses`, formData);
            fetchCourses();
        } catch (error) {
            setErrorMessage('Error submitting course. Please try again.');
            console.error('Error submitting course:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="course-admin">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit} className="course-form">
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Course Title"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Course Description"
                    required
                />
                <input type="file" onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Course'}
                </button>
            </form>
        </div>
    );
};

export default CourseAdmin;
