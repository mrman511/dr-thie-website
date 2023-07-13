import Image from "next/image";

import infantTeeth from '../../public/images/services/infantTeeth.jpg'
import oralCancer from '../../public/images/services/oralCancer.jpg'
import invisalign from '../../public/images/services/invisalign.jpeg'
import cleaning from '../../public/images/services/cleaning.jpeg'

export default function Services({styles}){

  return (
    <section className={ [styles.services, 'relative py-24 grid self-center w-full grid-cols-12 grid-rows-1 auto-rows-fr'].join(' ') }>
      <div className="relative col-start-auto col-span-12 row-span-1 w-auto m-2 h-72 sm:col-span-6 sm:h-80">
        <Image src={ infantTeeth } alt="Infant Teeth" fill={ true } placeholder="blur" style={{ objectFit: 'cover', objectPosition: "center" }}/>
      </div>
      <div className="relative col-start-auto col-span-12 row-span-1 w-auto m-2 h-72 sm:col-span-6 sm:h-80">
        <Image src={ invisalign } alt="Invisalign" fill={ true } placeholder="blur" style={{ objectFit: 'cover', objectPosition: "top" }}/>
      </div>
      <div className="relative col-span-full row-span-1 w-auto m-2 h-72 sm:h-80">
        <Image src={ oralCancer } alt="Oral Cancer" fill={ true } placeholder="blur" style={{ objectFit: 'cover', objectPosition: "" }}/>
      </div>
      <div className="relative col-span-full row-span-1 w-auto m-2 h-72 sm:h-80 sm:col-start-3 sm:col-end-9">
        <Image src={ cleaning } alt="Routine Cleaning" fill={ true } placeholder="blur" style={{ objectFit: 'cover', objectPosition: "top" }}/>
      </div>
    </section>
  );
}