import Header from '@/components/globals/Header';
import Footer from '@/components/globals/Footer';
import CardList from '@/components/globals/CardList';
import globalStyles from '@/styles/Globals.module.scss';

import ServiceCard from '@/components/services/ServiceCard';
import serviceStyles from '../../styles/Service.module.scss'

import { listofTags, objsWithTag} from '@/utils/helpers/tags';
import { services } from '@/utils/data/services';
import { serviceListHeaders } from '@/utils/data/headers';

export const metadata = {
  title: 'Services - Dr. Ingrid Thie'
}

export default function Services() {
  const tags = listofTags(services)
  const lists = tags.map(tag => {
    const taggedServices = objsWithTag(tag, services);
    if (taggedServices){
      return (
        <CardList
        key={ `${tag}-service-list` } 
        styles={ serviceStyles } 
        listClass={ serviceStyles[tag + 'List'] } 
        listId={ `${tag}-service-list` } 
        CardComponent={ ServiceCard } 
        cardData={ taggedServices } 
        headerData={ serviceListHeaders[tag] }
        />
      );
    }
  })

  return (
    <>
    <Header styles={ globalStyles }/>
    <main id='servicesLists' className='flex flex-col items-center'>
      <section className={ [serviceStyles.serviceLists, 'w-11/12 my-4 flex flex-col'].join(' ')}>
        { lists }
      </section>
    </main>
    <Footer styles={ globalStyles }/>
    </>
  )
}