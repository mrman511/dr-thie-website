import InfoListItem from "./InfoListItem"

export default function InfoSection({ section }){
  const id = section.title ? section.titile : ''

  let parsedList = (<></>)

  if (section.info_list){
    parsedList = section.info_list.list.map(info => <InfoListItem key={ info.heading } info={ info } />)
    parsedList = section.info_list.is_ordered ? 
      <ol className="list-decimal">{ parsedList }</ol> : 
      <ul className="list-disc">{ parsedList }</ul>;
  }

  return (
    <article id={ id } className="my-20">
      <h3 className="text-2xl sm:text-3xl font-semibold mb-4">{ section.title }</h3>
      <p className="">{ section.description }</p>
      { parsedList }
    </article>
  )
}