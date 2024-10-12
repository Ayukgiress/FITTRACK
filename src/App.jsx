import React from "react";
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
import Profile from "./Component/Profile.jsx";
import { AuthProvider, useAuth } from './Pages/AuthContext.jsx'; 
import { FitnessProvider } from './Pages/PlanContext.jsx'; // Import the FitnessProvider
import Plan from "./Pages/Plan.jsx";
import WorkoutStore from "./Pages/WorkoutStore.jsx";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, currentUserLoading } = useAuth();
  if (currentUserLoading) return (
    <p>loading...</p>
  );

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
          <Route path="workoutStore" element={<WorkoutStore/>}/>
          <Route path="plan" element={<Plan />} /> {/* Make sure Goals component is defined */}
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
      <FitnessProvider> {/* Wrap your app with the FitnessProvider */}
        <div className="bg-customGradient">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </FitnessProvider>
    </AuthProvider>
  );
};

export default App;
