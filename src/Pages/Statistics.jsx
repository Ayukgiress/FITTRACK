// 

import MonthlyActivity from "./Homes"
import ChartDoughnut from "../Component/GoalsList"

const statistics = () => {



  return (
    <div className=" h-full flex item-center justify-around">
       <MonthlyActivity /> 
       <ChartDoughnut className="w-90 h-80"/>
    </div>
  )
} 
 export default statistics