import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Assets/icons/fontawesome/css/all.min.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Courses from "./Pages/Courses";
import Form from "./Pages/Form";
import LoginForm from "./Pages/Login";
import Admin from "./Pages/Admin";
import Subcourse from "./Pages/Subcourse";
import { AuthProvider, ProtectedRoute } from "./Pages/AuthContext";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/form" element={<Form />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/subcourse" element={<Subcourse />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    </Routes>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <Router>
      <App />
      <Footer />
    </Router>
  </AuthProvider>
);

export default AppWrapper;
