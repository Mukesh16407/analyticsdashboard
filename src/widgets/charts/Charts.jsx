/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { DonutChart } from "./DonutChart";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { MdLegendToggle } from "react-icons/md";

const Charts = ({revnewArray,saleValueArray,userActivity}) => {

  const chartRef = useRef(null);
  const [timePeriod, setTimePeriod] = useState("all");
  const [isAdvancedControlsVisible, setIsAdvancedControlsVisible] = useState(false);

  const [filteredRevenewData, setFilteredRevenewData] = useState([]);
  const [filteredSellData, setFilteredSellData] = useState([]);
  

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const convertAndSortByDate = (dataArray) => {
    
    const copiedData = dataArray.map(item => ({ ...item }));
  
    copiedData.forEach(item => {
      const parts = item.date.split('/');
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10); 
      const year = parseInt(parts[2], 10); 
  
      
      item.date = new Date(year, month - 1, day);
  
      const formattedDate = `${month}/${day}/${year}`;
      item.dateFormatted = formattedDate;
    });
  
    // Sort the copiedData array based on the date field
    copiedData.sort((a, b) => a.date - b.date);
  
    // Optionally, remove the 'date' property from the final sorted array
    return copiedData.map(item => ({ x: item.dateFormatted, y: item.value }));
  };
  
  const sortedRevnewData = useMemo(() => convertAndSortByDate(revnewArray), [revnewArray]);
  const sortedSaleValueArray = useMemo(() => convertAndSortByDate(saleValueArray), [saleValueArray]);


const filterByDate = useMemo(
  () => (data, startDat, endDat) => {
    if (!startDat || !endDat) return data;
    const startDateTimestamp = startDat.getTime();
    const endDateTimestamp = endDat.getTime();
    return data.filter((item) => {
      const itemTimestamp = new Date(item.x).getTime();
      return itemTimestamp >= startDateTimestamp && itemTimestamp <= endDateTimestamp;
    });
  },
  []
);

useEffect(() => {
  const filterData = (data) => filterByDate(data, startDate, endDate);
  setFilteredRevenewData(filterData(sortedRevnewData));
  setFilteredSellData(filterData(sortedSaleValueArray));
  
}, [
  startDate,
  endDate,
  sortedRevnewData,
  sortedSaleValueArray,
  filterByDate
]);

const filterByMonth = (period) => {
  setTimePeriod(period);
  const today = new Date();

  
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonth.getDate());

  
  setStartDate(startDate);
  setEndDate(endDate);
};
const filterBy3Months = (period) => {
  setTimePeriod(period);
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
  setStartDate(threeMonthsAgo);
  setEndDate(today);
};

const filterByYear = (period) => {
  setTimePeriod(period);
  const today = new Date();
  const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
  setStartDate(lastYearStart);
  setEndDate(lastYearEnd);
};

const resetFilter = (period) => {
  setTimePeriod(period);
  setStartDate(null);
  setEndDate(null);
};
const getXAxisOptions = () => ({
  type: "datetime",
  show: isAdvancedControlsVisible,
  tickAmount: 4,
  tooltip: { enabled: false, offsetX: 0 },
  labels: {
    show: isAdvancedControlsVisible
  },
  axisBorder: { show: isAdvancedControlsVisible },
  axisTicks: { show: isAdvancedControlsVisible },
  datetimeUTC: true
});

 const bigNumberFormatter = (value, isShortDisplayVisible = false) => {
  const number = Number(value);
  let formatted = null;

  if (number >= 1000000000) {
    formatted = (number / 1000000000).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return `${formatted}B`;
  }

  if (number >= 1000000) {
    formatted = (number / 1000000).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return `${formatted}M`;
  }
  if (isShortDisplayVisible) {
    // example
    // 93,643.27 => 93.6 k
    formatted = (number / 1000).toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return `${formatted}K`;
  }

  return decimalFormatter(value);
};

 const decimalFormatter = (value) =>
  value
    ? Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        .replace("999,999,999.00", "Withdraw All")
    : "0.00";
    
const getYAxisOptions = () => ({
  type: "datetime",
  show: isAdvancedControlsVisible,
  tickAmount: 3,
  tooltip: { enabled: true, offsetX: 0 },
  labels: {
    show: isAdvancedControlsVisible,
    formatter(value, _timestamp, _opts) {
      const formatted = `$ ${bigNumberFormatter(value, true)}`;
      return formatted;
    }
  },
  axisBorder: { show: isAdvancedControlsVisible },
  axisTicks: { show: isAdvancedControlsVisible },
  datetimeUTC: true
});

