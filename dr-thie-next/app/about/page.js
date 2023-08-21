import Image from 'next/image';
import officePanorama from '../../public/images/clinic-photos/office-panorama.jpg';

import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import globalStyles from '@/styles/Globals.module.scss';

import DrThie from '@/components/about/DrThie';

import clinicData from '@/utils/data/clinicData';


export const metadata = {
  title: 'About Us - Dr. Ingrid Thie'
}

export default function About() {

  return (
    <>
    <Header styles={ globalStyles }/>
    <main className={[globalStyles.main, 'flex flex-col m-4'].join(' ') }>
      <div className='relative w-full h-[250px]' >
        <Image src={ officePanorama } alt="office panorama" fill style={{ objectFit: 'cover' }} sizes="100vw"  />
      </div>
      <DrThie/>
    </main>
    <Footer styles={ globalStyles } clinicData={ clinicData }/>
    </>
  )
}