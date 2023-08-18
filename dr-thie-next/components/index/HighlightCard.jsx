import Image from "next/image";
import Link from "next/link";

export default function objCard({ styles, obj, i }){
  const image = require(`../../public/images/highlights/${obj.image.path}`)

  let darkenClass = 'absolute w-full h-full z-20 opacity-50 bg-blue-500'

  i % 1 !== 0 ? darkenClass += ' bg-blue-900' : '';
  i === 1 || i === 2 ? darkenClass += ' sm:bg-blue-800' : '';
  i === 2 ? darkenClass += ' lg:bg-blue-500' : '';
  i === 3 ? darkenClass += ' lg:bg-blue-800' : '';

  return(
    <article className={ [styles.highlightCard, "relative w-full h-[50vw] min-h-[220px] sm:w-6/12 sm:h-[33vw] lg:w-[25%] lg:h-[18vw] z-0 overflow-hidden"].join(' ') }>
      <Link href={ `/${ obj.route }#${ obj.id }` }>
        <div className={ darkenClass }></div>
        <div className={ [styles.imageContainer, "absolute h-[120%] w-[120%] z-10"].join(' ') }>
          <Image 
            src={ image }
            alt={ obj.image.title }
            style={{
              objectFit: 'cover',
            }}
            />
        </div>

        <div className="relative w-full h-full flex flex-col justify-center text-lg xl:text-xl z-20 px-2">
          <h4 className="font-semibold">{ obj.subtext }</h4>
          <h3 className="text-xl xl:text-2xl mt-4 mb-2 font-bold">{ obj.title }</h3>
          <p className="max-xl:text-md">{ obj.text }</p>
          <p className="font-semibold mt-2 flex items-center" href={ obj.link.path }>
            { obj.link.title }
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 3 } stroke="currentColor" className="w-4 h-4 ms-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </p>
        </div>

      </Link>
    </article>
  );
}