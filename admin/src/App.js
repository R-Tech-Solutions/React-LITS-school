import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "./Assets/icons/fontawesome/css/all.min.css";
import AdminPanel from "./admin-panel";
import Blog from "./pages/Blog"
import Courses from "./pages/Courses"
import HeroAdmin from "./pages/HeroAdmin"
import Lectures from "./pages/Lectures"
import VisionMission from "./pages/VisionMission"
import AdminFooter from "./pages/AdminFooter";
import AdminGallery from "./pages/AdminGallery";

const App = () => {
  const location = useLocation();

  return (
    <>
      <AdminPanel />  {/* Sidebar should only be rendered once */}
      <div className="main-content">
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/heroadmin" element={<HeroAdmin />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/adminfooter" element={<AdminFooter/>}/>
          <Route path="/admingallery" element={<AdminGallery/>}/>
        </Routes>
      </div>

    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
