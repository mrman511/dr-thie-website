import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import ContactLinkBar from '@/components/globals/ContactLinkBar';
import CardList from '@/components/globals/CardList';
import ButtonLinkCard from '@/components/globals/ButtonLinkCard';
import globalStyles from '../styles/Globals.module.scss';

import Hero from '@/components/index/Hero';
import HighlightCard from '@/components/index/HighlightCard';
import ServiceCard from '@/components/index/ServiceCard';
import indexStyles from '../styles/Index.module.scss';

import { highlights } from '@/utils/data/highlights';
import { services } from '@/utils/data/services';

import { indexSevices } from '@/utils/data/headers';

import { newPatientsCard } from '@/utils/data/buttonCardLinks';

export const metadata = {
  title: 'Dr. Ingrid Thie Family Dentist'
}

export default function Home() {
  
  return (
    <>
    <Header styles={ globalStyles }/>
    <main className='p-4 flex flex-col items center'>
      <ContactLinkBar styles={ globalStyles } />
      <Hero styles={ indexStyles } globalStyles={ globalStyles }/>
      <CardList styles={ indexStyles } listClass={ indexStyles.highlightsList } CardComponent={ HighlightCard } cardData={ highlights } />
      <CardList styles={ indexStyles } listClass={ indexStyles.servicesList } CardComponent={ ServiceCard } cardData={ services } headerData={ indexSevices } />
      <ButtonLinkCard styles={ globalStyles } data={ newPatientsCard }/>
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}
