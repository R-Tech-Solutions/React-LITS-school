import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Course = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <div className="course-box">
                {courses.map((course, index) => (
                    <div className="courses" key={index}>
                        <div className="details">
                            <h3>{course.title}</h3>
                            <img src={course.image} alt={course.title} />
                            <p>{course.description}</p>
                            <h5>Entry Requirements</h5>
                            <h6>{course.entry}</h6>
                            <h5>Course Structure and Modules</h5>
                            <h6>{course.structure}</h6>
                            <h5>Start Date</h5>
                            <h6>{course.startDate}</h6>
                            <h5>Prize</h5>
                            <h6>{course.commencement}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Course;
