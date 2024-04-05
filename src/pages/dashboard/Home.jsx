import React, { useEffect } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import {
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsFillBellFill,
  } from "react-icons/bs";
import Charts from "../../widgets/charts/Charts";
import { BarChart } from "../../widgets/charts/BarChart";
import { AreaChart } from "../../widgets/charts/AreaChart";
import { getRealTimeInfoHydrator } from "../../redux/Action";
import { useDispatch, useSelector } from 'react-redux'

  export const Home = ()=>{

    const dispatch = useDispatch()
   const dashbord = useSelector((state)=> state.dashboard)
   console.log(dashbord);

   useEffect(()=>{
    dispatch(getRealTimeInfoHydrator())
   },[])
    

    return (
      <main style={{ padding: "20px"}}>
      <div className="main-title">
      <h3>DASHBOARD</h3>
    </div>

    <div className="main-cards" >
      <div className="card" >
        <div className="card-inner">
          <h3>Total Revenue</h3>
          <BsFillArchiveFill className="card_icon" />
        </div>
       
        <CountUp start={0} end={dashbord?.totalRevenue}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start}>
                    <h1>
                      <span ref={countUpRef} />
                    </h1>
                  </VisibilitySensor>
                )}
              </CountUp>
      </div>
      <div className="card">
        <div className="card-inner">
          <h3>Total Sales</h3>
          <BsFillGrid3X3GapFill className="card_icon" />
        </div>
      
        <CountUp start={0} end={dashbord?.totalSales}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start}>
                    <h1>
                      <span ref={countUpRef} />
                    </h1>
                  </VisibilitySensor>
                )}
              </CountUp>
      </div>
      <div className="card">
        <div className="card-inner">
          <h3>Active User</h3>
          <BsPeopleFill className="card_icon" />
        </div>
      
        <CountUp start={0} end={dashbord?.userActivity?.active}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start}>
                    <h1>
                      <span ref={countUpRef} />
                    </h1>
                  </VisibilitySensor>
                )}
              </CountUp>
      </div>
      <div className="card">
        <div className="card-inner">
          <h3>ALERTS</h3>
          <BsFillBellFill className="card_icon" />
        </div>
        {/* <h1>{dashbord?.userActivity?.pending}</h1> */}
        <CountUp start={0} end={dashbord?.userActivity?.pending}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start}>
                    <h1>
                      <span ref={countUpRef} />
                    </h1>
                  </VisibilitySensor>
                )}
              </CountUp>
      </div>
    </div>
    <Charts revnewArray={dashbord?.revnewArray} saleValueArray ={dashbord?.saleValueArray} userActivity={dashbord?.userActivity}/>
    <div className="charts">
       <BarChart/>
       <AreaChart/>
    </div>
    

  </main>
    )
   

  }