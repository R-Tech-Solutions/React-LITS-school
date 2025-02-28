import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cadmin.css';
import { backEndURL } from "../Backendurl";

const languageCategories = {
    "Japanese Language": ["JLPT", "NAT", "JFT ", "N5", "N4", "O/L", "A/L", "Kids Courses"],
    "Chinese Language": ["Beginners Level Course", "Special Spoken Course", "Kids Courses"],
    "French Language": ["Kids Courses", "Spoken Course", "A/L", "O/L"],
    "Korean Language": ["EPS-TOPIK", "Kids Courses","A/L", "O/L"],
    "Russian Language": ["Kids Courses","A/L", "O/L"],
    "Italian Language": ["Italy Language Course", "Kids Courses"],
    "German Language": ["A1 Level", "A2 Level", "B1 Level", "B2 Level", "Kids Courses"],
    "Hindi Language": ["Beginner", "Intermediate"],
    "English Language": ["Spoken English for Kids", "Spoken English for School Children", "Rapid Course of English for OL","Certificate Course in English-CCE","Advanced Certificate Course in English- ACCE"],
    "Arabic Language": ["Arabic Language Course"],
};

const AdminPanel = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });
    const [subCourseData, setSubCourseData] = useState({
        title: '',
        description: '',
        entry: '',
        payment: '',
        structure: '',
        startDate: '',
        duration: '',
        time: '',
        lecturer: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backEndURL}/api/courses`);
            setCourses(response.data);
        } catch (error) {
            setErrorMessage('Error fetching courses. Please try again.');
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e, setState) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setState((prev) => ({ ...prev, image: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e, formType) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${backEndURL}/api/courses`, formType === 'course' ? formData : subCourseData);
            fetchCourses();
        } catch (error) {
            setErrorMessage('Error submitting course. Please try again.');
            console.error('Error submitting course:', error);
        } finally {
            setLoading(false);
        }
    };

    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        setSelectedCategory(""); 
    };

    return (
        <div className="admin-panel">
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Add Course Form */}
            <h1>Add Course</h1>
            <form onSubmit={(e) => handleSubmit(e, 'course')} className="course-form">
                <input
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    placeholder="Course Title"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e, setFormData)}
                    placeholder="Course Description"
                    required
                />
                <input type="file" onChange={(e) => handleImageChange(e, setFormData)} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Add Course'}</button>
            </form>

            {/* Add Sub Course Form */}
            <h1>Add Sub Course</h1>
            <form onSubmit={(e) => handleSubmit(e, 'subCourse')} className="course-form">
                {/* Select Language */}
                <select name="title" value={selectedLanguage} onChange={handleLanguageChange} required>
                    <option value="" disabled>Select a Language</option>
                    {Object.keys(languageCategories).map((language) => (
                        <option key={language} value={language}>
                            {language}
                        </option>
                    ))}
                </select>

                {/* Select Category (Dependent on Language) */}
                <select name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required disabled={!selectedLanguage}>
                    <option value="" disabled>Select a Category</option>
                    {selectedLanguage &&
                        languageCategories[selectedLanguage].map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                </select>

                <textarea
                    name="description"
                    value={subCourseData.description}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Course Description"
                    required
                />

                <input
                    name="entry"
                    value={subCourseData.entry}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Entry Requirements"
                    required
                />

                <input
                    name="payment"
                    value={subCourseData.payment}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Payments (e.g. Full Payment - 32000/= (Monthly Payment - 8000/=))"
                    required
                />

                <input
                    name="structure"
                    value={subCourseData.structure}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Course Structure"
                    required
                />

                <input
                    name="startDate"
                    value={subCourseData.startDate}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Start Date"
                    required
                />

                <input
                    name="duration"
                    value={subCourseData.duration}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Course Duration (e.g. 6 months)"
                    required
                />

                <input
                    name="time"
                    value={subCourseData.time}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Course Time (e.g. 10:00 AM - 12:00 PM)"
                    required
                />

                <input
                    name="lecturer"
                    value={subCourseData.lecturer}
                    onChange={(e) => handleInputChange(e, setSubCourseData)}
                    placeholder="Lecturer's Name"
                    required
                />



                <input type="file" onChange={(e) => handleImageChange(e, setSubCourseData)} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Add Sub Course'}</button>
            </form>
        </div>
    );
};

export default AdminPanel;
