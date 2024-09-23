import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingPage/Home.jsx";
// import About from "./Pages/About.jsx";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import NavBar from "./Component/NavBar.jsx";
import Footer from "./Component/Footer.jsx";
import { Dashboard } from "./Pages/Dashboard.jsx";

const App = () => {
  return (
    <div className="bg-customGradient">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        {/* <Route path='dashboard' element={<Dashboard/>}/> */}
      </Router>
    </div>
  );
};

export default App;
