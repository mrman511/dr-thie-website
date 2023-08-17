import Link from "next/link";
import DropMenu from "./DropMenu";

export default function Navigation({ styles, servicesList, isColumn }){

  let listClass = `w-full h-full flex ${ isColumn?'flex-col':'items-center' } justify-between`
  let lineClass = ` flex ${isColumn?'relative':'justify-center mx-3'} text-xl font-bold`

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
    <ul className={ listClass }>
      <li className={ ['', lineClass].join(' ')}>
        <Link href='/about'>About Us</Link>
      </li>
      <li  className={ [styles.navbarServices, lineClass].join(' ')} >
        <Link href='/services'>Services</Link>
        { dropNavService }
      </li>
      <li className={ [styles.navbarInformation, lineClass].join(' ')}>
        <Link href="/information">Patient Information</Link>
        { dropNavInformation }
      </li>
      <li className={ ['', lineClass].join(' ')}>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  );
}