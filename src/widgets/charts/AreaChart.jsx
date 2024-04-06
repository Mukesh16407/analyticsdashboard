/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export const AreaChart = ({revnewArray,saleValueArray}) => {

  const filterDataForMarch2024 = (dataArray) => {
    const filteredData = dataArray.filter(entry => {
      const [month, day, year] = entry.date.split('/').map(part => parseInt(part, 10));
      return month === 3 && year === 2024;
    });
  

    const salesValues = filteredData.map(entry => entry.value);
  
    return salesValues;
  };

  // Get sales data for March 2024
  const salesDataMarch2024 = filterDataForMarch2024(saleValueArray);
  const monthLabel = 'March 2024';
  console.log(salesDataMarch2024,"salesDataMarch2024")



    const series = [
        { name: 'Sales', type: 'area', data: salesDataMarch2024 },
      
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
          categories: [monthLabel],
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
        },
        title: {
          text: 'March Sales(2024)',
          align: 'center',
          style: {
            fontSize: '18px'
          }
        },
      };
  return (
    <div>
         <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  )
}
