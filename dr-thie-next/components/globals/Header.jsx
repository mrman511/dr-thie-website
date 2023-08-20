'use client'

import Image from "next/image";
import Link from "next/link";
import { useCycle, AnimatePresence, MotionConfig } from "framer-motion";
import logo from '../../public/logos/logo-full.jpg';

import Navigation from "./Navigation";
import AnimatedButton from "./AnimatedButton";
import MobileNav from "./MobileNav";

import { servicesList } from "@/utils/data/services/services";



export default function Header({ styles }){
  const [showMenu, toggleShowMenu] = useCycle(false, true);

  return (
    <header className={ [showMenu?'sticky top-0':'', "w-full h-[100px] sm:h-[110px] flex p-4 bg-white justify-between items-center z-50"].join(' ')}>
      <div className="w-4/6 sm:w-3/6 lg:w-2/6 h-16 sm:h-20 flex z-20">
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
      <div onClick={ toggleShowMenu } className="h-[40px] w-[50px] hover:cursor-pointer rounded-lg z-20 me-4 lg:hidden">
        <AnimatedButton key="mobile-menu-btn" styles={ styles } isOpen={ showMenu } motinKey='show-mobile-menu-btn'/>
      </div>

        <AnimatePresence mode="wait">
        <MotionConfig transition={{ duration: .3 }}>
          { showMenu && <MobileNav styles={ styles } servicesList={ servicesList } />}
        </MotionConfig>
        </AnimatePresence>

      <div className={ [styles.navbar, 'hidden relative lg:block mr-4'].join(' ') }>
        <Navigation styles={ styles } servicesList={ servicesList } />
      </div>

    </header>
  );
}