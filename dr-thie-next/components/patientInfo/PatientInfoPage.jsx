import InfoSection from "./InfoSection"
import Image from "next/image"

export default function PatientInfoPage({ styles, info }){
  const parsedSections = info.patient_info.sections.map((section, i) => <InfoSection 
    key={ section.title ? section.title : `${info.patient_info.title}-section-${i}`  } 
    section={ section }
  /> )
  let displayImage
  try {
    displayImage = require(`../../public/images/services/photos/info-page/${ info.image_path }`)
  } catch (error) {
    displayImage = null
  }

  return (
    <>
    <div className="relative w-full h-64">
      <div className="absolute w-full h-full bg-blue-700 opacity-30 z-10"></div> 
      { displayImage && <Image 
      alt={ info.title }
      src={ displayImage } 
      fill
      style={{ objectFit: 'cover', objectPosition: 'top' }}
      sizes="100vw"
      /> }
    </div>
    <section className="relative w-full mx-auto md:w-5/6 text-lg sm:text-xl z-10">
      <article className="w-full flex flex-col mb-8">
        <div className="-mt-20 mb-28 h-0">
          <h2 className="w-full text-white text-center text-2xl sm:text-4xl font-bold mb-8">{ info.patient_info.title }</h2>
        </div>
        <p>{ info.patient_info.description }</p>
      </article>
      { parsedSections }
    </section>
    </>
  )
}