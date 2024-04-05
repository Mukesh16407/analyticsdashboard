import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/dashboard/Home'
import { Header } from './component/Header'
import { Sidebar } from './component/Sidebar'
import { useEffect, useState } from 'react'
import Charts from './widgets/charts/Charts'
import { useSelector, useDispatch } from "react-redux";
import { getRealTimeInfoHydrator } from './redux/Action'


function App() {
  const dispatch = useDispatch()
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
 

  useEffect(()=>{
    dispatch(getRealTimeInfoHydrator())
  },[])



  return (
    <div className='grid-container' >
     <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
      <Routes>
       <Route path="/" element={<Home />} />
      
    </Routes>
    </div>
   
  )
}

export default App
