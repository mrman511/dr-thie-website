import { services } from "@/utils/data/services";
import Image from "next/image";
import toothSvg from '../../public/vectors/icons/tooth.svg';

export default function ServiceCard({ styles, obj }){

  return(
    <article className={ [styles.serviceCard, 'relative flex w-[250px] h-[300px]'].join(' ') }>
      <div className='absolute w-16 h-16 translate-x-neg-2/4 left-2/4 top-12 z-10'>
        <Image 
          src={ toothSvg }
          alt='toothSvg'
          fill
          style={{ objectFit: 'contain' }}
          sizes="100px"
        />
      </div>

      <div className={ [styles.accentCircle, "absolute translate-x-neg-2/4 translate-y-neg-4/4 left-2/4 top-24"].join(' ')}></div>

      <div className="w-full absolute text-center top-40">
        <h3 className="text-xl">{ obj.title }</h3>
        <p className="text-md">{ obj.description }</p>
      </div>

    </article>
  );
}