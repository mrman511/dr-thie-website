import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import ContactLinkBar from '@/components/globals/ContactLinkBar';
import CardList from '@/components/globals/CardList';
import ButtonLinkCard from '@/components/globals/ButtonLinkCard';
import MapSection from '@/components/globals/MapSection';
import globalStyles from '../styles/Globals.module.scss';

import Hero from '@/components/index/Hero';
import HighlightCard from '@/components/index/HighlightCard';
import ServiceCard from '@/components/index/ServiceCard';
import indexStyles from '../styles/Index.module.scss';

import clinicData from '@/utils/data/clinicData';
import { highlights } from '@/utils/data/highlights';
import { indexSevices } from '@/utils/data/headers';
import { serviceHighlights } from '@/utils/data/highlights';


import { newPatientsCard } from '@/utils/data/buttonCardLinks';

export const metadata = {
  title: 'Dr. Ingrid Thie Family Dentist'
}

export default function Home() {

  
  return (
    <>
    <Header styles={ globalStyles }/>
    <main className={ [indexStyles.main, 'm-4 pb-0 flex flex-col items-center z-10'].join(' ')}>
      <ContactLinkBar styles={ globalStyles } />
      <Hero styles={ indexStyles }/>
      <CardList styles={ indexStyles } listClass={ indexStyles.highlightsList } CardComponent={ HighlightCard } cardData={ highlights } />
      <CardList styles={ indexStyles } listClass={ indexStyles.servicesList } CardComponent={ ServiceCard } cardData={ serviceHighlights } headerData={ indexSevices } />
      <ButtonLinkCard styles={ globalStyles } data={ newPatientsCard }/>
      <MapSection clinicData={ clinicData }/>
    </main>
    <Footer styles={ globalStyles } clinicData={ clinicData }/>
    </>
  )
}
