import { useState } from "react";
import "./Subcourse.css";
import Cover from "../Assets/images/cover.jpg";

const Subcourse = ({
  title,
  sectionTitle,
  description,
  image,
  startDate,
  hasWeekends,
  price,
  duration,
  time,
  requirements,
  payment,
  structure,
  lecturer,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="subcourse-card">
      <div className="subcourse-image">
        <img src={image || Cover} alt={title} />
      </div>
      <div className="subcourse-content">
        
        <h3 className="subcourse-title">{title}</h3>
        <p className="sections-title">{sectionTitle}</p>
        <p className="subcourse-description">{description}</p>
        <div className={`details-container ${showDetails ? "expanded" : ""}`}>
          <div className="details-content">
            <div className="detail-row">
              <div className="detail-label">Course Duration</div>
              <div className="detail-value">{duration}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Course Time</div>
              <div className="detail-value">{time}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Entry Requirements</div>
              <div className="detail-value">{requirements}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Payments</div>
              <div className="detail-value">{payment}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Course Structure and Modules</div>
              <div className="detail-value">{structure}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">Lecturer</div>
              <div className="detail-value">{lecturer}</div>
            </div>
            <button
  className="apply-btn"
  onClick={() => {
    window.location.href = `/form?class=${encodeURIComponent(sectionTitle)}&section=${encodeURIComponent(title)}`;
  }}
>
  Apply For Course
</button>



          </div>
        </div>
        <div className="subcourse-footer">
          <div className="course-info">
            <div className="info-item">
              <i className="fa fa-calendar"></i> Started On Sep {startDate}
            </div>
            {hasWeekends && (
              <div className="info-item">
                <i className="fa fa-clock-o"></i> Weekends
              </div>
            )}
            <div className="info-item">
              <i className="fa fa-money"></i> Rs. {price}
            </div>
          </div>

        </div>
        <button className="see-more-btn" onClick={toggleDetails}>
          {showDetails ? "Show Less" : "See More"}
          <i className={`fa ${showDetails ? "fa-angle-up" : "fa-angle-right"}`}></i>
        </button>
      </div>
    </div>
  );
};

const SubcourseExample = () => {
  const subcourses = [
    {
      id: 1,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "JLPT",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 2,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "NAT",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 3,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "JFT",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 4,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "N4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 5,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "N5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 6,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "O/L",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 7,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "A/L",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
    {
      id: 8,
      sectionTitle: "JAPANESE LANGUAGE",
      title: "Kids Courses",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra neque non mattis hendrerit. Proin porttitor dolor elit, eget egestas purus iaculis sed. Pellentesque orci nulla, ultricies sit amet feugiat eget, commodo in massa. Pellentesque nec libero rutrum, fringilla dui sit amet, malesuada justo.",
      image: "",
      startDate: "20",
      hasWeekends: true,
      price: "32000/=",
      duration: "05 Months / 04 Months (40 Hours)",
      time: "Saturday 9.00am - 1.00pm",
      requirements: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      payment: "Full Payment - 32000/= (Monthly Payment - 8000/=)",
      structure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lecturer: "Mr. Damith Western",
    },
  ];

  return (
    <div className="subcourses-container">
      <h2 className="section-title">JAPANESE LANGUAGE</h2>
      <div className="back-to-courses">
        <a href="/courses" className="back-btn">Back to Courses</a>
      </div>
      <div className="subcourses-grid">
        {subcourses.map((subcourse) => (
          <Subcourse key={subcourse.id} {...subcourse} />
        ))}
      </div>

    </div>
  );
};

export default SubcourseExample;
