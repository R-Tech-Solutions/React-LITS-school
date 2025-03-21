import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import "./Assets/icons/fontawesome/css/all.min.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Courses from "./Pages/Courses";
import Form from "./Pages/Form";
import Subcourse from "./Pages/Subcourse";
import Contact from "./Pages/Contact";
import { AuthProvider,} from "./Pages/AuthContext";

const App = () => {
  const location = useLocation();
  const hideFooterRoutes = ["/contact", "/form"];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/courses" element={<Courses />} />
        <Route path="/form" element={<Form />} />
        <Route path="/subcourse/:courseTitle" element={<Subcourse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} /> 
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
