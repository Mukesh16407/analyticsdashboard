import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/dashboard/Home'
import { Header } from './component/Header'
import { Sidebar } from './component/Sidebar'
import { useState } from 'react'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
 

  return (
    <div className='grid-container'>
     <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Routes>
       <Route path="/" element={<Home />} />
      
    
    </Routes>
    </div>
   
  )
}

export default App
