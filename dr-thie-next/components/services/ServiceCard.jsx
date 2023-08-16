import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ styles, obj, i }){
  const image = require(`../../public/images/services/photos/${obj.image_path}`)
  
  return (
    <article id={ obj.id } className={ [styles.serviceCard, 'rounded-md relative flex flex-col w-[300px] h-[450px] mx-0 my-4 sm:m-4 overflow-hidden'].join(' ') }>
      <div className='relative w-full h-48'>
        <Image 
          src={ image }
          alt={ obj.title }
          fill
          style={{ objectFit: 'cover' }}
          sizes="250px"
        />
      </div>

      <div className="w-full flex flex-col items-center text-center top-40">
        <h3 className="text-xl font-semibold my-2">{ obj.title }</h3>
        <h4 className="text-lg mx-2">{ obj.subheading }</h4>
        <Link href={ `/information?service=${ obj.id }` } className='rounded-sm text-lg font-semibold my-2 px-4 py-2'>Learn More</Link>
        <Link href={'/contact'} className='rounded-sm text-lg font-semibold my-2 px-4 py-2'>Request Appointment</Link>
      </div>

    </article>
  );
}