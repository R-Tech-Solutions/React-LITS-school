"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { Home, BookOpen, Video, FileText, Eye, Menu, X, LogOut } from "lucide-react"
import "./styles/admin.css"

// Import pages
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Lectures from "./pages/Lectures"
import VisionMission from "./pages/VisionMission"
import Blog from "./pages/Blog"
import Documents from "./pages/Documents"

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
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="sidebar-menu">
          {/* <Link to="/" className={`menu-item ${isActive("/")}`} onClick={handleLinkClick}>
            <Home size={20} />
            <span>Dashboard</span>
          </Link> */}
          <Link to="/admin/courses" className={`menu-item ${isActive("/courses")}`} onClick={handleLinkClick}>
            <BookOpen size={20} />
            <span>Courses</span>
          </Link>
          <Link to="/admin/lectures" className={`menu-item ${isActive("/lectures")}`} onClick={handleLinkClick}>
            <Video size={20} />
            <span>Lectures</span>
          </Link>
          <Link to="/admin/vision-mission" className={`menu-item ${isActive("/vision-mission")}`} onClick={handleLinkClick}>
            <Eye size={20} />
            <span>Vision & Mission</span>
          </Link>
          <Link to="/admin/blog" className={`menu-item ${isActive("/blog")}`} onClick={handleLinkClick}>
            <FileText size={20} />
            <span>Blog</span>
          </Link>
          <Link to="/admin/documents" className={`menu-item ${isActive("/documents")}`} onClick={handleLinkClick}>
            <FileText size={20} />
            <span>Documents</span>
          </Link>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
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
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/lectures" element={<Lectures />} />
            <Route path="/admin/vision-mission" element={<VisionMission />} />
            <Route path="/admin/blog" element={<Blog />} />
            <Route path="/admin/documents" element={<Documents />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

