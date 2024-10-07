// // WorkoutStore.js  
// import React, { useState } from "react";  
// import WorkoutModal from "./WorkoutModal"; // Your existing modal component  
// import WorkoutLog from "./WorkoutLog"; // Your existing workout log component  

// const WorkoutStore = () => {  
//   const [isModalOpen, setIsModalOpen] = useState(false);  
//   const [workoutLog, setWorkoutLog] = useState([]);  

//   const handleLogSubmit = (workout) => {  
//     setWorkoutLog((prevLog) => [...prevLog, { ...workout, completed: false }]);  
//   };  

//   return (  
//     <div className="p-4">  
//       <button onClick={() => setIsModalOpen(true)} className="btn-add-workout">  
//         Add Workout  
//       </button>  
//       <WorkoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleLogSubmit} />  
//       <WorkoutLog workoutLog={workoutLog} />  
//     </div>  
//   );  
// };  

// export default WorkoutStore;