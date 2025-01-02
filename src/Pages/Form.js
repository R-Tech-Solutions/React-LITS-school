import React, { useState } from 'react';
import './formstyle.css';
import Swal from 'sweetalert2';
import logo from '../Assets/images/logo1.png';

const Form = () => {
  const [classSelect, setClassSelect] = useState('');
  const [sectionSelect, setSectionSelect] = useState('');
  const [formData, setFormData] = useState({});

  const handleClassChange = (event) => {
    setClassSelect(event.target.value);
    setSectionSelect(''); // Reset section on class change
  };

  const handleSectionChange = (event) => {
    setSectionSelect(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Display success alert
    Swal.fire({
      icon: 'success',
      title: 'Form Submitted',
      text: 'Your admission form has been submitted successfully!',
      confirmButtonText: 'OK',
    });

    // Clear form data after submission
    setFormData({});
    setClassSelect('');
    setSectionSelect('');
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "All your input data will be cleared!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear form data
        setFormData({});
        setClassSelect('');
        setSectionSelect('');

        Swal.fire({
          icon: 'success',
          title: 'Form Reset',
          text: 'Your form has been cleared.',
          confirmButtonText: 'OK',
        });
      }
    });
  };

  const sections = {
    Japanese: ["Japanese"],
    French: ["French"],
    Chinese: ["Chinese"],
    Korean: ["Korean"],
    Hindi: ["Hindi"],
    English: ["English"],
    Russian: ["Russian"],
    Italy: ["Italy"],
    Arabic: ["Arabic"],
    German: ["German"],
  };

  return (
    <section className="admission-section" id="form-section">
      <h1 className="title">Make An Admission</h1>
      <form id="admissionForm" className="form-container" onSubmit={handleSubmit}>
        {/* Academic Details */}
        <div className="form-group">
          <h2>Academic Details</h2>
          <div className="form-inputs">
            <div>
              <label>School Name*</label>
              <input
                type="text"
                name="schoolName"
                value="Language Infinity Training School"
                readOnly
              />
            </div>
            <div>
              <label>Class*</label>
              <select
                name="class"
                id="classSelect"
                value={classSelect}
                onChange={(e) => {
                  handleClassChange(e);
                  handleInputChange(e);
                }}
              >
                <option value="">Select</option>
                {Object.keys(sections).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Section*</label>
              <select
                name="section"
                id="sectionSelect"
                value={sectionSelect}
                onChange={(e) => {
                  handleSectionChange(e);
                  handleInputChange(e);
                }}
              >
                <option value="">Select</option>
                {sections[classSelect] &&
                  sections[classSelect].map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Student Details */}
        <div className="form-group">
          <h2>Student Details</h2>
          <div className="form-inputs">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName || ''}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={formData.lastName || ''}
              onChange={handleInputChange}
              required
            />
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender*</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="date"
              name="dob"
              value={formData.dob || ''}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Student Mobile Number*"
              value={formData.mobile || ''}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
            <textarea
              name="address"
              placeholder="Permanent Address*"
              value={formData.address || ''}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </div>

        {/* Guardian Details */}
        <div className="form-group">
          <h2>Guardian Details</h2>
          <div className="form-inputs">
            <select
              name="guardianRelation"
              value={formData.guardianRelation || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Relation*</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="guardian">Guardian</option>
            </select>
            <input
              type="text"
              name="guardianName"
              placeholder="Guardian Name*"
              value={formData.guardianName || ''}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="guardianMobile"
              placeholder="Guardian Number*"
              value={formData.guardianMobile || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          <button type="button" className="reset-button" onClick={handleReset}>
            Clear
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
