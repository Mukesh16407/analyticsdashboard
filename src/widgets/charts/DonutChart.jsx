// DonutChart.js
import ReactApexChart from 'react-apexcharts';

export const DonutChart = () => {
  const data = [30, 50, 20,]; 
  const labels = ['curent, pending, block']; 

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
          size: '70%' // Adjust the size of the donut hole
        }
      }
    },
    tooltip: {
      theme: 'dark', // Tooltip theme
      y: {
        formatter: function (val) {
          return val + '%'; // Format tooltip value as percentage
        }
      }
    },
    legend: {
      position: 'bottom' // Position of the legend
    }
  };

  return (
    <div className="chart-container">
      <ReactApexChart options={options} series={series} type="donut" height={350} />
    </div>
  );
};


