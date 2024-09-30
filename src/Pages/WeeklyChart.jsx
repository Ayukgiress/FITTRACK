import { data } from "autoprefixer";
import react from "react";
import {Bar} from 'react-chartjs-2'

const WeeklyChart = ({ activities }) => {
    const getWeeklyData = () => {
        const days = Array(7).fill(0)

        activities.forEach(activitty => {
            const day = new Date(activitty.Date).getDate()
            days(day) += activitty.calories
        })
        return days
    }
    const data = {
        labels: ['sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        datasets: [{
            labels: 'calories burned',
            data: getWeeklyData(),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    }
    const option = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    return (
        <div>
            <h2>Weekly activity Chart</h2>
            <Bar data={data} option={option}/>
        </div>
    )
}

export default WeeklyChart



