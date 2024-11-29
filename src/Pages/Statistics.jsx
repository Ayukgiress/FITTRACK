import MonthlyActivity from "./Homes";  
import MonthlyStepChart from '../Component/GoalsList';  
import DistanceChart from "./DistanceChart";  

const Statistics = () => {  
  return (  
    <div className="h-full bg-neutral-950 p-4 sm:p-8 gap-4 flex flex-col items-center">  
      <div className="w-full sm:w-auto">  
        <MonthlyActivity />  
      </div>  

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">  
        <div className="w-full sm:w-1/2">  
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