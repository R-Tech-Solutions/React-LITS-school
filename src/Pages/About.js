import React from "react";
import studentsImage from "../Assets/images/students.jpeg";
import pro1Image from "../Assets/images/pro1.webp";
import pro2Image from "../Assets/images/pro2.webp";
import pro3Image from "../Assets/images/pro3.webp";
import pro4Image from "../Assets/images/pro4.webp";
// import "./About.css";

const About = () => {
    return (
        <section id="about-container">
            <div className="about-text">
                <h2>Welcome to LITS!</h2>
                <p>
                    At LITS Academy, we believe that language is the bridge to endless opportunities.
                    Nestled in the heart of Kandy, we are proud to be a trailblazer in language education,
                    offering an unparalleled opportunity to master 10 languages under one roof. Our mission
                    is to empower individuals from all walks of life to communicate effectively, connect
                    globally, and thrive in a multicultural world.
                </p>
            </div>
            <div className="about-img">
                <img src={studentsImage} alt="About Us" />
            </div>
            <LecturersSection />
        </section>
    );
};

// Lecturers section as a separate component
const LecturersSection = () => {
    const lecturers = [
        {
            imgSrc: pro1Image,
            name: "Subha Rathnayaka",
            subject: "Hindi Language",
        },
        {
            imgSrc: pro2Image,
            name: "Thathsarani Weerakoon",
            subject: "French Language",
        },
        {
            imgSrc: pro3Image,
            name: "Wasantha Karunanaaka",
            subject: "Korean Language",
        },
        {
            imgSrc: pro4Image,
            name: "Demini Dulanga",
            subject: "Chinese Language",
        },
    ];

    return (
        <section id="experts">
            <h1>Our Lecturers</h1>
            <p>
                Our lecturers are highly qualified professionals with years of experience in teaching languages. Passionate and
                dedicated, they bring innovative teaching methods to make language learning engaging, effective, and enjoyable
                for every student.
            </p>
            <div className="experts-box">
                <div className="sliding-container">
                    {lecturers.concat(lecturers).map((lecturer, index) => (
                        <div className="profile" key={index}>
                            <img src={lecturer.imgSrc} alt={lecturer.name} />
                            <h6>{lecturer.name}</h6>
                            <p>{lecturer.subject}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;
