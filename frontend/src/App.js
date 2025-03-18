import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "./Assets/icons/fontawesome/css/all.min.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Courses from "./Pages/Courses";
import Form from "./Pages/Form";
import LoginForm from "./Pages/Login";
import Admin from "./Pages/Admin/Admin";
import Subcourse from "./Pages/Subcourse";
import Contact from "./Pages/Contact";
import AdminVisionMission from "./Pages/Admin/AdminVisionMission"
import AdminFooter from "./Pages/Admin/AdminFooter"
import WhyChooseUs from "./Pages/Admin/WhyChooseUs"
import Blog from "./Pages/Blog/Blog"
import { AuthProvider, ProtectedRoute } from "./Pages/AuthContext";

import NewAdmin from "./Pages/NewAdmin/admin-panel"
import AdminBlog from "./Pages/NewAdmin/pages/Blog"
import AdminCourses from "./Pages/NewAdmin/pages/Courses"
import AdminDocuments from "./Pages/NewAdmin/pages/Documents"
import AdminLectures from "./Pages/NewAdmin/pages/Lectures"
import Admin2VisionMission from "./Pages/NewAdmin/pages/VisionMission"

const App = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/contact", "/form"];

  return (
    <>
    {/* <NewAdmin  /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/subcourse/:courseTitle" element={<Subcourse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminvision" element={<AdminVisionMission />} />
        <Route path="/adminfooter" element={<AdminFooter />} />
        <Route path="/whychooseus" element={<WhyChooseUs />} />
        <Route path="/blog" element={<Blog/>}/>

        <Route path="/newadmin" element={<NewAdmin />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/documents" element={<AdminDocuments />} />
        <Route path="/admin/lectures" element={<AdminLectures />} />
        <Route path="/admin/vision-mission" element={<Admin2VisionMission />} />

        <Route path="*" element={<Home />} /> {/* Catch-all route */}
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
