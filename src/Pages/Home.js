import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import logo from "../Assets/images/logo1.png";
import menuIcon from "../Assets/images/menu.png";
import { Link } from "react-router-dom"; 

const LecturersSection = () => {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLecturers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/lecturers");
                setLecturers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching lecturers:", error);
                setLoading(false);
            }
        };

        fetchLecturers();
    }, []);

    if (loading) {
        return <p>Loading lecturers...</p>;
    }

    return (
        <section id="experts">
            <h1>Our Lecturers</h1>
            <p>
                Our lecturers are highly qualified professionals with years of experience in teaching languages. Passionate and
                dedicated, they bring innovative teaching methods to make language learning engaging, effective, and enjoyable
                for every student.
            </p>
            <div className="experts-box">
                <Marquee gradient={false} speed={50}>
                    {lecturers.map((lecturer, index) => (
                        <div className="profile" key={index}>
                            <img src={lecturer.image} alt={lecturer.name} />
                            <h6>{lecturer.name}</h6>
                            <p>{lecturer.subject}</p>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

const Course = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <section id="course">
            <h1>Our Popular Courses</h1>
            <div className="course-box">
                {courses.map((course, index) => (
                    <div className="courses" key={index}>
                        <div className="details">
                            <h3>{course.title}</h3>
                            <img src={course.image} alt={course.title} />
                            <p>{course.description}</p>
                            <h5>Entry Requirements</h5>
                            <h6>{course.entry}</h6>
                            <h5>Course Structure and Modules</h5>
                            <h6>{course.structure}</h6>
                            <h5>Start Date</h5>
                            <h6>{course.startDate}</h6>
                            <h5>Prize</h5>
                            <h6>{course.commencement}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Home = () => {
    useEffect(() => {
        const openMenu = document.getElementById("menu");
        const closeMenu = document.getElementById("menu-close");
        const navigationMenu = document.querySelector("nav .navigation ul");

        // Open menu
        openMenu.addEventListener("click", () => {
            navigationMenu.classList.add("active");
        });

        // Close menu
        closeMenu.addEventListener("click", () => {
            navigationMenu.classList.remove("active");
        });

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll("nav .navigation ul li a");
        navLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                const targetId = e.target.getAttribute("href").slice(1); // Get the target section ID
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    navigationMenu.classList.remove("active"); // Close the menu after clicking a link
                }
            });
        });

        // Cleanup event listeners on component unmount
        return () => {
            openMenu.removeEventListener("click", () => {
                navigationMenu.classList.add("active");
            });

            closeMenu.removeEventListener("click", () => {
                navigationMenu.classList.remove("active");
            });

            navLinks.forEach((link) =>
                link.removeEventListener("click", (e) => {
                    const targetId = e.target.getAttribute("href").slice(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        e.preventDefault();
                        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                        navigationMenu.classList.remove("active");
                    }
                })
            );
        };
    }, []);

    return (
        <>
            {/* ===================== NAVIGATION COMPONENT ===================== */}
            <nav>
                <img src={logo} alt="LITS Logo" />
                <div className="navigation">
                    <ul>
                        <i id="menu-close" className="fas fa-times"></i>
                        <li>
                            <a href="#" className="active">Home</a>
                        </li>
                        <li>
                            <a href="#about-container">About</a>
                        </li>
                        <li>
                            <a href="#course">Courses</a>
                        </li>
                        <li>
  <Link to="/form">Contact</Link>
</li>
                    </ul>
                    { <img id="menu" src={menuIcon} alt="Menu Icon" /> }
                </div>
            </nav>

            {/* ===================== HOME COMPONENT===================== */}
            <section id="home">
                <h1>Enhance Your Future With LITS.</h1>
                <p>
                    Welcome to LITS Academy in Kandy, the premier language school where you
                    can master 10 different languages all in one place. As the first of its
                    kind, we are redefining language education with a diverse range of
                    courses tailored to your needs. Begin your journey to multilingual
                    excellence today!
                </p>
                <div className="btn">
                    <a className="blue" href="#form-section">Get Started</a>
                    <a className="yellow" href="#course">Visit Courses</a>
                </div>
            </section>

            {/* ===================== LECTURERS COMPONENT===================== */}
            <LecturersSection />

            {/* ===================== COURSES COMPONENT===================== */}
            <Course />
        </>
    );
};

export default Home;
