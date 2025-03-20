import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "./Assets/icons/fontawesome/css/all.min.css";
import AdminPanel from "./admin-panel";

const App = () => {
  const location = useLocation();

  return (
    <>
      <AdminPanel />  {/* Sidebar should only be rendered once */}
   </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
