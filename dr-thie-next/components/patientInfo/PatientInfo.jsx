'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCycle } from "framer-motion";

import PatientInfoDefault from "@/components/patientInfo/PatientInfoDefault.jsx";
import PatientInfoPage from "@/components/patientInfo/PatientInfoPage";

import getService from "@/utils/helpers/getService";

export default function PatientInfo({ styles, globalStyles, searchParams, servicesList }){
  const router = useRouter();
  const [query, setQuery] = useState(null);
  const [info, setInfo] = useState(null);
  const [showInfoNav, toggleShowInfoNav] = useCycle(false, true)

  useEffect(()=>{
    if (searchParams.service && searchParams !== query){
      setQuery(searchParams.service);
    } else if (!searchParams.service && query){
      setQuery(null);
      setInfo(null);
    }
    
    if (query && !info){
      getService(query, setInfo)
    } else if (query && query !== info.id) {
      getService(query, setInfo)
      showInfoNav ? toggleShowInfoNav(): '';
    }
  }, [searchParams, query, info]) 

  return (
    <>
      { !query && 
        <PatientInfoDefault key='patient-info-defautl' styles={ styles } globalStyles={ globalStyles } servicesList={ servicesList } router={ router }/>
      }

      { info && <PatientInfoPage key="patient-info-page" info={ info } router={ router } servicesList={ servicesList } globalStyles={ globalStyles }/> }
    </>
  );
}