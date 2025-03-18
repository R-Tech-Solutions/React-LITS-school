import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { FaHome, FaBookOpen, FaVideo, FaFileAlt, FaEye, FaBars, FaTimes, FaSignOutAlt, FaUser, FaAddressBook } from "react-icons/fa"
import "./styles/admin.css"

// Import pages
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Lectures from "./pages/Lectures"
import VisionMission from "./pages/VisionMission"
import Blog from "./pages/Blog"
import HeroAdmin from "./pages/HeroAdmin"
import AdminFooter from "./pages/AdminFooter"
import AdminGallery from "./pages/AdminGallery"

function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

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
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"} ${sidebarOpen ? "slide-in" : "slide-out"}`}>
        <div className="sidebar-header">
          <h2>EduAdmin</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        <div className="sidebar-menu">
          <Link to="/" className={`menu-item ${isActive("/")}`} onClick={handleLinkClick}>
            <FaHome size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/courses" className={`menu-item ${isActive("/courses")}`} onClick={handleLinkClick}>
            <FaBookOpen size={20} />
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
          <Link to="/blog" className={`menu-item ${isActive("/blog")}`} onClick={handleLinkClick}>
            <FaFileAlt size={20} />
            <span>Blog</span>
          </Link>
          <Link to="/heroadmin" className={`menu-item ${isActive("/heroadmin")}`} onClick={handleLinkClick}>
            <FaUser size={20} />
            <span>Hero Admin</span>
          </Link>
          <Link to="/admingallery" className={`menu-item ${isActive("/admingallery")}`} onClick={handleLinkClick}>
            <FaUser size={20} />
            <span>Admin Gallery</span>
          </Link>
          <Link to="/adminfooter" className={`menu-item ${isActive("/adminfooter")}`} onClick={handleLinkClick}>
            <FaAddressBook size={20} />
            <span>Admin Footer</span>
          </Link>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn">
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={toggleSidebar}>
              <FaBars size={24} />
            </button>
            <h1>Education Admin Panel</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="avatar">A</div>
              <span>Admin User</span>
            </div>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/vision-mission" element={<VisionMission />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/heroadmin" element={<HeroAdmin />} />
            <Route path="/adminfooter" element={<AdminFooter/>}/>
            <Route path="/admingallery" element={<AdminGallery/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
