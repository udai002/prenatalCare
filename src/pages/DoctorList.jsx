import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { apiStatusListDoc } from '../context/DoctorContext'
import DoctorCard from '../components/Doctor'
import Navbar from '../components/Navbar'
import { CirclesWithBar } from 'react-loader-spinner'

const DoctorList = () => {
    const {doctors , apiStatusDoc } = useContext(DoctorContext)
    console.log(doctors , apiStatusDoc)

    const onLoading =()=>{
        return <div className='h-[80vh] w-full flex  justify-center items-center'>
            <CirclesWithBar color='#2b7fff'/>
        </div>
    }

    const renderDocs= ()=>{
        console.log(doctors)
        return <div className='flex flex-wrap grow'>{doctors.map(items=><DoctorCard doctor={items} />)}</div>
    }

    const onFailure = ()=>{

    }

    const renderFunction = ()=>{
        switch (apiStatusDoc) {
            case apiStatusListDoc.inProgress:
                return onLoading();
            case apiStatusListDoc.success:
                return renderDocs();
            case apiStatusListDoc.failure:
                return onFailure();
            
        }
    }

  return (
    <>
    <Navbar/>
    <div className='p-4'>
        {renderFunction()}
    </div>
    </>
  )
}

export default DoctorList
