import Image from "next/image";
import Link from "next/link";
import logo from '../../public/logos/logo-full.jpg';

import { AnimatePresence } from "framer-motion";
// import { useState } from "react";


export default function Header({ styles }){

  // const [showNav, setShowNav] = useState(false)

  const dropNavService = (
    <div className={ [styles.dropServicesMenu, "w-full absolute overflow-hidden rounded-md"].join(' ') }>
      <ul className={ ["", "relative w-full min-h-12  flex flex-wrap justify-evenly z-50"].join(' ') }>
        <Link href='/services/#preventive-service-list'>
          <li className='px-3 py-2 text-lg font-semibold'>Preventive</li>
        </Link>
        <Link href='/services/#restorative-service-list'>
          <li className='px-3 py-2 text-lg font-semibold'>Restorative</li>
        </Link>
        <Link href='/services/#cosmetic-service-list'>
          <li className='px-3 py-2 text-lg font-semibold'>Cosmetic</li>
        </Link>
      </ul>
    </div>
  )


  return (
    <header className="w-full flex p-4 bg-white justify-between items-center">
      <div className="relative w-4/6 sm:w-3/6 lg:w-2/6 h-16 sm:h-20  flex">
        <Link href="/">
        <Image 
          src={ logo } 
          alt="Dr Ingid Thie Family Dentist"
          style={{objectFit: "contain"}}
          fill={ true }
          priority={ true }
          sizes='(max-width: 600px) 66vw, (max-width: 768) 50vw, 33vw'
          />
       </Link>
      </div>

      <div className="space-y-3 px-4 lg:hidden">
        <div className="w-12 h-1 bg-gray-600"></div>
        <div className="w-12 h-1 bg-gray-600"></div>
        <div className="w-12 h-1 bg-gray-600"></div>
      </div>

      <div className={ [styles.navbar, 'hidden relative lg:block mr-4'].join(' ') }>
        <ul className="flex items-center justify-between">
          <li className={ ['', 'mx-3 flex justify-center text-xl font-bold'].join(' ')}><Link href='/about'>About Us</Link></li>
          <li  className={ [styles.navbarServices, 'mx-3 flex justify-center text-xl font-bold'].join(' ')} >
            <Link href='/services'>Services</Link>
            { dropNavService }
          </li>
          <li className={ ['', 'mx-3 flex justify-center text-xl font-bold'].join(' ')}>Patient Information</li>
          <li className={ ['', 'mx-3 flex justify-center text-xl font-bold'].join(' ')}>Contact</li>
        </ul>
      </div>

    </header>
  );
}