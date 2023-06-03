import Image from "next/image";

import cosmetic from '../../public/vectors/cosmetic.svg';
import restorative from '../../public/vectors/restorative.svg';

export default function QuickLinks({ styles }){

  return (
    <article className={ [styles.quickLinks, "w-5/6 max-w-3xl flex self-center -mt-12 -mb-4 z-10 "].join(" ") }>

      <div className={ [styles.quickLink, "relative w-3/6 h-42 p-4 flex flex-col items-center justify-center text-center"].join(' ')}>
        <div className="relative w-full h-24">
          <Image src={ cosmetic } alt="Cosmetic Services" 
            fill={true}
            style={{ objectFit: "contain" }}
            // placeholder="blur"
            sizes="100px"
            />
        </div>
        <h4 className="w-full">Cosmetic Services</h4>
      </div>

      <div className={ [styles.quickLink, "relative w-3/6 h-42 p-4 flex flex-col items-center justify-center text-center"].join(' ')}>
        <div className="relative w-full h-24">
          <Image src={ restorative } alt="Restorative Services" 
            fill={true}
            style={{ objectFit: "contain" }}
            // placeholder="blur"
            sizes="100px"
            />
        </div>
        <h4 className="w-full">Restorative Services</h4>
      </div>

    </article>
  );
}