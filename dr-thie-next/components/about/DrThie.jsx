import { drThie as dentist } from "@/utils/data/employees";

export default function Dentist(){

  const baseClasses = 'w-6/6 sm:w-5/6 md:w-4/6 px-4 sm:px-8 py-2 text-center self-center'

  const parsedSections = dentist.sections.map((section, i)=> {
    return (
      <article className={  baseClasses }>
        <h4 className="text-xl md:text-2xl font-semibold mb-2">{ section.title }</h4>
        <p className="text-lg md:text-xl">{ section.description }</p>
      </article>
    )
  })

  return (
    <section className={ "w-full flex flex-col items-center py-8"}>
      <article className={ baseClasses }>
        <h2 className="text-2xl md:text-4xl font-bold mb-2" >{dentist.name}, <span className="font-medium">{ dentist.designation.acronym }</span></h2>
        <h4 className="text-xl md:text-2xl font-semibold italic mb-2" >{ dentist.subheading }</h4>
        <p className="text-lg md:text-xl">{ dentist.description }</p>
      </article>
      { parsedSections }
    </section>
  );
}