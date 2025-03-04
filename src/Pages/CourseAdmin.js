import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cadmin.css';
import { backEndURL } from "../Backendurl";

const CourseAdmin = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
    });
    const [selectedCourseId, setSelectedCourseId] = useState(null); // Track selected course
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${backEndURL}/api/courses`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

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
            if (selectedCourseId) {
                // Update existing course
                await axios.put(`${backEndURL}/api/courses/update/${selectedCourseId}`, formData);
            } else {
                // Add new course
                await axios.post(`${backEndURL}/api/courses/add`, formData);
            }

            fetchCourses();
            setFormData({ title: '', description: '', image: '' });
            setImagePreview('');
            setSelectedCourseId(null); // Reset selected course
        } catch (error) {
            setErrorMessage('Error submitting course. Please try again.');
            console.error('Error submitting course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = (course) => {
        // Prefill form with selected course data
        setFormData({
            title: course.title,
            description: course.description,
            image: course.image || '',
        });
        setImagePreview(course.image || '');
        setSelectedCourseId(course._id);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${backEndURL}/api/courses/delete/${id}`);
            fetchCourses();
        } catch (error) {
            setErrorMessage('Error deleting course. Please try again.');
            console.error('Error deleting course:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="course-admin">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h1>{selectedCourseId ? 'Edit Course' : 'Add Course'}</h1>
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
                    {loading ? 'Submitting...' : selectedCourseId ? 'Update Course' : 'Add Course'}
                </button>
            </form>
            <h2>Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        {course.image && <img src={course.image} alt={course.title} className="image-preview" />}
                        <button className='edit-button' onClick={() => handleUpdateClick(course)}>Edit</button>
                        <button className='delete-button' onClick={() => handleDelete(course._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseAdmin;
