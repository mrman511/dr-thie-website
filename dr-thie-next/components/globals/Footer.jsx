import Link from "next/link";
import Image from "next/image";
import ClinicHours from "./ClinicHours";
import trasparentLogo from '../../public/logos/logo-basic-transparent.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Footer({ styles, clinicData }){

  const { phone_number, street_address, city, region, postal_code  } = clinicData


  return (
    <footer className={ [styles.footer, 'w-full flex flex-wrap p-4 justify-center md:justify-evenly text-white'].join(' ') }>
      

      <article className='w-full max-w-max py-8 sm:w-3/6' >
        <div className="flex flex-col max-sm:items-center p-4 text-xl font-semibold">
          <Link href="/contact">
            <div className="flex items-center mb-2">
              <div className="relative w-[25px] h-[25px] bg-white rounded-sm overflow-hidden me-2">
                <Image src={ trasparentLogo } alt="Contact" fill styles={{ objectFit: 'cover' }} sizes="20px" />
              </div>
              <h5 className="font-bold" >Contact Us</h5>
            </div>
          </Link>

          <a target="_blank" href={`https://maps.google.com/?q=Dr.IngridThie`}>
            <div className="flex items-center">
              <div className="relative w-[25px] h-[25px] me-2">
                <FontAwesomeIcon icon={faMapLocationDot} className="w-full h-full"/>
              </div>
              <address className="py-2">
                <p >{ street_address }</p>
                <p >{`${city}, ${region}, ${postal_code} `}</p>
              </address>
            </div>
          </a>

          <Link href={`tel:${phone_number}`}>
            <div className="flex items-center mt-2">
              <div className="relative w-[25px] h-[25px] me-2">
                <FontAwesomeIcon icon={ faPhone } className="w-full h-full"/>
              </div>
              <p className="py-2">{ phone_number }</p>
            </div>
          </Link>
        </div>
      </article>

      <article className="max-w-max sm:w-3/6 p-4">
        <ClinicHours styles={ styles } days={ clinicData.hours }/>
      </article>

    </footer>
  );
}