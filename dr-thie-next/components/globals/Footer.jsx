import Image from "next/image";

import tallLogo from '../../public/logos/logo-tall.jpg';
import map from '../../public/images/googlemapsplaceholder.png'

export default function Footer({ styles }){

  return (
    <footer className={ [styles.footer, 'w-full flex flex-col my-4 pt-24'].join(' ') }>
      <article className="w-full flex flex-wrap justify-evenly items-center ">
        <div className="relative w-52 h-48 max-h-48 max-w-52 my-4 mx-8">
          <Image src={ tallLogo } alt="Dr. Ingrid Thie Family Dentistry" fill={ true } placeholder="empty" style={ {objectFit: 'cover'} } />
        </div>
        <div className="relative w-full h-52  sm:w-3/6 sm:h-6/6 lg:w-4/6 justify-self-end">
          <Image src={ map } alt="none" fill={ true } placeholder="empty" style={ {objectFit: 'cover'} }/>
        </div>
      </article>

      <article className={ [styles.foot, 'w-full py-8'].join(' ') }>
        <div className="flex flex-col ">
          <h5>Contact</h5>
          <p className="py-2">390 Commissioners Road West, London Ontario</p>
          <p className="py-2">(519) 472-7090</p>
          <p className="py-2">info@dringridthie.ca</p>
        </div>

      </article>

    </footer>
  );
}