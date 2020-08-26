import React from 'react'
import {Line} from 'react-chartjs-2';

const LineChart = ({globalDataChart}) => {
    
    return (
        <Line data={globalDataChart}  />
    )
}

export default LineChart