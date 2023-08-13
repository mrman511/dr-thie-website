import Image from "next/image";

export default function objCard({ styles, obj, i }){
  const image = require(`../../public/images/highlights/${obj.image.path}`)

  let darkenClass = 'absolute w-full h-full z-20 opacity-50 bg-blue-800'

  i % 1 !== 0 ? darkenClass += ' sm:bg-blue-500' : '';
  i === 1 || i === 2 ? darkenClass += ' sm:bg-blue-500' : '';
  i === 2 ? darkenClass += ' lg:bg-blue-800' : '';
  i === 3 ? darkenClass += ' lg:bg-blue-500' : '';

  return(
    <article className={ [styles.highlightCard, "relative w-11/12 sm:w-6/12 lg:w-3/12 max-sm:my-2 overflow-hidden"].join(' ') }>
      <div className={ darkenClass }></div>
      <div className={ [styles.imageContainer, "relative w-full scale-125 z-10"].join(' ') }>
        <Image 
          src={ image }
          alt={ obj.image.title }
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="absolute w-full flex flex-col z-20 bottom-4 min-[400px]:bottom-12 lg:bottom-4 px-2">
        <h4 className="text-lg font-semibold">{ obj.subtext }</h4>
        <h3 className="text-xl mt-4 mb-2 font-bold">{ obj.title }</h3>
        <p className="text-md">{ obj.text }</p>
        <a className="text-lg font-semibold mt-2 flex items-center" href={ obj.link.path }>
          { obj.link.title }
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 3 } stroke="currentColor" className="w-4 h-4 ms-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </a>
      </div>

    </article>
  );
}