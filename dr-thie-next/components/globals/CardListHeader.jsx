export default function CardListHeader({styles, data}){

  return(
    <article className={ [(styles? styles[data.classPrefix + 'ListHeader']: ''), 'w-full flex flex-col py-8 px-4'].join(' ') }>
      <div className="text-center justify-self-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{ data.title }</h2>
        { data.subheading && <h4 className="text-lg font-semibold sm:text-xl">{ data.subheading }</h4> }
      </div>
    </article>
  );
}