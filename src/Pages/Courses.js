import React from 'react';
import Chinese from '../Assets/images/Chinese.jpg';

const Course = () => {
    // List of courses
    const courses = [
        {
            imgSrc: Chinese,
            title: 'Japanese Language',
            description: 'Learn the Japanese language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'Chinese Language',
            description: 'Learn the Chinese Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'French Language',
            description: 'Learn the French Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'Korean Language',
            description: 'Learn the Korean Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'Russian Language',
            description: 'Learn the Russian Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'Italian Language',
            description: 'Learn the Italian Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'German Language',
            description: 'Learn the German Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'Hindi Language',
            description: 'Learn the Hindi Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'English Language',
            description: 'Learn the English language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
        {
            imgSrc: Chinese,
            title: 'Arabic Language',
            description: 'Learn the Arabic Language with practical modules.',
            entry: 'Anyone',
            commencement: 'March 2025',
            structure: 'English',
            stratdate: 'March 2025',
        },
    ];

    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <div className="course-box">
                {courses.map((course, index) => (
                    <div className="courses" key={index}>
                        
                        <div className="details">
                        
                            <h3>{course.title}</h3>
                            <img src={course.imgSrc} alt={course.title} />
                            <p>{course.description}</p>
                            <h5>Entry Requirements</h5>
                            <h6>{course.entry}</h6>
                            <h5>Commencement</h5>
                            <h6>{course.commencement}</h6>
                            <h5>Course Structure and Modules</h5>
                            <h6>{course.structure}</h6>
                            <h5>Start Date</h5>
                            <h6>{course.stratdate}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Course;
