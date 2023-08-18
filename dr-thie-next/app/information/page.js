import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";
import globalStyles from '../../styles/Globals.module.scss';

import PatientInfo from "@/components/patientInfo/PatientInfo";
import infoStyles from '../../styles/Info.module.scss';

import { servicesList } from "@/utils/data/services/services";
import clinicData from "@/utils/data/clinicData";


export const metadata = {
  title: 'Patient Information - Dr. Ingrid Thie'
}
  
export default function Information({searchParams}) {
  
  return (
    <>
    <Header styles={ globalStyles }/>
    <main className={ [globalStyles.main, 'm-4 p-4 flex flex-wrap justify-center'].join(' ') }>
      <PatientInfo styles={ infoStyles } globalStyles={ globalStyles } searchParams={ searchParams } servicesList={ servicesList } />
    </main>
    <Footer styles={ globalStyles } clinicData={ clinicData }/>
    </>
  )
}