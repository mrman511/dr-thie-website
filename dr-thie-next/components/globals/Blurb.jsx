export default function Blurb({ styles, info, alt }){
  const className = alt ? [styles.blurb, styles.alt ].join(' ') : styles.blurb;

  let parsedList
  if (info.list){
    parsedList = info.list.map(item=><li className="font-semibold ms-4">{item}</li>)
  } 

  return (
    <article className={ [className, " w-full relative px-12 py-48 flex flex-col items-center z-20"].join(' ') }>
      { info.title && <h2 className="text-2xl font-bold">{ info.title }</h2> }
      <p>{ info.description }</p>
      { info.list && <ul className="w-max my-2 list-disc">
        { parsedList }
      </ul>}
      { info.end && <p>{ info.end }</p>}
    </article>
  );
}