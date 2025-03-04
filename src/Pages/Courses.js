import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backEndURL } from "../Backendurl";

const Course = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${backEndURL}/api/courses`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <div className="course-box">
                {courses.map((course) => (
                    <div className="courses" key={course._id}>
                        <div className="details">
                            <h3>{course.title}</h3>
                            <img src={course.image} alt={course.title} />
                            <p>{course.description}</p>
                            <div className="btn">
                                <Link className="get" to={`/subcourse/${course.title}`}>View Course</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Course;
