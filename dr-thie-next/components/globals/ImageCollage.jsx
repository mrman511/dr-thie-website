import CollageImage from "./CollageImage";

export default function ImageCollage({styles, services}){
  // console.log(services);
  const randomSelection = services.map((service, i)=> <CollageImage key={`service-collage-${i}`} item={ service } styles={ styles }/>)

  return (
    <section className={ [styles.collage, 'w-full relative flex flex-wrap justify-center items-center py-24 px-4 overflow-x-hidden overflow-y-visable'].join(' ') }>
      { randomSelection }
    </section>
  );

}