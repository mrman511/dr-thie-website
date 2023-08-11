import tallLogo from '../../public/logos/logo-tall.jpg';
import Image from 'next/image';

import Map from './Map';

export default function MapSection(){

  return (
    <article className="w-full flex flex-wrap justify-evenly items-center self-center bg-white">
      <div className="relative w-52 h-48 max-h-48 max-w-52 my-4">
        <Image src={ tallLogo } alt="Dr. Ingrid Thie Family Dentistry" fill={ true } placeholder="empty" style={ {objectFit: 'contain'} } />
      </div>
      <Map />
    </article>
  );
}