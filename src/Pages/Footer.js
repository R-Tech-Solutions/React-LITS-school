import React from "react";
import logo from "../Assets/images/logo1.png"; // Import your logo

const Footer = () => {
  const columns = [
    {
      imgSrc: logo,
    },
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "#" },
        { text: "Courses", href: "#course" },
        { text: "About Us", href: "#about-container" },
      ],
    },
    {
      title: "Address",
      content: [
        "606 Colombo Road, Nanuoya, Pilimathalawa",
        "+94779395499",
        "info@iltskandy.com",
      ],
    },
  ];

  const socialIcons = [
    "fab fa-facebook-f",
    "fab fa-instagram",
    "fab fa-linkedin-in",
    "fab fa-youtube",
    "fab fa-twitter",
    "fab fa-google",
  ];

  return (
    <footer>
  {columns.map((col, index) => (
    <div key={index} className="footer-col">
      {col.imgSrc && <img src={col.imgSrc} alt="Logo" />}
      {col.title && <h3>{col.title}</h3>}
      {col.content && (
        <ul>
          {col.content.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </ul>
      )}
      {col.links && (
        <ul>
          {col.links.map((linkObj, idx) => (
            <li key={idx}>
              <a href={linkObj.href}>{linkObj.text}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  ))}

  {/* Social Icons */}
  <div className="pro-links">
    {socialIcons.map((iconClass, index) => (
      <i key={index} className={iconClass}></i>
    ))}
  </div>

  {/* Copyright Statement */}
  <div className="copyright">
    <p>
      Copyright &copy;2024 LITS School Management - Developed by R-Tech
      Solution Team
    </p>
  </div>
</footer>
  );
};

export default Footer;
