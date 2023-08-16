'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import PatientInfoDefault from "@/components/patientInfo/PatientInfoDefault.jsx";
import PatientInfoPage from "@/components/patientInfo/PatientInfoPage";


import getService from "@/utils/helpers/getService";



export default function PatientInfo({ styles, globalStyles, searchParams, servicesList }){
  const router = useRouter();
    
  const [query, setQuery] = useState(null);
  const [info, setInfo] = useState(null);
  let image;

  useEffect(()=>{
    if (searchParams.service && searchParams !== query){
      setQuery(searchParams.service);
    } else if (!searchParams.service && query){
      setQuery(null);
      setInfo(null);
    }

    if (query && !info){
      getService(query, setInfo)
    }
  }, [searchParams, query, info, image]) 

  return (
    <>
      { !query && <PatientInfoDefault styles={ styles } globalStyles={ globalStyles } services={ servicesList } router={ router }/>}
      { info && 
      <>
        <div className="relative w-full h-52">
          <div className="absolute w-full h-full bg-blue-700 opacity-30 z-10"></div> 
          <Image 
          alt={ info.title }
          src={ require(`../../public/images/services/photos/${ info.image_path }`) } 
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          />
        </div>
        <PatientInfoPage info={ info } /> 
      </> }
    </>
  );
}