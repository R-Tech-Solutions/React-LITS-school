import { useState, useEffect } from "react"
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"
import { FaHome, FaBookOpen, FaVideo,FaEye, FaBars, FaTimes, FaSignOutAlt, FaEnvelopeOpenText, FaPhone, FaRegStickyNote, FaTrophy, FaPhotoVideo } from "react-icons/fa"
import "./styles/admin.css"

// Import pages
// import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Lectures from "./pages/Lectures"
import VisionMission from "./pages/VisionMission"
// import Blog from "./pages/Blog"
import HeroAdmin from "./pages/HeroAdmin"
import AdminFooter from "./pages/AdminFooter"
import AdminGallery from "./pages/AdminGallery"
import Contact from "./pages/Contact"
import Mail from "./pages/Mail"
import Login from "./auth/Login"

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const email = "LitskandyAdmin"
  const password = "LitsAdmin@321"

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogin = (inputEmail, inputPassword) => {
    if (inputEmail === email && inputPassword === password) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="admin-container">
      {isLoggedIn && location.pathname !== "/login" && (
        <div className={`sidebar ${sidebarOpen ? "open" : "closed"} ${sidebarOpen ? "slide-in" : "slide-out"}`}>
          <div className="sidebar-header">
            <h2>LITS SCHOOL</h2>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
          <div className="sidebar-menu">
            <Link to="/" className={`menu-item ${isActive("/")}`} onClick={handleLinkClick}>
              <FaHome size={20} />
              <span>Courses</span>
            </Link>
            <Link to="/lectures" className={`menu-item ${isActive("/lectures")}`} onClick={handleLinkClick}>
              <FaVideo size={20} />
              <span>Lectures</span>
            </Link>
            <Link to="/vision-mission" className={`menu-item ${isActive("/vision-mission")}`} onClick={handleLinkClick}>
              <FaEye size={20} />
              <span>Vision & Mission</span>
            </Link>
            {/* <Link to="/blog" className={`menu-item ${isActive("/blog")}`} onClick={handleLinkClick}>
              <FaFileAlt size={20} />
              <span>Blog</span>
            </Link> */}
            <Link to="/heroadmin" className={`menu-item ${isActive("/heroadmin")}`} onClick={handleLinkClick}>
              <FaTrophy size={20} />
              <span>Hero</span>
            </Link>
            <Link to="/admingallery" className={`menu-item ${isActive("/admingallery")}`} onClick={handleLinkClick}>
              <FaPhotoVideo size={20} />
              <span>Admin Gallery</span>
            </Link>
            <Link to="/adminfooter" className={`menu-item ${isActive("/adminfooter")}`} onClick={handleLinkClick}>
              <FaRegStickyNote size={20} />
              <span>Admin Footer</span>
            </Link>
            <Link to="/contact" className={`menu-item ${isActive("/contact")}`} onClick={handleLinkClick}>
              <FaPhone size={20} />
              <span>Contact</span>
            </Link>
            <Link to="/mail" className={`menu-item ${isActive("/mail")}`} onClick={handleLinkClick}>
              <FaEnvelopeOpenText size={20} />
              <span>Mail</span>
            </Link>
          </div>
          <div className="sidebar-footer">
            <button className="logout-btn">
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      <div className="main-content">
        <div className="content">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/login" element={<Login onLogin={handleLogin} />}/>
            <Route path="/" element={<Courses />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/vision-mission" element={<VisionMission />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/heroadmin" element={<HeroAdmin />} />
            <Route path="/adminfooter" element={<AdminFooter/>}/>
            <Route path="/admingallery" element={<AdminGallery/>}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/mail" element={<Mail />}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
