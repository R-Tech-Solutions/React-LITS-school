import React, { useState, useRef } from 'react';
import '../styles/courses.css';
import { toast } from 'react-toastify';

const SubcourseAdmin = () => {
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

    const [courseTitles] = useState([
        { _id: 1, title: 'Web Development' },
        { _id: 2, title: 'Data Science' },
        { _id: 3, title: 'Cyber Security' }
    ]);

    const [subCourses, setSubCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubCourseData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if (subCourseData._id) {
                setSubCourses(prevCourses => prevCourses.map(course => 
                    course._id === subCourseData._id ? subCourseData : course
                ));
                toast.success('Sub-course updated successfully!');
            } else {
                setSubCourses(prevCourses => [...prevCourses, { ...subCourseData, _id: Date.now() }]);
                toast.success('Sub-course added successfully!');
            }

            setSubCourseData({
                title: '', category: '', description: '', entry: '', payment: '', 
                structure: '', startDate: '', duration: '', time: '', lecturer: ''
            });
            setLoading(false);
        }, 1000);
    };

    // Handle edit click
    const handleEditClick = (course) => {
        setSubCourseData(course);
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle delete click
    const handleDeleteClick = (id) => {
        setSubCourses(prevCourses => prevCourses.filter(course => course._id !== id));
        toast.success('Sub-course deleted successfully!');
    };

    return (
        <div className="subcourse-admin">
            <h1>{subCourseData._id ? 'Edit Sub Course' : 'Add Sub Course'}</h1>
            <form onSubmit={handleSubmit} className="course-form" ref={formRef}>
                <select name="title" value={subCourseData.title} onChange={handleInputChange} required>
                    <option value="" disabled>Select a Course</option>
                    {courseTitles.map((course) => (
                        <option key={course._id} value={course.title}>{course.title}</option>
                    ))}
                </select>
                <input name="category" value={subCourseData.category} onChange={handleInputChange} placeholder="Course Category" required />
                <textarea name="description" value={subCourseData.description} onChange={handleInputChange} placeholder="Course Description" required />
                <input name="entry" value={subCourseData.entry} onChange={handleInputChange} placeholder="Entry Requirements" required />
                <input name="payment" value={subCourseData.payment} onChange={handleInputChange} placeholder="Payments" required />
                <input name="structure" value={subCourseData.structure} onChange={handleInputChange} placeholder="Course Structure" required />
                <input type="date" name="startDate" value={subCourseData.startDate} onChange={handleInputChange} required />
                <input name="duration" value={subCourseData.duration} onChange={handleInputChange} placeholder="Course Duration" required />
                <input name="time" value={subCourseData.time} onChange={handleInputChange} placeholder="Course Time" required />
                <input name="lecturer" value={subCourseData.lecturer} onChange={handleInputChange} placeholder="Lecturer's Name" required />
                <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Sub Course'}</button>
            </form>

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
                            <div className='button-container'>
                                <button className='edit-button' onClick={() => handleEditClick(course)}>Edit</button>
                                <button className='delete-button' onClick={() => handleDeleteClick(course._id)}>Delete</button>
                            </div>
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
