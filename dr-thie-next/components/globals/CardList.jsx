import CardListHeader from "./CardListHeader"

export default function CardList({ styles, CardComponent, listClass, listId, cardData, headerData}){

  const hasHeader = headerData ? <CardListHeader styles={ styles } data={ headerData }/> : null;
  const id = listId ? listId : '';
  console.log(id);

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