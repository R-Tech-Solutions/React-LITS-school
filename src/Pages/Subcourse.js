import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';  // You can also use fetch, but axios is cleaner
import "./Subcourse.css";
import { backEndURL } from "../Backendurl";

const Subcourse = () => {
  const { courseTitle } = useParams();
  const [subcourses, setSubcourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backEndURL}/api/subcourses/title/${courseTitle}`);
        setSubcourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Sub-courses not found ');
        setLoading(false);
      }
    };

    fetchSubcourses();
  }, [courseTitle]);

  if (loading) return (
    <div className="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
  if (error) return <h2 className="error-message">{error}</h2>;

  return (
    <div className="subcourses-container">
      <h2 className="section-title">{courseTitle}</h2>
      <div className="back-to-courses">
        <Link to="/" className="back-btn">Back</Link>
      </div>

      <div className="subcourses-grid">
        {subcourses.length > 0 ? (
          subcourses.map((subcourse) => (
            <SubcourseCard key={subcourse._id} subcourse={subcourse} />
          ))
        ) : (
          <p>No sub-courses available.</p>
        )}
      </div>
    </div>
  );
};

// Subcourse Card Component
const SubcourseCard = ({ subcourse }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="subcourse-card">
      <h3>{subcourse.title}</h3>
      <p><strong></strong> {subcourse.description}</p>

      {/* Course Footer */}
      <div className="subcourse-footer">
        <div className="course-info">
          <div className="info-item">
            <i className="fa fa-calendar"></i> Started On Sep {subcourse.startDate}
          </div>
          {subcourse.hasWeekends && (
            <div className="info-item">
              <i className="fa fa-clock-o"></i> Weekends
            </div>
          )}
          <div className="info-item">
            <i className="fa fa-money"></i> Rs. {subcourse.price}
          </div>
        </div>
      </div>

      {/* "See More" Button */}
      <button className="see-more-btn" onClick={toggleDetails}>
        {showDetails ? "Show Less" : "See More"}
        <i className={`fa ${showDetails ? "fa-angle-up" : "fa-angle-right"}`}></i>
      </button>

      {/* Additional Course Details (Appears on See More) */}
      {showDetails && (
        <div className="details-container expanded">
          <div className="details-content">
            <div className="detail-row">
              <div className="detail-label">Course Duration</div>
              <div className="detail-value">{subcourse.duration}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Course Time</div>
              <div className="detail-value">{subcourse.time}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Entry Requirements</div>
              <div className="detail-value">{subcourse.requirements}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Payments</div>
              <div className="detail-value">{subcourse.payment}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Course Structure and Modules</div>
              <div className="detail-value">{subcourse.structure}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Lecturer</div>
              <div className="detail-value">{subcourse.lecturer}</div>
            </div>
            <button
              className="apply-btn"
              onClick={() => {
                const sectionTitle = subcourse.category || 'Default Class';  // Fallback value
                window.location.href = `/form?class=${sectionTitle}&section=${subcourse.title}`;
              }}
            >
              Apply For Course
            </button>


          </div>
        </div>
      )}
    </div>
  );
};

export default Subcourse;
