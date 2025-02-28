import React from 'react';
import Chinese from '../Assets/images/Chinese.jpg';

const Course = () => {
    // List of courses
    const courses = [
        {
            imgSrc: Chinese,
            title: 'Japanese Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'Chinese Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'French Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'Korean Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'Russian Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'Italian Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'German Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'Hindi Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'English Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

        },
        {
            imgSrc: Chinese,
            title: 'Arabic Language',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam congue pretium felis, at aliquam ex eleifend ut. Aliquam erat volutpat. Donec sit amet dolor ex. Proin accumsan eros nunc, vel condimentum odio accumsan a. Ut ipsum velit, feugiat elementum fringilla ut, fringilla quis tortor. Fusce vehicula eros sit amet lorem aliquam consectetur. Praesent non risus id metus mollis dignissim vitae et dolor. Quisque et eros et odio dictum accumsan. Ut nec eleifend ex, in iaculis urna. Praesent placerat consectetur nisl, sed eleifend justo convallis eu.',

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
                            <div className="btn">
                                <a className="get" href="/subcourse">View Course</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        


    );
};

export default Course;
