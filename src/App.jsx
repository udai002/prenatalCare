import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { DoctorProvider } from './context/DoctorContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DoctorList from './pages/DoctorList'
import AvailableSlotPage from './pages/AvailableSlotPage'

function App() {
  const [count, setCount] = useState(0)



  return (
    <DoctorProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/doctors' Component={DoctorList}/>
        <Route path='/availabbeSlots/:id' Component={AvailableSlotPage}/>
      </Routes>
      </BrowserRouter>
    </DoctorProvider>
  )
}

export default App
