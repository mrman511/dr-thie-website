import HighlightCard from "./HighlightCard";

export default function HighlightsList({ styles, highlights }){

  const parsedHighlights = highlights.map((highlight, i) => 
    <HighlightCard 
      styles={ styles }
      highlight={ highlight }
      i={ i }
    />
  )

  return(
    <section className={ [styles.highlightList, "w-full flex max-sm:flex-col sm:flex-wrap items-center"].join(' ') }>
      { parsedHighlights }
    </section>
  );
}