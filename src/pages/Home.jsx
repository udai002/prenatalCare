import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { DoctorContext } from '../context/DoctorContext'
import DoctorCard from '../components/Doctor'
import { Link } from 'react-router-dom'

const Home = () => {
  const { doctors } = useContext(DoctorContext)
  console.log(doctors)
  return (
    <div>
      <Navbar />
      <div className='px-10 pt-5'>
        <div className='bg-[url("/banner1.png")] flex flex-col justify-center h-96 px-6 w-full bg-no-repeat bg-cover rounded-md'>
          <h1 className='font-bold text-3xl '>Book An Appointment</h1>
          <p className='font-semibold pt-2'>Your doctor is just click away , Book your slot in advance with your doctor now.</p>
        </div>

        <div>
          <div className='flex justify-between items-center'>
          <h1 className='mt-5 font-bold text-3xl mb-4'>Doctors</h1>
          <div className='mr-10'><Link to={'/doctors'} className='font-bold '>See All</Link></div>
          </div>
          <div className='flex overflow-x-scroll '>
            {doctors.slice(0 ,7).map(item=><DoctorCard doctor={item}/>)}
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Home
