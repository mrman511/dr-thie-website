// 'use client'
import Image from "next/image";
import collageImageSizing from "@/utils/helpers/collageImageSizing";

import { AnimatePresence, motion, useCycle } from "framer-motion";

export default function CollageImage({ styles, item }){
  const image = require(`../../public/images/services/${item.image_path}`);

  const sizeObj = collageImageSizing(image);
  const rotation = `rotate(${sizeObj.rotation}deg)`

  sizeObj.small['transform'] = rotation;
  sizeObj.med['transform'] = rotation;
  sizeObj.large['transform'] = rotation;

  return (
    <>
    <article className={ [styles.collageImage, "md:hidden relative"].join(" ") } style={ sizeObj.small }>
      <div className={ [styles.imageContainer, "absolute w-full h-full overflow-hidden"].join(' ') }>
        <Image 
          src={ image }
          alt={ item.title }
          fill={ true }
          style={{ objectFit: 'cover' }}
          priority={ false }
          sizes="320px"
        />
        <div className={ [styles.title, "absolute z-2 bottom-0 w-full h-2/6 flex justify-center items-center"].join(' ')}>{ item.title }</div>
      </div>
    </article>
    <article className={[styles.collageImage, "hidden md:block 2xl:hidden relative"].join(" ") } style={ sizeObj.med }>
      <div className={ [styles.imageContainer, "absolute w-full h-full "].join(' ') }>
        <Image 
          src={ image }
          alt={ item.title }
          fill={ true }
          style={{ objectFit: 'cover' }}
          priority={ false }
          sizes="500px"
        />
        <div className={ [styles.title, "absolute z-2 bottom-0 w-full h-2/6 flex justify-center items-center"].join(' ')}>{ item.title }</div>
      </div>
    </article>
    <article className={[styles.collageImage, "hidden 2xl:block relative"].join(" ") } style={ sizeObj.wide }>
      <div className={ [styles.imageContainer, "absolute w-full h-full "].join(' ') }>
        <Image 
          src={ image }
          alt={ item.title }
          fill={ true }
          style={{ objectFit: 'cover' }}
          priority={ false }
          sizes="700px"
        />
        <div className={ [styles.title, "absolute z-2 bottom-0 w-full h-2/6 flex justify-center items-center"].join(' ')}>{ item.title }</div>
      </div>
    </article>
    </>
  );
}