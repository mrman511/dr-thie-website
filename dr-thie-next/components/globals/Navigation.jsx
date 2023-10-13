import Link from "next/link";
import DropMenu from "./DropMenu";

import { useCycle } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Navigation({ styles, servicesList, isColumn}){

  const [showDropServices, togglesShowDropServices] = useCycle(false, true)
  const [showDropInformation, togglesShowDropInformation] = useCycle(false, true)

  let listClass = `w-full h-full flex ${ isColumn?'flex-col':'items-center flex-row flex-wrap' } justify-between`
  let lineClass = ` flex ${isColumn?'relative flex-col py-4 text-2xl':'justify-center mx-3 items-center text-xl'}   font-bold`
  let iconClass = `${isColumn?'w-12 h-[30px]':'w-8 '}`

  const serviceMenuList=[
    { id: 'preventive', title: 'Preventive' }, { id: 'restorative',title: 'Restorative' }, {id: 'cosmetic', title: 'Cosmetic'}
  ]

  const dropNavService = (
    <DropMenu 
      styles={ styles }
      list={ serviceMenuList }
      route='/services#'
      isColumn={ isColumn }
    />
  )

  const dropNavInformation = (
    <DropMenu 
      styles={ styles } 
      list={ servicesList } 
      route='/information?service='
      isColumn={ isColumn }
    />
  )

  return (
    <ul className={ listClass }>
      <li className={ ['', lineClass].join(' ')}>
        <Link href='/about'>About Us</Link>
      </li>
      <li  className={ [styles.navbarServices, lineClass].join(' ')} >
        <div className="flex items-center">
          <Link href='/services'>Services</Link>
          <FontAwesomeIcon icon={ faChevronDown } className={ iconClass } onClick={ togglesShowDropServices }/>
        </div>
        { !isColumn ? dropNavService : showDropServices && dropNavService  }
      </li>
      <li className={ [styles.navbarInformation, lineClass].join(' ')}>
        <div className="flex items-center">
          <Link href="/information">Patient Information</Link>
          <FontAwesomeIcon icon={ faChevronDown } className={ iconClass } onClick={ togglesShowDropInformation } />
        </div>
        { !isColumn ? dropNavInformation: showDropInformation && dropNavInformation }
      </li>
      <li className={ ['', lineClass].join(' ')}>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}