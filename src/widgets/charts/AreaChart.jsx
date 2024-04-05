import ReactApexChart from "react-apexcharts";

export const AreaChart = () => {

    const salesData = [30, 40, 45, 50, 49, 60, 70, 91, 125];
    const profitData = [20, 25, 30, 35, 40, 45, 50, 55, 60];

    const series = [
        { name: 'Sales', type: 'area', data: salesData },
        { name: 'Profit', type: 'area', data: profitData }
      ];
      const options = {
        chart: {
          type: 'area',
          height: 350,
          toolbar: {
            show: false 
          },
          animations: {
            enabled: false 
          }
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            style: {
              colors: '#ffffff' 
            }
          }
        },
        yaxis: {
          title: {
            text: 'Amount (in $)',
            style: {
              color: '#ffffff' 
            }
          },
          labels: {
            style: {
              colors: '#ffffff'
            }
          }
        },
        fill: {
          opacity: 0.8,
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
        tooltip: {
          theme: 'dark', 
          x: { format: 'MMM' },
          y: {
            formatter: function (val, { seriesIndex }) {
              return "$" + val.toFixed(2) + "k";
            }
          }
        },
        markers: {
          size: 6, 
          hover: {
            sizeOffset: 3 
          }
        },
        grid: {
          show: false 
        }
      };
  return (
    <div>
         <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  )
}
