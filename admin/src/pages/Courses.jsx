import React, { useState, useRef } from 'react';
import '../styles/courses.css';
import SubcourseAdmin from './SubcourseAdmin';

const Courses = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [courses, setCourses] = useState([]);
  const formRef = useRef(null);
  const subCourseRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourseId !== null) {
      setCourses((prevCourses) =>
        prevCourses.map((course, index) =>
          index === selectedCourseId ? { ...formData } : course
        )
      );
    } else {
      setCourses((prevCourses) => [...prevCourses, formData]);
    }
    setFormData({ title: '', description: '', image: '' });
    setImagePreview('');
    setSelectedCourseId(null);
  };

  const handleUpdateClick = (index) => {
    setFormData(courses[index]);
    setImagePreview(courses[index].image || '');
    setSelectedCourseId(index);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    setCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
  };

  const scrollToSubCourse = () => {
    subCourseRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="course-admin" id='addcourse'>
      <div className='title-section'>
        <h1>{selectedCourseId !== null ? 'Edit Course' : 'Add Course'}</h1>
        <button className='subcourse' onClick={scrollToSubCourse}>
          <span className='sub-btn'>Add Subcourse</span>
        </button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="course-form">
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
        <input type="file" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        <button type="submit">
          {selectedCourseId !== null ? 'Update Course' : 'Add Course'}
        </button>
      </form>
      
      <h2>Courses</h2>
      <div className='course-list'>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              {course.image && <img src={course.image} alt={course.title} className="image-preview" />}
              <div className='button-container'>
                <button className='edit-button' onClick={() => handleUpdateClick(index)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* SubcourseAdmin Section */}
      <div ref={subCourseRef} id='subcourse'>
        <SubcourseAdmin />
      </div>
    </div>
  );
};

export default Courses;
