import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./Pages/LandingPage/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import NavBar from "./Component/NavBar";
import Footer from "./Component/Footer";
import Dashboard from "./Pages/Dashboard";
import Statistics from "./Pages/Statistics";
import Settings from "./Pages/Settings";
import Activity from "./Pages/Activity";
import Profile from "./Component/Profile";
import { AuthProvider, useAuth } from './Pages/AuthContext';
import {  FitnessProvider } from "./Pages/PlanContext";

import Plan from './Pages/Plan';
import './App.css';
import WorkoutStore from "./Pages/WorkoutStore";
import History from "./Pages/History";
import VerifyEmail from "./Component/VerifyEmail";
import OauthCallback from "./Component/OauthCallback";
import ErrorBoundary from "./Component/ErrorBoundary";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, currentUserLoading } = useAuth();
  if (currentUserLoading) return <p>Loading...</p>;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/registration";

  return (
    <>
      {!isDashboard && !isAuthPage && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<OauthCallback />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route
          path="/dashboard/*"
          element={<PrivateRoute element={<Dashboard />} />}
        >
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="workoutStore" element={<WorkoutStore />} />
          <Route path="plan" element={<Plan />} />
          <Route path="history" element={<History />} />
          <Route index element={<Activity />} />
        </Route>
      </Routes>
      {!isDashboard && !isAuthPage && <Footer />}
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FitnessProvider>
        <div className="bg-customGradient">
          <Router>
            <Toaster richColors />
            <AppRoutes />
          </Router>
        </div>
      </FitnessProvider>
    </AuthProvider>
  </ErrorBoundary>
);

export default App;
