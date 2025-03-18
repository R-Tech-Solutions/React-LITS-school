import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cadmin.css';
import { backEndURL } from "../../Backendurl";
import CourseAdmin from './CourseAdmin';
import SubcourseAdmin from './SubcourseAdmin';

const AdminPanel = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    return (
        <div className="admin-panel">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
            {/* Course Admin Form */}
            <CourseAdmin fetchCourses={fetchCourses} />

            {/* Sub Course Admin Form */}
            <SubcourseAdmin fetchCourses={fetchCourses} />
        </div>
    );
};

export default AdminPanel;
