import Image from "next/image";

export default function ServiceCard({ styles, obj, i }){
  console.log(obj);
  const image = require(`../../public/images/services/photos/${obj.image_path}`)
  
  return (
    <article className={ [styles.serviceCard, 'rounded-md relative flex flex-col w-[300px] h-[450px] m-4 overflow-hidden'].join(' ') }>
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
        <h4>{ obj.subheading }</h4>
        <a className='rounded-sm text-lg font-semibold my-2 px-4 py-2' href="">Learn More</a>
        <a className='rounded-sm text-lg font-semibold my-2 px-4 py-2' href="">Request Appointment</a>
      </div>

    </article>
  );
}