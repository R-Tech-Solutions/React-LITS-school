import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cadmin.css';
import { backEndURL } from "../Backendurl";
import { toast } from 'react-toastify';

const SubcourseAdmin = ({ fetchCourses }) => {
    const [subCourseData, setSubCourseData] = useState({
        title: '',
        category: '',
        description: '',
        entry: '',
        payment: '',
        structure: '',
        startDate: '',
        duration: '',
        time: '',
        lecturer: '',
    });

    const [courseTitles, setCourseTitles] = useState([]);
    const [subCourses, setSubCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch course titles
    useEffect(() => {
        const fetchCourseTitles = async () => {
            try {
                const response = await axios.get(`${backEndURL}/api/courses/titles`);
                setCourseTitles(response.data);
            } catch (error) {
                console.error("Error fetching course titles:", error);
            }
        };

        fetchCourseTitles();
        fetchSubCourses();
    }, []);

    // Fetch subcourses
    const fetchSubCourses = async () => {
        try {
            const response = await axios.get(`${backEndURL}/api/subcourses`);
            setSubCourses(response.data);
        } catch (error) {
            console.error("Error fetching subcourses:", error);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubCourseData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (subCourseData._id) {
                // Update existing sub-course
                await axios.put(`${backEndURL}/api/subcourses/update/${subCourseData._id}`, subCourseData);
                toast.success('Sub-course updated successfully!');
            } else {
                // Add new sub-course
                await axios.post(`${backEndURL}/api/subcourses/add`, subCourseData);
                toast.success('Sub-course added successfully!');
            }

            fetchSubCourses();
            setErrorMessage('');
            setSubCourseData({
                title: '',
                category: '',
                description: '',
                entry: '',
                payment: '',
                structure: '',
                startDate: '',
                duration: '',
                time: '',
                lecturer: '',
            });
        } catch (error) {
            setErrorMessage('Error submitting sub-course. Please try again.');
            console.error('Error submitting sub-course:', error);
            toast.error('Error submitting sub-course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle edit click
    const handleEditClick = (course) => {
        setSubCourseData(course);// Preview the selected course's image
    };

    // Handle delete click
    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`${backEndURL}/api/subcourses/delete/${id}`);
            toast.success('Sub-course deleted successfully!');
            fetchSubCourses(); // Refresh the list after deletion
        } catch (error) {
            toast.error('Error deleting sub-course. Please try again.');
            console.error('Error deleting sub-course:', error);
        }
    };

    return (
        <div className="subcourse-admin">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h1>{subCourseData._id ? 'Edit Sub Course' : 'Add Sub Course'}</h1>
            <form onSubmit={handleSubmit} className="course-form">
                {/* Select Course Title */}
                <select 
                    name="title" 
                    value={subCourseData.title} 
                    onChange={handleInputChange} 
                    required
                >
                    <option value="" disabled>Select a Course</option>
                    {courseTitles.map((course) => (
                        <option key={course._id} value={course.title}>
                            {course.title}
                        </option>
                    ))}
                </select>

                {/* Course Category */}
                <input
                    name="category"
                    value={subCourseData.category}
                    onChange={handleInputChange}
                    placeholder="Course Category"
                    required
                />

                {/* Course Description */}
                <textarea
                    name="description"
                    value={subCourseData.description}
                    onChange={handleInputChange}
                    placeholder="Course Description"
                    required
                />

                {/* Entry Requirements */}
                <input
                    name="entry"
                    value={subCourseData.entry}
                    onChange={handleInputChange}
                    placeholder="Entry Requirements"
                    required
                />

                {/* Payment */}
                <input
                    name="payment"
                    value={subCourseData.payment}
                    onChange={handleInputChange}
                    placeholder="Payments (e.g. Full Payment - 32000/= (Monthly Payment - 8000/=))"
                    required
                />

                {/* Course Structure */}
                <input
                    name="structure"
                    value={subCourseData.structure}
                    onChange={handleInputChange}
                    placeholder="Course Structure"
                    required
                />

                {/* Start Date */}
                <input
                    type="date"
                    name="startDate"
                    value={subCourseData.startDate}
                    onChange={handleInputChange}
                    required
                />

                {/* Course Duration */}
                <input
                    name="duration"
                    value={subCourseData.duration}
                    onChange={handleInputChange}
                    placeholder="Course Duration (e.g. 6 months)"
                    required
                />

                {/* Course Time */}
                <input
                    name="time"
                    value={subCourseData.time}
                    onChange={handleInputChange}
                    placeholder="Course Time (e.g. 10:00 AM - 12:00 PM)"
                    required
                />

                {/* Lecturer Name */}
                <input
                    name="lecturer"
                    value={subCourseData.lecturer}
                    onChange={handleInputChange}
                    placeholder="Lecturer's Name"
                    required
                />

                {/* Submit Button */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Sub Course'}
                </button>
            </form>

            {/* Displaying Sub Courses in Card Format */}
            <h2>Available Sub Courses</h2>
            <div className="subcourse-list">
                {subCourses.length > 0 ? (
                    subCourses.map((course) => (
                        <div key={course._id} className="subcourse-card">
                            
                            <h3>{course.title}</h3>
                            <p><strong>Category:</strong> {course.category}</p>
                            <p><strong>Description:</strong> {course.description}</p>
                            <p><strong>Entry:</strong> {course.entry}</p>
                            <p><strong>Payment:</strong> {course.payment}</p>
                            <p><strong>Structure:</strong> {course.structure}</p>
                            <p><strong>Start Date:</strong> {course.startDate}</p>
                            <p><strong>Duration:</strong> {course.duration}</p>
                            <p><strong>Time:</strong> {course.time}</p>
                            <p><strong>Lecturer:</strong> {course.lecturer}</p>
                            <button onClick={() => handleEditClick(course)}>Edit</button>
                            <button onClick={() => handleDeleteClick(course._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No sub-courses available.</p>
                )}
            </div>
        </div>
    );
};

export default SubcourseAdmin;
