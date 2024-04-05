import ReactApexChart from 'react-apexcharts';

export const BarChart = () => {

    const series = [
        {
          name: 'Sales',
          data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
        },
        {
          name: 'Profit',
          data: [20, 25, 30, 35, 40, 45, 50, 55, 60]
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
            endingShape: 'flat'
          },
         
        },
      
        stroke: {
          width: 2,
          colors: ['transparent']
        },
        title: {
          text: 'Sales and Profit Comparison',
          align: 'center',
          style: {
            fontSize: '18px'
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        yaxis: {
          title: {
            text: 'Amount (in $)'
          },
  
        },
        grid: {
          show: false 
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
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
