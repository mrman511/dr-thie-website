'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";
import globalStyles from '../../styles/Globals.module.scss';

import PatientInfoDefault from "@/components/patientInfo/PatientInfoDefault.jsx";
import infoStyles from '../../styles/Info.module.scss';
import { servicesList } from "@/utils/data/services/services";

// export const metadata = {
//   title: 'Patient Information - Dr. Ingrid Thie'
// }

export default function Information({searchParams}) {
  const router = useRouter();

  const [query, setQuery] = useState(null)

  useEffect(()=>{
    if (searchParams.service && searchParams !== query){
      setQuery(searchParams.service);
    } else if (!searchParams.service && query){
      setQuery(null)
    }
    console.log(query);
  }, [searchParams, query])

  return (
    <>
    <Header styles={ globalStyles }/>
    <main className={ [globalStyles.main, 'm-4 p-4'].join(' ') }>
      { !query && <PatientInfoDefault styles={ infoStyles } globalStyles={ globalStyles } services={ servicesList } router={ router }/>}
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}