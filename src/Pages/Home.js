import { useEffect } from "react";
import logo from "../Assets/images/logo1.png";
import menuIcon from "../Assets/images/menu.png";


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
              <a href="#form-section">Contact</a>
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
      
    </>
  );
}

export default Home;