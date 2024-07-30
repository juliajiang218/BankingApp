"use client"
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data = {
        datasets:[
            {
                label:"Banks",
                data: [800, 1200, 2400],
                backgroundColor: ['#0747b6','#2265d8','#2f91fa']
            }
        ],
        labels: ['bank1','bank2','bank3']
    }
  
    return (<Doughnut 
        data={data} 
        options={{
            cutout: '60%',
            plugins:{
                legend:{
                    display: false
                }
            }
        }}
        />
  )
}

export default DoughnutChart
