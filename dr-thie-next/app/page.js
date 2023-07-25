import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import ContactLinkBar from '@/components/globals/ContactLinkBar';
import Blurb from '@/components/globals/Blurb';
import ImageCollage from '@/components/globals/ImageCollage';
import globalStyles from '../styles/Globals.module.scss';

import Hero from '@/components/index/Hero';
import HighlightsList from '@/components/index/Highlights/HighlightsList';
import QuickLinks from '@/components/index/QuickLinks';
import Services from '@/components/index/Services';
import indexStyles from '../styles/Index.module.scss';

import { placeholderBlurb } from '@/utils/data/blurbs';
import { highlights } from '@/utils/data/highlights';
import { services } from '@/utils/data/services';

export const metadata = {
  title: 'Dr. Ingrid Thie Family Dentist'
}

export default function Home() {
  
  return (
    <>
    <Header styles={ globalStyles }/>
    <main className='p-4 flex flex-col'>
      <ContactLinkBar styles={ globalStyles } />
      <Hero styles={ indexStyles } globalStyles={ globalStyles }/>
      <HighlightsList styles={ indexStyles } highlights={ highlights }/>
      {/* <QuickLinks styles={ indexStyles }/> */}
      {/* <Services styles={ indexStyles }/> */}
      {/* <ImageCollage styles={ globalStyles } services={ services }/> */}
      {/* <Blurb styles={ globalStyles } info={ placeholderBlurb }/> */}
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}