const [options] = useState({
  chart: {
    id: "curve-chart",
    type: "line",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    zoom: {
      enabled: false,
      type: "x",
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: "#90CAF9",
          opacity: 0.4
        },
        stroke: {
          color: "#0D47A1",
          opacity: 0.4,
          width: 1
        }
      }
    },
    toolbar: { show: false },
    events: {
      mouseMove(event, chartContext, config) {
        try {
          if (config.config.series[config.seriesIndex]) {
            const datapoint =
              config.config.series[config.seriesIndex].data[config.dataPointIndex];
            if (datapoint && datapoint.y > 0) {
             
              if (config.seriesIndex >= 0) {
                console.log(config.seriesIndex ,"config.seriesIndex ")
              }
            }
          }
        } catch (ex) {
          console.error(ex);
        }
      }
    },
    background: "#171f32"
  },
  xaxis: getXAxisOptions(),
  yaxis: getYAxisOptions(),
  legend: {
    show: true,
    offsetY: 8,
    labels: {
      colors: "#ffffc7"
    }
  },
  markers: {
    size: 0,
    colors: undefined,
    strokeColors: "#fff",
    strokeWidth: 0,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 3,
    offsetX: 0,
    offsetY: 0,
    onClick: undefined,
    onDblClick: undefined,
    showNullDataPoints: false,
    hover: {
      size: 5
    }
  },
  grid: {
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    dashArray: 0,
    width: 2
  },
  tooltip: {
    x: {
      show: false
    },
    y: {
      show: false,
      formatter: undefined,

      title: {
        formatter: (_seriesName) => ""
      }
    },
    z: {
      show: false
    },
    onDatasetHover: {
      highlightDataSeries: true
    },
    marker: {
      show: false
    },
    items: {
      display: "none"
    },
    fixed: {
      enabled: true,
      position: "topRight",
      offsetX: 0,
      offsetY: 0
    }
  },
  series: [
    {
      name: "Revenue",
      data: []
    },
    {
      name: "Sell",
      data: []
    },
   
  ]
});

  const [series, setSeries] = useState([
    {
      name: "Revenue",
      data: []
    },
    {
      name: "Sell",
      data: []
    },
  
  ]);

  useEffect(() => {
    if (filteredRevenewData || filteredSellData ) {
      const updatedSeries = [...series];
      if (filteredRevenewData && Array.isArray(filteredRevenewData)) {
        const index = updatedSeries.findIndex((us) => us.name === "Revenue");
        updatedSeries[index].data = filteredRevenewData;
      }
      if (filteredSellData && Array.isArray(filteredSellData)) {
        const index = updatedSeries.findIndex((us) => us.name === "Sell");
        updatedSeries[index].data = filteredSellData;
      }
    
      setSeries(() => updatedSeries);
     
    }
  }, [filteredRevenewData, filteredSellData]);

 
  const toggleAdvancedControls = () => {
    setIsAdvancedControlsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (chartRef.current) {
      ApexCharts.exec(
        "curve-chart",
        "updateOptions",
        {
          xaxis: {
            ...getXAxisOptions()
          },
          yaxis: {
            ...getYAxisOptions()
          }
        },
        false,
        false
      );
    }
  }, [getXAxisOptions, getYAxisOptions, isAdvancedControlsVisible]);

  useEffect(() => {
    if (chartRef.current) {
      ApexCharts.exec(
        "curve-chart",
        "updateSeries",
        [
          {
            name: "Revenue",
            data: filteredRevenewData
          },
          {
            name: "Sell",
            data: filteredSellData
          },
         
        ],
        false
      );
    }
  }, [
    isAdvancedControlsVisible,
    filteredRevenewData,
    filteredSellData
  ]);

  
  return (
    <div>
        <div
    // container
      style={{
        width: "1040px",
        display: "flex",
      }}
    >
         {/* left */}
      <div style={{ width: "50%", display: "flex", }}>
        <div
          style={{
            width: "100%",
            boxShadow: "0 15px 40px #0000001a",
            border: "1px solid gray",
            minHeight: "40vh",
            padding: "15px",
            borderRadius: "10px",
            background: "#171717" 
          }}
        >
          <div
            style={{
              width: "50%",
              height: "60px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{color:'wheat'}}>Revnew Vs Sell</div>
            
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              minHeight: "300px",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
             <Chart options={options} series={series} type="line" height={310} ref={chartRef} />
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", marginTop: "10px", gap: "15px" }}>
             
              <button
                className={`${
                  timePeriod === "1_month" ? "chart-active-tab" : ""
                }`}
             
                style={{
                  fontSize: "12px",
                  border: "none",
                  background: "#31bf31",
                  borderRadius: "5px",
                }}
               
                onClick={() => filterByMonth("1_month")}
              >
                1M
              </button>
              <button
                style={{
                  fontSize: "12px",
                  border: "none",
                  background: "#31bf31",
                  borderRadius: "5px",
                }}
                className={`${
                  timePeriod === "3_month" ? "chart-active-tab" : ""
                }`}
                onClick={() => filterBy3Months("3_month")}
              >
                3M
              </button>
              <button
                style={{
                  fontSize: "12px",
                  border: "none",
                  background: "#31bf31",
                  borderRadius: "5px",
                }}
                className={`${
                  timePeriod === "1_year" ? "chart-active-tab" : ""
                }`}
                onClick={() => filterByYear("1_year")}
              >
                1Y
              </button>
              <button
                style={{
                  fontSize: "12px",
                  border: "none",
                  background: "#31bf31",
                  borderRadius: "5px",
                }}
                className={`${
                  timePeriod === "all" ? "chart-active-tab" : ""
                }`}
                onClick={() => resetFilter("all")}
              >
                All
              </button>
              <button onClick={toggleAdvancedControls} title="Toggle Legend">
                    <MdLegendToggle
                      style={{ fontSize: "1.45rem" }}
                      
                    />
              </button>
              
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div
        style={{
          width: "50%",
          marginTop: "60px",
          minHeight: "50vh",
        }}
      >
        <DonutChart userActivity={userActivity}/>
      </div>
    </div>
    </div>
  );
};

export default Charts;
