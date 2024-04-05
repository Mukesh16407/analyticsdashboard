/* eslint-disable react/prop-types */
import { useRef } from "react";
import { DonutChart } from "./DonutChart";

const Charts = ({revnewArray,saleValueArray,userActivity}) => {

  const chartRef = useRef(null);
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
            <div>Documentation</div>
            <div>Test</div>
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              border: "1px solid gray",
              minHeight: "300px",
              padding: "15px",
              borderRadius: "10px",
            }}
          ></div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", marginTop: "10px", gap: "15px" }}>
              <button
                style={{
                  fontSize: "12px",
                  border: "none",
                  background: "#31bf31",
                  borderRadius: "5px",
                }}
              >
                1D
              </button>
              <button
                style={{
                  fontSize: "12px",
                  border: "none",
                  background: "#31bf31",
                  borderRadius: "5px",
                }}
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
              >
                All
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
