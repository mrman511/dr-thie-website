import Image from "next/image";
import Link from "next/link";
import logo from '../../public/logos/logo-full.jpg';

export default function Header({ styles }){

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

      <div className='hidden relative lg:block mr-4'>
        <ul className="flex items-center justify-between">
          <Link href='/about'><li className='mx-3 text-xl font-bold'>About Us</li></Link>
          <Link href='/services'><li className='mx-3 text-xl font-bold'>Services</li></Link>
          <li className='mx-3 text-xl font-bold'>Patient Information</li>
          <li className='mx-3 text-xl font-bold'>Contact</li>
        </ul>

        <ul className={ [styles.dropMenu, "w-6/6 absolute flex flex-wrap justify-evenly z-50"].join(' ') }>
          <li className='mx-3 my-2 text-lg font-semibold'>Teeth Whitening</li>
          <li className='mx-3 my-2 text-lg font-semibold'>Invisalign</li>
          <li className='mx-3 my-2 text-lg font-semibold'>Low Level Laser Therapy</li>
          <li className='mx-3 my-2 text-lg font-semibold'>Infant Care</li>
        </ul>
      </div>

    </header>
  );
}