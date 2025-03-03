import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Subcourse.css";

const courseData = {
  japanese: {
    title: "Japanese Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "JAPANESE LANGUAGE",
        title: "JLPT",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Mr. Damith Western",
      },
      {
        id: 2,
        sectionTitle: "JAPANESE LANGUAGE",
        title: "NAT",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium.",
        startDate: "15",
        hasWeekends: false,
        price: "35000/=",
        duration: "06 Months / 05 Months (50 Hours)",
        time: "Monday 5.00pm - 7.00pm",
        requirements: "Completion of Basic Japanese.",
        payment: "Full Payment - 35000/= (Monthly Payment - 9000/=)",
        structure: "Advanced grammar, reading, and writing.",
        lecturer: "Mr. Damith Western",
      },
    ],
  },
  chinese: {
    title: "Chinese Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "CHINESE LANGUAGE",
        title: "Beginners Level Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. Demini Dulanga",
      },
      {
        id: 2,
        sectionTitle: "CHINESE LANGUAGE",
        title: "Special Spoken Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium.",
        startDate: "15",
        hasWeekends: false,
        price: "35000/=",
        duration: "06 Months / 05 Months (50 Hours)",
        time: "Monday 5.00pm - 7.00pm",
        requirements: "Completion of Basic Japanese.",
        payment: "Full Payment - 35000/= (Monthly Payment - 9000/=)",
        structure: "Advanced grammar, reading, and writing.",
        lecturer: "Ms. Demini Dulanga",
      },
    ],
  },
  french: {
    title: "French Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "FRENCH LANGUAGE",
        title: "Spoken Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. Thathsarani Weerakoon",
      },
      {
        id: 2,
        sectionTitle: "FRENCH LANGUAGE",
        title: "Kids Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium.",
        startDate: "15",
        hasWeekends: false,
        price: "35000/=",
        duration: "06 Months / 05 Months (50 Hours)",
        time: "Monday 5.00pm - 7.00pm",
        requirements: "Completion of Basic Japanese.",
        payment: "Full Payment - 35000/= (Monthly Payment - 9000/=)",
        structure: "Advanced grammar, reading, and writing.",
        lecturer: "Ms. Thathsarani Weerakoon",
      },
    ],
  },
  korean: {
    title: "Korean Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "KOREAN LANGUAGE",
        title: "EPS-TOPIK",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. Imali Hansika",
      },
      {
        id: 2,
        sectionTitle: "KOREAN LANGUAGE",
        title: "Kids Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium.",
        startDate: "15",
        hasWeekends: false,
        price: "35000/=",
        duration: "06 Months / 05 Months (50 Hours)",
        time: "Monday 5.00pm - 7.00pm",
        requirements: "Completion of Basic Japanese.",
        payment: "Full Payment - 35000/= (Monthly Payment - 9000/=)",
        structure: "Advanced grammar, reading, and writing.",
        lecturer: "Ms. Imali Hansika",
      },
    ],
  },
  russian: {
    title: "Russian  Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "RUSSIAN LANGUAGE",
        title: "Russian  Language",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 2,
        sectionTitle: "RUSSIAN LANGUAGE",
        title: "Kids Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium.",
        startDate: "15",
        hasWeekends: false,
        price: "35000/=",
        duration: "06 Months / 05 Months (50 Hours)",
        time: "Monday 5.00pm - 7.00pm",
        requirements: "Completion of Basic Japanese.",
        payment: "Full Payment - 35000/= (Monthly Payment - 9000/=)",
        structure: "Advanced grammar, reading, and writing.",
        lecturer: "Ms. ",
      },
    ],
  },
  italian: {
    title: "Italian Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "ITALIAN LANGUAGE",
        title: "Italy Language Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
    ],
  },
  german: {
    title: "German Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "GERMAN LANGUAGE",
        title: "A1 Level Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 2,
        sectionTitle: "GERMAN LANGUAGE",
        title: "A2 Level Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 3,
        sectionTitle: "GERMAN LANGUAGE",
        title: "B1 Level Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 4,
        sectionTitle: "GERMAN LANGUAGE",
        title: "B2 Level Course",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
    ],
  },
  hindi: {
    title: "Hindi Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "HINDI LANGUAGE",
        title: "Beginners For Hindi Language",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
    ],
  },
  english: {
    title: "English Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "ENGLISH LANGUAGE",
        title: "Spoken English for Kids",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 2,
        sectionTitle: "ENGLISH LANGUAGE",
        title: "Spoken English for School Children",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 3,
        sectionTitle: "ENGLISH LANGUAGE",
        title: "Rapid Course of English for OL",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
      {
        id: 4,
        sectionTitle: "ENGLISH LANGUAGE",
        title: "Certificate Course in English-CCE",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
    ],
  },
  arabic: {
    title: "Arabic Language",
    subcourses: [
      {
        id: 1,
        sectionTitle: "ARABIC LANGUAGE",
        title: "Arabic Language Courses",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia imperdiet massa, in viverra ligula condimentum vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pulvinar, enim vel iaculis pretium, diam ligula facilisis enim, nec lacinia tellus dolor ac erat.",
        startDate: "20",
        hasWeekends: true,
        price: "32000/=",
        duration: "05 Months / 04 Months (40 Hours)",
        time: "Saturday 9.00am - 1.00pm",
        requirements: "Basic understanding of English.",
        payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
        structure: "Includes speaking, writing, and grammar lessons.",
        lecturer: "Ms. ",
      },
    ],
  },
};

const Subcourse = () => {
  const { courseId } = useParams();
  const course = courseData[courseId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return <h2>Course not found</h2>;
  }

  return (
    <div className="subcourses-container">
      <h2 className="section-title">{course.title}</h2>
      <div className="back-to-courses">
        <Link to="/" className="back-btn">Back</Link>
      </div>

      <div className="subcourses-grid">
        {course.subcourses.map((subcourse) => (
          <SubcourseCard key={subcourse.id} subcourse={subcourse} />
        ))}
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

            {/* Apply for Course Button */}
            <button
              className="apply-btn"
              onClick={() => {
                window.location.href = `/form?class=${encodeURIComponent(subcourse.sectionTitle)}&section=${encodeURIComponent(subcourse.title)}`;
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
