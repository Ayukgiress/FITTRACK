// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../Component/Sidebar';
// import { useAuth } from './AuthContext';
// import Profile from '../Component/Profile'

// const Dashboard = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-black">
//       {/* Sidebar section */}
//       <div className="flex-none w-full md:w-1/4 bg- text-white h-full">
//         <Sidebar />
//       </div>

//       {/* Main content area */}
//       <main className="flex-grow w-full overflow-y-auto p-4 md:p-6 bg-black">
//         <div className="container mx-auto">
//           <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//           <Outlet />
//         </div>
//       </main>
//       {isAuthenticated && (
//         <div className="hidden md:block md:w-1/4">
//           <Profile isAuthenticated={isAuthenticated} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
