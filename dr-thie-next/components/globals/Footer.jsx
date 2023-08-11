export default function Footer({ styles }){

  return (
    <footer className={ [styles.footer, 'w-full flex flex-col'].join(' ') }>
      

      <article className={ [styles.foot, 'w-full py-8'].join(' ') }>
        <div className="flex flex-col ">
          <h5>Contact</h5>
          <p className="py-2">390 Commissioners Road West, London Ontario</p>
          <p className="py-2">(519) 472-7090</p>
          <p className="py-2">info@dringridthie.ca</p>
        </div>

      </article>

    </footer>
  );
}