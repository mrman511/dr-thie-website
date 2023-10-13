import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ styles, obj }){

  const icon = require(`../../public/vectors/icons/${obj.icon}`)

  return(
    <Link href={ `/services#${obj.id}` }>
    <article className={ [styles.serviceCard, 'relative flex w-[250px] h-[250px] mb-2'].join(' ') }>
        <div className='absolute w-24 h-24 translate-x-neg-2/4 left-2/4 top-12 z-10'>
          <Image 
            src={ icon }
            alt={ obj.title }
            fill
            style={{ objectFit: 'contain' }}
            sizes="100px"
            />
        </div>

        <div className="w-full absolute text-center top-40">
          <h3 className="text-xl font-semibold">{ obj.title }</h3>
        </div>
    </article>
    </Link>
  );
}