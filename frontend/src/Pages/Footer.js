import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndURL } from "../Backendurl";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(`${backEndURL}/api/footer`);
        setFooterData(response.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      imgSrc: footerData.logo,
    },
    {
      title: "Quick Links",
      links: [
        { text: "Home", href: "#" },
        { text: "Courses", href: "#course" },
        { text: "About Us", href: "#vision" },
        { text: "Login", href: "./Login" },
      ],
    },
    {
      title: "Contact",
      content: [
        { icon: "fas fa-map-marker-alt", text: footerData.address },
        { icon: "fas fa-phone", text: footerData.phone },
        { icon: "fas fa-envelope", text: footerData.email },
      ],
    },
  ];

  const socialIcons = [
    footerData.facebook && { class: "fab fa-facebook-f", href: footerData.facebook },
    footerData.instagram && { class: "fab fa-instagram", href: footerData.instagram },
    footerData.tiktok && { class: "fab fa-tiktok", href: footerData.tiktok },
  ].filter(Boolean);

  return (
    <footer>
      {columns.map((col, index) => (
        <div key={index} className="footer-col">
          {col.imgSrc && <img src={col.imgSrc} alt="Logo" />}
          {col.title && <h3>{col.title}</h3>}
          {col.content && (
            <ul>
              {col.content.map((item, idx) => (
                <li key={idx}>
                  <i className={item.icon}></i> {item.text}
                </li>
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
        {socialIcons.map((icon, index) => (
          <a key={index} href={icon.href} target="_blank" rel="noopener noreferrer">
            <i className={icon.class}></i>
          </a>
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
