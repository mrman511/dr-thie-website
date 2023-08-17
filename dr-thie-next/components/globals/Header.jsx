import Image from "next/image";
import Link from "next/link";
import logo from '../../public/logos/logo-full.jpg';
import DropMenu from "./DropMenu";
import { servicesList } from "@/utils/data/services/services";
// import { useState } from "react";



export default function Header({ styles }){

  const serviceMenuList=[
    { id: 'preventive', title: 'Preventive' }, { id: 'restorative',title: 'Restorative' }, {id: 'cosmetic', title: 'Cosmetic'}
  ]

  const dropNavService = (
    <DropMenu 
      styles={ styles }
      list={ serviceMenuList }
      route='/services#'
    />
  )

  const dropNavInformation = (
    <DropMenu 
      styles={ styles } 
      list={ servicesList } 
      route='/information?service='
    />
  )


  return (
    <header className="w-full flex p-4 bg-white justify-between items-center">
      <div className="w-4/6 sm:w-3/6 lg:w-2/6 h-16 sm:h-20  flex">
        <Link href="/" className="relative w-full h-full">
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
          <li className={ [styles.navbarInformation, 'mx-3 flex justify-center text-xl font-bold'].join(' ')}>
            <Link href="/information">Patient Information</Link>
            { dropNavInformation }
          </li>
          <li className={ ['', 'mx-3 flex justify-center text-xl font-bold'].join(' ')}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

    </header>
  );
}