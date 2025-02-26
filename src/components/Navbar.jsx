import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className='p-6 flex items-center justify-between px-6 bg-white'>
        <div className='flex items-center'>
        <h1 className='font-bold text-2xl mx-5 mr-10'>BabySteps</h1>
        <div>
            <ul className='flex  text-[gray]'>
                <li className='mr-4 '><Link to={'/'}>Home</Link></li>
                <li className='mr-4'><Link to={'/doctors'}>Doctors</Link></li>
                <li className='mr-4'>Appointments</li>
                <li className='mr-4'>Pregnancy Health</li>
            </ul>
        </div>
        </div>
        <div>
            <button className='bg-[#1c414b] text-[white] px-4 py-1 rounded-md'>Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
