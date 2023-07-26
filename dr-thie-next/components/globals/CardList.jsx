import CardListHeader from "./CardListHeader"

export default function IndexCardList({ styles, CardComponent, listClass, cardData, headerData}){

  const hasHeader = headerData ? <CardListHeader styles={ styles } data={ headerData }/> : false;

  const parsedCards = cardData.map((obj, i) =>
    <CardComponent 
      styles={ styles }
      obj={ obj }
      i={ i }
    />
  )

  return(
    <section className={ [listClass, "w-full flex flex-wrap items-center justify-center"].join(' ') }>
      { hasHeader && hasHeader }
      { parsedCards }
    </section>
  );
}