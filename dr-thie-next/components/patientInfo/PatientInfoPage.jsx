import InfoSection from "./InfoSection"

export default function PatientInfoPage({ styles, info }){
  const parsedSections = info.patient_info.sections.map(section => <InfoSection key={ section.title } section={ section }/> )

  return (
    <section className="relative w-full md:w-5/6 text-lg sm:text-xl z-10">
      <article className="w-full flex flex-col mb-8">
        <div className="-mt-20 mb-28 h-0">
          <h2 className="w-full text-white text-center text-2xl sm:text-4xl font-bold mb-8">{ info.patient_info.title }</h2>
        </div>
        <p>{ info.patient_info.description }</p>
      </article>
      { parsedSections }
    </section>
  )
}