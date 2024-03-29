'use client'

import tallLogo from '../../public/logos/logo-tall.jpg';
import Image from 'next/image';

import Map from './Map';

export default function MapSection({ clinicData }){

  return (
    <article className="w-full flex flex-wrap justify-evenly items-center self-center bg-white">
      <div className="relative w-52 h-48 max-h-48 max-w-52 my-4">
        <Image src={ tallLogo } alt="Dr. Ingrid Thie Family Dentistry" fill={ true } sizes="200px" placeholder="empty" style={ {objectFit: 'contain'} } />
      </div>
      <section className="relative w-full h-72 my-4 sm:w-3/6 sm:h-6/6 lg:w-4/6 justify-self-end rounded-lg overflow-hidden">
        <Map clinicData={ clinicData }/>
      </section>
    </article>
  );
}