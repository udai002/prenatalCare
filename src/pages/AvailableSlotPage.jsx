import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AvailableSlots from '../components/AvailableSlots'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { CirclesWithBar } from 'react-loader-spinner';

const AvailableSlotPage = () => {
  const params = useParams()
  const { id } = params
  const [selectedDate, setSelectedDate] = useState(Date.now())
  const [doctorDetails, setDoctorDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorLoading, setErrorLoading] = useState(false)

  const fetchDoctor = async () => {
    setIsLoading(true)
    const doctorDetails = await fetch(`${import.meta.env.VITE_API_URL}/apis/doctors/details/${id}`)
    if (doctorDetails.ok) {
      const details = await doctorDetails.json()
      setDoctorDetails(details.data)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setErrorLoading(true)
    }
  }

  useEffect(() => {
    fetchDoctor()
  }, [])

  console.warn(doctorDetails)
  const onDateChange = (e) => {
    console.log(e)
    setSelectedDate(e)
  }

  const onSuccess = () => <div className='flex flex-wrap'>
    <div className='p-5'>
      <div>
        <div className='flex flex-col items-center w-full'>
          <img src="/user.png" className='w-40' alt={doctorDetails.name} />
          <h1 className='mt-1 mb-3 font-semibold text-xl'>{doctorDetails.name}</h1>
        </div>
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Select Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="yyyy-MM-dd"
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
    <div className='flex grow'>
      <AvailableSlots doctorId={id} onBookSlot={onBookSlot} selectedDate={selectedDate} />
    </div>
  </div>

  const onLoading = ()=><div className='flex justify-center items-center w-full h-[80vh]'>
    <CirclesWithBar />
  </div>

  const onFailure = ()=><div className='flex justify-center items-center w-full h-[80vh]'>
  <h1 className='text-gray-600 font-bold text-3xl'>SomeThing went wrong </h1>
</div>


  const onBookSlot = () => {
  }
  return (
    <div>
      {isLoading && onLoading()}
      {doctorDetails && onSuccess()}
      {errorLoading && onFailure}
    </div>
  )
}

export default AvailableSlotPage
