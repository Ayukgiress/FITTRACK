import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/LandingPage/Home.jsx";
import './App.css';
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import NavBar from "./Component/NavBar.jsx";
import Footer from "./Component/Footer.jsx";
import Dashboard from './Pages/Dashboard.jsx';
// import NotFound from "./Pages/NotFound.jsx"; // Add a NotFound component

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const isDashboardRoute = window.location.pathname === '/dashboard';

  return (
    <div className="bg-customGradient">
      <Router>
        {!isDashboardRoute && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/dashboard" 
            element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} 
          />
          {/* <Route path="*" element={<NotFound />} /> 404 page */}
        </Routes>
        {!isDashboardRoute && <Footer />}
      </Router>
    </div>
  );
};

export default App;
