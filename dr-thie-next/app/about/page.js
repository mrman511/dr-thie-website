import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import globalStyles from '@/styles/Globals.module.scss';

import DrThie from '@/components/about/DrThie';

import aboutStyles from '@/styles/About.module.scss'


export const metadata = {
  title: 'About Us - Dr. Ingrid Thie'
}

export default function About() {

  return (
    <>
    <Header styles={ globalStyles }/>
    <main className='flex flex-col'>
     <DrThie styles={ aboutStyles }/>
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}