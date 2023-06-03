import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import Blurb from '@/components/globals/Blurb';
import globalStyles from '../styles/Globals.module.scss';

import Hero from '@/components/index/Hero';
import QuickLinks from '@/components/index/QuickLinks';
import Services from '@/components/index/Services';
import indexStyles from '../styles/Index.module.scss';

import { placeholderBlurb } from '@/utils/data/blurbs';

export const metadata = {
  title: 'Dr. Ingrid Thie Family Dentist'
}

export default function Home() {


  return (
    <>
    <Header styles={ globalStyles }/>
    <main className='flex flex-col'>
      <Hero styles={ indexStyles }/>
      <Blurb styles={ globalStyles } info={ placeholderBlurb }/>
      <QuickLinks styles={ indexStyles }/>
      <Services styles={ indexStyles }/>
      <Blurb styles={ globalStyles } info={ placeholderBlurb }/>
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}
