import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cadmin.css';

const AdminPanel = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        entry: '',
        commencement: '',
        structure: '',
        startDate: '',
        image: '',
    });
    const [editingCourse, setEditingCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/courses');
            setCourses(response.data);
        } catch (error) {
            setErrorMessage('Error fetching courses. Please try again.');
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const { title, description, entry, commencement, structure, startDate } = formData;
        if (!title || !description || !entry || !commencement || !structure || !startDate) {
            return 'All fields are required.';
        }
        if (isNaN(Number(commencement)) || Number(commencement) < 0) {
            return 'Price must be a valid positive number.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            setErrorMessage(validationMessage);
            return;
        }

        setLoading(true);
        try {
            if (editingCourse) {
                await axios.put(`http://localhost:3001/api/courses/${editingCourse}`, formData);
            } else {
                await axios.post('http://localhost:3001/api/courses', formData);
            }
            fetchCourses();
            setFormData({
                title: '',
                description: '',
                entry: '',
                commencement: '',
                structure: '',
                startDate: '',
                image: '',
            });
            setImagePreview('');
            setEditingCourse(null);
        } catch (error) {
            setErrorMessage('Error submitting course. Please try again.');
            console.error('Error submitting course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (course) => {
        setFormData(course);
        setImagePreview(course.image);
        setEditingCourse(course._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:3001/api/courses/${id}`);
                fetchCourses();
            } catch (error) {
                setErrorMessage('Error deleting course. Please try again.');
                console.error('Error deleting course:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-panel" id="courseadd">
            <h1>Add Courses</h1>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

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
                <input
                    name="entry"
                    value={formData.entry}
                    onChange={handleInputChange}
                    placeholder="Entry Requirements"
                    required
                />
                <input
                    name="commencement"
                    value={formData.commencement}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                />
                <input
                    name="structure"
                    value={formData.structure}
                    onChange={handleInputChange}
                    placeholder="Structure"
                    required
                />
                <input
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    placeholder="Start Date"
                    required
                />
                <input type="file" onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Submitting...' : editingCourse ? 'Update Course' : 'Add Course'}
                </button>
            </form>

            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for courses..."
                />
            </div>

            <h2>Courses List</h2>
            <div className="courses-list">
                {loading ? (
                    <p>Loading...</p>
                ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div key={course._id} className="course-item">
                            <h3>{course.title}</h3>
                            <img src={course.image} alt={course.title} className="course-image" />
                            <p>{course.description}</p>
                            <div className="actions">
                                <button onClick={() => handleEdit(course)} className="edit-button">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
