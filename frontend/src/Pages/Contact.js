import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './ContactUs.css';
import { backEndURL } from "../Backendurl";
import Swal from 'sweetalert2';

export default function ContactPage() {
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [phoneValue, setPhoneValue] = useState('');
  const [footerData, setFooterData] = useState(null);  // State to store fetched footer data

  // Fetch footer data from the backend
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${backEndURL}/api/footer`);
        const data = await response.json();
        if (response.ok) {
          setFooterData(data); // Set the fetched footer data to state
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error fetching contact information',
            text: data.message || 'An error occurred while fetching contact information.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error fetching the footer data. Please try again later.',
        });
      }
    };

    fetchFooterData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      phone: phoneValue,
      message: formData.message,
    };

    Swal.fire({
      title: 'Sending message...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      const response = await fetch(`${backEndURL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Form submitted successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error submitting the form. Please try again later.',
      });
    }
  
    // Reset the form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setPhoneValue('');
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out the form below or reach out directly.</p>
        <div className="back-to-courses">
          <a href="/" className="back-btn">Back</a>
        </div>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                international
                defaultCountry="LK"
                value={phoneValue}
                onChange={setPhoneValue}
                placeholder="+94 77 123 4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        {footerData && (
          <div className="contact-info-container">
            <h2>Contact Information</h2>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Phone</p>
                  <a href={`tel:${footerData.phone}`} className="contact-value">
                    {footerData.phone}
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Email</p>
                  <a href={`mailto:${footerData.email}`} className="contact-value">
                    {footerData.email}
                  </a>
                </div>
              </div>

              <div className="contact-info-item" onClick={toggleMap}>
                <div className="contact-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-details">
                  <p className="contact-label">Address</p>
                  <p className="contact-value address">
                    {footerData.address}
                  </p>
                </div>
              </div>

              <div className="business-hours">
                <p className="hours-label">Business Hours</p>
                <p className="hours-value">
                  Monday - Sunday: 8AM - 6PM<br />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className={`map-container ${showMap ? 'show' : ''}`}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.7670499231695!2d80.56548947476045!3d7.267329592739612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae369b238abb9a7%3A0x40293c6c1ed40350!2sLITS%20Academy%20-%20Language%20Infinity%20Training%20School!5e0!3m2!1sen!2slk!4v1741158665086!5m2!1sen!2slk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </div>
  );
}
