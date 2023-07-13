import Image from "next/image";
import heroImage from '../../public/images/heroImage.jpeg';
import Blurb from "../globals/Blurb";

export default function Hero({ styles, globalStyles, info }){

  return (
    <section className={ [styles.hero, ' w-full mt-4 relative'].join(' ') }>
      <div className="relative w-full h-96 z-10">
        <Image 
          src={ heroImage }
          alt="Dr Ingid Thie Family Dentist"
          style={ {objectFit: 'cover', objectPosition: '0% 70%'} }
          fill={ true }
          placeholder='blur'
          sizes="110vw"
          />
        {/* <div className={ [styles.heroOverlay, 'w-full h-full absolute z-10'].join(' ') }></div> */}
      </div>
      <Blurb styles={ globalStyles } info={ info }/>
    </section>
  );
}