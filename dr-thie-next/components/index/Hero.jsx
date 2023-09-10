import Image from "next/image";
import Link from "next/link";
import heroImage from '../../public/images/hero-image.jpg';

export default function Hero({ styles }){

  return (
    <section className={ [styles.hero, 'w-full relative lg:h-96 lg:overflow-hidden'].join(' ') }>
      <div className={[styles.imageContainer, "relative w-full h-96 lg:absolute lg:start-1/4 lg:ms-20"].join(' ')}>
        <Image 
          src={ heroImage }
          alt="Dr Ingid Thie Family Dentist"
          style={ {objectFit: 'cover', objectPosition: '0% 70%'} }
          fill={ true }
          placeholder='blur'
          sizes="110vw"
          />
      </div>
      <article className={[styles.message, "w-full lg:px-8 lg:h-full lg:absolute lg:z-20 lg:top-0 lg:pe-96"].join(' ') }>
        <div className="h-full flex p-4 flex-col items-start justify-evenly lg:w-96 lg:ms-20">
          <div className="text-md sm:text-xl">
            <p>Proudly serving the community of London Ontario for over 25 years!</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold my-4">
            <h3 className=''>Bringing Smiles to Life: Your Dental Care Experts</h3>
          </div>
          <div className="text-md sm:text-lg font-semibold">
            <p>Call us today to book an appointment!</p>
          </div>
          <Link href="/contact">
            <button className="rounded-md w-48 h-12 mt-4 text-2xl self-center">Contact Us Today!</button>
          </Link>
        </div>
      </article>
    </section>
  );
}