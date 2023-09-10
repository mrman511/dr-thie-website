import { motion} from "framer-motion";
import Link from "next/link";

export default function DropMenu({ styles, list, route, isColumn }){
  const textSize = isColumn?'text-xl':'text-lg'

  const parsedList = list.map((item, i) => 
        <Link key={`${ item.id }-link-${ i }`} href={`${ route }${ item.id }`} className="rounded-md my-1">
          <li className={`px-3 py-2 ${ textSize } font-semibold`}>{ item.title }</li>
        </Link>
  )

  return (
    <>
    { !isColumn ?
     <div className={ [styles.dropMenuRow, "w-full absolute overflow-hidden rounded-md z-50"].join(' ') }>
      <ul className={ ["", "relative w-full min-h-12 flex flex-wrap justify-evenly z-50"].join(' ') }>
        { parsedList }
      </ul>
    </div> :
    <motion.div
      key={ `mobile-drop-menu-${ route }` }
      initial={{ height: 0 }}
      animate={{ height: 'auto', transition: { duration: .3 } }}
      exit={{ height: 0, transition: { duration: .3 } }}
      className="relative w-48 ms-8 overflow-hidden">
      <ul className={ ["", "sticky min-h-max flex flex-col top-100 list-disc"].join(' ') }>
        { parsedList }
      </ul>
    </motion.div> }
    </>
  );
}