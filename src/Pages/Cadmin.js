import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                await axios.put(`http://localhost:3001/api/courses/${editingCourse}`, formData);
            } else {
                await axios.post('http://localhost:3001/api/courses', formData);
            }
            fetchCourses();
            setFormData({ title: '', description: '', entry: '', commencement: '', structure: '', startDate: '', image: '' });
            setEditingCourse(null);
        } catch (error) {
            console.error("Error submitting course:", error);
        }
    };

    const handleEdit = (course) => {
        setFormData(course);
        setEditingCourse(course._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/courses/${id}`);
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
                <input name="entry" value={formData.entry} onChange={handleInputChange} placeholder="Entry Requirements" required />
                <input name="commencement" value={formData.commencement} onChange={handleInputChange} placeholder="Commencement" required />
                <input name="structure" value={formData.structure} onChange={handleInputChange} placeholder="Structure" required />
                <input name="startDate" value={formData.startDate} onChange={handleInputChange} placeholder="Start Date" required />
                <input type="file" onChange={handleImageChange} />
                <button type="submit">{editingCourse ? 'Update' : 'Add'}</button>
            </form>

            <h2>Courses</h2>
            <div>
                {courses.map((course) => (
                    <div key={course._id}>
                        <h3>{course.title}</h3>
                        <img src={course.image} alt={course.title} style={{ width: '100px' }} />
                        <p>{course.description}</p>
                        <button onClick={() => handleEdit(course)}>Edit</button>
                        <button onClick={() => handleDelete(course._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
