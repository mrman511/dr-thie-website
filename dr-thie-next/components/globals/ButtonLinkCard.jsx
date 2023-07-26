'use client'
export default function ButtonLinkCard({ styles, data }){

  const styleString = data.className + 'ButtonLinkCard'
  console.log(styles)

  return(
    <section className={ [styles[styleString], 'w-full flex flex-col items-center text-center self-center py-12 px-8'].join(' ') }>
      <h2 className="text-2xl sm:text-3xl mb-4">{ data.title }</h2>
      { data.description && <h4 className="text-lg sm:text-xl">{ data.description }</h4> }
      <a href={ data.link.path } className="mt-8 py-2 px-4 text-xl rounded-md">{ data.link.title }</a>
    </section>
  );

}