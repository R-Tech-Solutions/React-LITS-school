import React from "react";
import "./App.css";
import "./Assets/icons/fontawesome/css/all.min.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Footer from "./Pages/Footer";
import Courses from "./Pages/Courses";
import Form from "./Pages/Form";
import Cadmin from "./Pages/Cadmin";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
const App = () => {
  
  return (
    <>
      {/* <Home/>
      <About/>
      <AdminPanel/>
      <Courses/>
      <Cadmin/>
      <Form/>
      <Footer/> */}
      <Login/> 
      <Admin/>
      <div id="root"></div>
    </>
  );
};

export default App;