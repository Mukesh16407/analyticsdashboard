/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts';

export const BarChart = ({revnewArray,saleValueArray}) => {

  

  const calculateMonthlyTotal = (dataArray) => {
    const monthlyTotals = new Array(12).fill(0); // Initialize array with 12 zeroes for each month
    
    // Loop through each data entry and accumulate values by month
    dataArray.forEach(entry => {
      const parts = entry.date.split('/');
      const month = parseInt(parts[0], 10) - 1; // Month index (0-based)
      const value = entry.value;
      monthlyTotals[month] += value; // Add value to corresponding month
    });

    return monthlyTotals;
  };

  const monthlyRevenue = calculateMonthlyTotal(revnewArray);
  const monthlySales = calculateMonthlyTotal(saleValueArray);

  

    const series = [
        {
          name: 'Revenue',
          data: monthlyRevenue
        },
        {
          name: 'Sales',
          data: monthlySales
        }
      ];
  
      const options = {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '80%',
            endingShape: 'flat',
            dataLabels: {
              enabled: false // Disable data labels on bars
            }
          },
        },
        stroke: {
          width: 2,
          colors: ['transparent']
        },
        title: {
          text: 'Monthly Sales and Revenue Comparison (2023)',
          align: 'center',
          style: {
            fontSize: '18px'
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false 
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
            }
          },
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'top'
        },
      };

  return (
    <div>
         <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  )
}
