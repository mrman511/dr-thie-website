'use client'
import Image from "next/image";
import collageImageSizing from "@/utils/helpers/collageImageSizing";

export default function CollageImage({ styles, item }){
  const image = require(`../../public/images/services/${item.image_path}`);
  const width = image.default.width;
  const height = image.default.height;

  const sizeObj = collageImageSizing(image);

  return (
    <>
    <article className={ [styles.collageImage, "md:hidden relative"].join(" ") } style={ sizeObj.small }>
      <Image 
        src={ image }
        alt={ item.title }
        fill={ true }
        style={{ objectFit: 'cover' }}
        priority={ false }
        sizes="320px"
        />
    </article>

    <article className={[styles.collageImage, "hidden md:block 2xl:hidden  relative"].join(" ") } style={ sizeObj.med }>
      <Image 
        src={ image }
        alt={ item.title }
        fill={ true }
        style={{ objectFit: 'cover' }}
        priority={ false }
        sizes="500px"
        />
    </article>

    <article className={[styles.collageImage, "hidden 2xl:block  relative"].join(" ") } style={ sizeObj.wide }>
      <Image 
        src={ image }
        alt={ item.title }
        fill={ true }
        style={{ objectFit: 'cover' }}
        priority={ false }
        sizes="700px"
        />
    </article>
    </>
  );
}