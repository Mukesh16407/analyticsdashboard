/* eslint-disable react/prop-types */
// DonutChart.js
import ReactApexChart from 'react-apexcharts';

export const DonutChart = ({userActivity}) => {

  const { active, inactive, pending } = userActivity;
  const totalUsers = active + inactive + pending;

   // Calculate percentages
   const activePercentage = (active / totalUsers) * 100;
   const inactivePercentage = (inactive / totalUsers) * 100;
   const pendingPercentage = (pending / totalUsers) * 100;

  

  const data = [activePercentage,inactivePercentage,pendingPercentage]; 
  const labels = ['Active, pending, Inactive']; 

  const series = data;
  const options = {
    chart: {
      type: 'donut',
      height: 350
    },
    labels: labels,
    colors: ['#008FFB', '#00E396', '#FEB019',],
    plotOptions: {
      pie: {
        donut: {
          size: '70%' 
        }
      }
    },
    tooltip: {
      theme: 'dark', 
      y: {
        formatter: function (val) {
          return val + '%'; 
        }
      }
    },
    legend: {
      position: 'bottom' 
    }
  };

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="donut" height={350} />
    </div>
  );
};


