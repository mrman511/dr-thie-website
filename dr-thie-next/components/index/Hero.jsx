import Image from "next/image";
import heroImage from '../../public/images/heroImage.jpeg'

export default function Hero({ styles }){

  return (
    <section className={ [styles.hero, 'w-full mt-4 relative'].join(' ') }>
      <div className="relative w-full h-96 ">
        <Image 
          src={ heroImage }
          alt="Dr Ingid Thie Family Dentist"
          style={ {objectFit: 'cover', objectPosition: '0% 70%'} }
          fill={ true }
          placeholder='blur'
          sizes="110vw"
          />
      </div>
    </section>
  );
}