import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({globalDataChart}) => {
    return (
        <Bar
        data={globalDataChart}
        options={{
          maintainAspectRatio: false
        }}
      />
    )
}

export default BarChart