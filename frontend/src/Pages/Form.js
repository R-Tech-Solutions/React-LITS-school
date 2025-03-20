import React, { useState, useEffect } from 'react';
import './formstyle.css';
import Swal from 'sweetalert2';
import { backEndURL } from "../Backendurl";

const Form = () => {
  const [classValue, setClassValue] = useState("");
  const [sectionValue, setSectionValue] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setClassValue(params.get("class") || "");
    setSectionValue(params.get("section") || "");
  }, []);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show loading alert
    Swal.fire({
      title: 'Submitting...',
      text: 'Please wait while we submit your form.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Construct form data object
    const submissionData = {
      ...formData,
      classValue,
      sectionValue,
      gender: formData.gender,
      dob: formData.dob,
    };

    try {
      const response = await fetch(`${backEndURL}/api/mail/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success alert
        Swal.fire({
          icon: 'success',
          title: 'Form Submitted',
          text: result.message,
          confirmButtonText: 'OK',
        });

        // Clear form
        setFormData({});
        setClassValue("");
        setSectionValue("");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an issue submitting your form. Please try again.',
        confirmButtonText: 'OK',
      });
    }
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

        Swal.fire({
          icon: 'success',
          title: 'Form Reset',
          text: 'Your form has been cleared.',
          confirmButtonText: 'OK',
        });
      }
    });
  };




  return (
    <section className="admission-section" id="form-section">
      <div className="container">
        <h1 className="title">Make An Admission</h1>
        <div className="back-to-courses">
          <a href="/" className="back-btn">Back</a>
        </div>

      </div>


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
              <label>Class</label>
              <select value={classValue} onChange={(e) => setClassValue(e.target.value)}>
                <option value={classValue}>{classValue}</option>
                {/* Other options */}
              </select>

              <label>Section</label>
              <select value={sectionValue} onChange={(e) => setSectionValue(e.target.value)}>
                <option value={sectionValue}>{sectionValue}</option>
                {/* Other options */}
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
