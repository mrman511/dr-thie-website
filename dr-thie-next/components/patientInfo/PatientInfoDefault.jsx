import Image from "next/image";
import CardListHeader from "../globals/CardListHeader";

import image from '../../public/images/clinic-photos/hallway-tall.jpg';
// import image from '../../public/images/clinic-photos/exam-chair-and-window.jpg';

export default function PatientInfoDefault({ styles, globalStyles, }){

  const header = {
    title: 'Discover Essential Information About Our Services',
    subheading: `Welcome to our comprehensive resource hub where you can find everything you need to know about the dental services we offer. Whether you're seeking routine care or specialized treatments, we're here to guide you through the details and benefits of each service.`,
  }

  return (
    <section className="w-full flex flex-wrap justify-evenly items-center">
      <CardListHeader data={ header }/>
      <div className="w-72 h-[600px]"></div>
      <div className="hidden md:block relative h-[600px] w-96 rounded-xl overflow-hidden">
        <Image src={ image } alt="explore Info" fill style={{ objectFit: 'cover' }} sizes="500px" />
      </div>
    </section>
  )
}