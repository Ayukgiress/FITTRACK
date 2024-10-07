// App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/LandingPage/Home.jsx";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import NavBar from "./Component/NavBar.jsx";
import Footer from "./Component/Footer.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Statistics from "./Pages/Statistics.jsx";
import Settings from "./Pages/Settings.jsx";
import Activity from "./Pages/Activity.jsx";
// import WorkoutStore from "./Pages/WorkoutStore.jsx";
import Profile from "./Component/Profile.jsx";
import { AuthProvider, useAuth } from './Pages/AuthContext.jsx'; 

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute element={<Dashboard />} />
          }
        >
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="goals" element={<gooals />} />
          {/* <Route path="workouts" element={<WorkoutStore />} /> */}
          <Route index element={<Activity />} /> {/* Default view for dashboard */}
        </Route>
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-customGradient">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
