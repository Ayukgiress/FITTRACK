// 

import MonthlyActivity from "./Homes"
import MonthlyStepChart from '../Component/GoalsList'
const statistics = () => {



  return (
    <div className=" h-full flex item-center justify-center gap-8 bg-neutral-950">
       <MonthlyActivity /> 
       <MonthlyStepChart/>
       </div>
  
  )
} 
 export default statistics