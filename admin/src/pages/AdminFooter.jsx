import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/adminfooter.css";

const AdminFooter = () => {
  const [formData, setFormData] = useState({
    logo: "",
    address: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  });

  // Fetch Footer Data
  useEffect(() => {
    axios.get("http://localhost:3001/api/footer")
      .then(response => {
        const footerData = response.data;
        setFormData({
          logo: footerData.logo,
          address: footerData.address,
          phone: footerData.phone,
          email: footerData.email,
          facebook: footerData.facebook,
          instagram: footerData.instagram,
          tiktok: footerData.tiktok,
        });
      })
      .catch(error => {
        console.error("There was an error fetching the footer data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/api/footer", formData)
      .then(response => {
        alert("Footer details updated successfully!");
        console.log("Updated Footer Details:", response.data);
      })
      .catch(error => {
        console.error("Error updating footer:", error);
      });
  };

  return (
    <div className="admin-footer-container">
      <h1>Admin Footer Management</h1>
      <form onSubmit={handleSubmit} className="footer-form">
        <div className="form-group">
          <label>Logo:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.logo && <img src={formData.logo} alt="Logo Preview" className="logo-preview" />}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>

        <h3>Social Media Links</h3>

        <div className="form-group">
          <label>Facebook:</label>
          <input type="text" name="facebook" value={formData.facebook} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Instagram:</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>TikTok:</label>
          <input type="text" name="tiktok" value={formData.tiktok} onChange={handleInputChange} />
        </div>

        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default AdminFooter;
