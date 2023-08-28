'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion, MotionConfig, useCycle } from "framer-motion";

import PatientInfoDefault from "@/components/patientInfo/PatientInfoDefault.jsx";
import PatientInfoPage from "@/components/patientInfo/PatientInfoPage";

import InfoNavList from "../globals/InfoNavList";

import getService from "@/utils/helpers/getService";

import AnimatedButton from "../globals/AnimatedButton";


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
      <AnimatePresence>
        {(searchParams.service  && !showInfoNav) && <article
          className={[styles.infoNavList, "absolute w-[40px] h-[30px] top-[20px] left-[2%] flex flex-col items-center rounded-sm z-20 overflow-hidden"].join(' ') }
          >
          <div
            onClick={ toggleShowInfoNav }
            className="absolute w-[40px] h-[30px] p-2"
            >
            <AnimatedButton key="show-info-nav-btn" isOpen={ showInfoNav } motionKey={ 'info-nav-button' } />
          </div>

          { showInfoNav &&
            <div
              key="patient-info-list"
              className="relative top-0 left-0 overflow-hidden"
            >
              <div
                key="information-list-container"
                className="relative min-w-max min-h-max"
                >
                <div className={ [styles.title, "py-4 w-full text-center"].join(' ') }>
                  <h3 className="text-2xl font-bold">Our Provided Services:</h3>
                </div>
                <div className="relative w-full px-4">
                  <InfoNavList styles={ globalStyles } services={ servicesList } router={ router } is_column={ true } size={'xl'}/>
                </div>
              </div>
            </div>
          }
        </article> }

        {(searchParams.service  && showInfoNav) && <motion.article
          initial={{ width: '40px', height: '30px' }}
          animate={{ width: 'auto', height: 'auto' }}
          exit={{ width: '40px', height: '30px' }}
          className={[styles.infoNavList, "absolute top-[20px] left-[2%] flex flex-col items-center rounded-sm z-20 overflow-hidden"].join(' ') }
          >
          <div
            onClick={ toggleShowInfoNav }
            className="absolute w-[40px] h-[30px] top-0 left-0 p-2 z-10"
            >
            <AnimatedButton key="show-info-nav-btn" isOpen={ showInfoNav } motionKey={ 'info-nav-button' } />
          </div>

          { showInfoNav &&
            <div className="relative top-0 left-0 overflow-hidden">
              <div
                key="information-list-container"
                className="relative min-w-max min-h-max"
                >
                <div className={ [styles.title, "pb-2 pt-6 w-full text-center"].join(' ') }>
                  <h3 className="text-2xl font-bold">Our Provided Services:</h3>
                </div>
                <div className="relative w-full px-4">
                  <InfoNavList styles={ globalStyles } services={ servicesList } router={ router } is_column={ true } size={'xl'}/>
                </div>
              </div>
            </div>
          }
        </motion.article> }


      </AnimatePresence>

      { !query && 
        <PatientInfoDefault key='patient-info-defautl' styles={ styles } globalStyles={ globalStyles } servicesList={ servicesList } router={ router }/>
      }

      { info && 
      <>
        <div className="relative w-full h-64">
          <div className="absolute w-full h-full bg-blue-700 opacity-30 z-10"></div> 
          <Image 
          alt={ info.title }
          src={ require(`../../public/images/services/photos/info-page/${ info.image_path }`) } 
          fill
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          sizes="100vw"
          />
        </div>
        <PatientInfoPage key="patient-info-page" info={ info } /> 
      </> }
    </>
  );
}