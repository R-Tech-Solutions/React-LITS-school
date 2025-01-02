import React from "react";
import "./App.css";
import "./Assets/icons/fontawesome/css/all.min.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Courses from "./Pages/Courses";
import Form from "./Pages/Form";

const App = () => {
  
  return (
    <>
      <Home/>
      <About/>
      <Courses/>
      <Form/>
      <Footer/>

      {/* ===================== ROOT ELEMENT ===================== */}
      <div id="root"></div>
    </>
  );
};

export default App;