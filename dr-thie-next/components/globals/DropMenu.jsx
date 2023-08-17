import Link from "next/link";

export default function DropMenu({ styles, list, route }){

  const parsedList = list.map((item, i) => 
        <Link key={`${ item.id }-link-${ i }`} href={`${ route }${ item.id }`} className="rounded-md">
          <li className='px-3 py-2 text-lg font-semibold'>{ item.title }</li>
        </Link>
  )

  return (
    <div className={ [styles.dropMenu, "w-full absolute overflow-hidden rounded-md z-50"].join(' ') }>
      <ul className={ ["", "relative w-full min-h-12  flex flex-wrap justify-evenly z-50"].join(' ') }>
        { parsedList }
      </ul>
    </div>
  );
}