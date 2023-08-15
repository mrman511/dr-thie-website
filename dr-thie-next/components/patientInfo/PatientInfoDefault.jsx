import Image from "next/image";
import CardListHeader from "../globals/CardListHeader";
import InfoNavList from "../globals/InfoNavList";

import image from '../../public/images/clinic-photos/hallway-tall.jpg';
// import image from '../../public/images/clinic-photos/exam-chair-and-window.jpg';

export default function PatientInfoDefault({ styles, globalStyles, services, router }){

  const header = {
    title: 'Discover Essential Information About Our Services',
    subheading: `Welcome to our comprehensive resource hub where you can find everything you need to know about the dental services we offer. Whether you're seeking routine care or specialized treatments, we're here to guide you through the details and benefits of each service.`,
  }

  return (
    <section className="w-full flex flex-wrap justify-evenly items-center">
      <CardListHeader data={ header }/>
      <article className={[styles.infoNavList, "relative w-72 flex flex-col items-center rounded-xl"].join(' ') }>
        <div className={ [styles.title, "py-4 w-full text-center"].join(' ') }>
          <h3 className="text-2xl font-bold">Our Provided Services:</h3>
        </div>
        <div className="relative w-full h-[600px]  px-4">
          <InfoNavList styles={ globalStyles } services={ services } router={ router } is_column={ true } size={'xl'}/>
        </div>
      </article>
      <div className="hidden md:block relative h-[600px] w-96 rounded-xl overflow-hidden">
        <Image src={ image } alt="explore Info" fill style={{ objectFit: 'cover' }} sizes="500px" />
      </div>
    </section>
  )
}