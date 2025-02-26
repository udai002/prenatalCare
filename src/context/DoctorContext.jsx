import { createContext, useEffect, useState } from "react";

export const  DoctorContext = createContext();

export const apiStatusListDoc = {
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    inProgress:"INPROGRESS"
}

export const DoctorProvider = ({children})=>{

    const [doctors , setDoctors] = useState([])
    const [apiStatusDoc , setApiStatusDoc] = useState(apiStatusListDoc.initial)

    console.log(import.meta.env.VITE_API_URL)
    const fetchDoc = async ()=>{
        setApiStatusDoc(apiStatusListDoc.inProgress)
        const apiUrl = `${import.meta.env.VITE_API_URL}/apis/doctors`
        const response = await fetch(apiUrl)
        if(response.ok){
            const doctorDetails = await response.json()
            setDoctors(doctorDetails.data)
            setApiStatusDoc(apiStatusListDoc.success)
        }else{
            setApiStatusDoc(apiStatusListDoc.failure)
        }
    }

    useEffect(()=>{
        fetchDoc()
    },[])   
    

    return <DoctorContext.Provider value={{apiStatusDoc , doctors}}>
        {children}
    </DoctorContext.Provider>
}
