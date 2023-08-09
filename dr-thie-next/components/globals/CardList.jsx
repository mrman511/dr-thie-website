import CardListHeader from "./CardListHeader"

export default function CardList({ styles, CardComponent, listClass, listId, cardData, headerData}){

  const hasHeader = headerData ? <CardListHeader styles={ styles } data={ headerData }/> : false;
  const id = listId ? listId : '';

  const parsedCards = cardData.map((obj, i) =>
    <CardComponent
      key={obj.title}
      styles={ styles }
      obj={ obj }
      i={ i }
    />
  )

  return(
    <section id={ id } className={ [listClass, "w-full flex flex-wrap items-center justify-center"].join(' ') }>
      { hasHeader && hasHeader }
      { parsedCards }
    </section>
  );
}