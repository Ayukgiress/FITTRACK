import MonthlyActivity from "./Homes";  
import MonthlyStepChart from '../Component/GoalsList';  
import DistanceChart from "./DistanceChart";  

const Statistics = () => {  
  return (  
    <div className="flex flex-col bg-neutral-900 p-6 h-full bg-neutral-950 p-4 sm:p-8 gap-4 items-center justify-center">  
      <div className="w-full flex items-start justify-start">  
        <MonthlyActivity />  
      </div>  

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 xl:gap-4">  
        <div className=" sm:w-1/2">  
          <MonthlyStepChart />  
        </div>  

        <div className="w-full sm:w-1/2">  
          <DistanceChart />  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Statistics;