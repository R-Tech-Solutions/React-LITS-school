import React from 'react';
import { Link } from 'react-router-dom';
import Chinese from '../Assets/images/Chinese.jpg';

const courses = [
    { id: 'japanese', imgSrc: Chinese, title: 'Japanese Language', description: 'Learn Japanese with expert teachers.' },
    { id: 'chinese', imgSrc: Chinese, title: 'Chinese Language', description: 'Learn Chinese with expert teachers.' },
    { id: 'french', imgSrc: Chinese, title: 'French Language', description: 'Learn French with expert teachers.' },
    { id: 'korean', imgSrc: Chinese, title: 'Korean Language', description: 'Learn Japanese with expert teachers.' },
    { id: 'russian', imgSrc: Chinese, title: 'Russian  Language', description: 'Learn Chinese with expert teachers.' },
    { id: 'italian', imgSrc: Chinese, title: 'Italian Language', description: 'Learn French with expert teachers.' },
    { id: 'german', imgSrc: Chinese, title: 'German Language', description: 'Learn Japanese with expert teachers.' },
    { id: 'hindi', imgSrc: Chinese, title: 'Hindi Language', description: 'Learn Chinese with expert teachers.' },
    { id: 'english', imgSrc: Chinese, title: 'English Language', description: 'Learn French with expert teachers.' },
    { id: 'arabic', imgSrc: Chinese, title: 'Arabic Language', description: 'Learn French with expert teachers.' },
];

const Course = () => {
    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <div className="course-box">
                {courses.map((course) => (
                    <div className="courses" key={course.id}>
                        <div className="details">
                            <h3>{course.title}</h3>
                            <img src={course.imgSrc} alt={course.title} />
                            <p>{course.description}</p>
                            <div className="btn">
                                <Link className="get" to={`/subcourse/${course.id}`}>View Course</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Course;
