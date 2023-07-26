export default function CardListHeader({styles, data}){

  return(
    <article className={ [styles[data.classPrefix + 'ListHeader'], 'w-full flex flex-col py-8 px-4'].join(' ') }>
      <div className="text-center justify-self-center">
        <h2 className="text-2xl sm:text-3xl mb-4">{ data.title }</h2>
        { data.description && <h4 className="text-lg sm:text-xl">{ data.description }</h4> }
      </div>
    </article>
  );
}