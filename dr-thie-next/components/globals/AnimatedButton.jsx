import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedButton({ styles, isOpen, toggleState, }){

  return (
    <div onClick={ toggleState } className="p-2 hover:cursor-pointer border rounded-lg z-20">
        <AnimatePresence >
          { !isOpen && <div className=" relative flex flex-col items-center h-[36px] w-16 lg:hidden">
            <motion.div 
              key="closed-top"
              initial={{ top: '16px', rotate: 45 }}
              animate={{ top: '-4px', rotate: 0 }}
              exit={{}}
              className="absolute w-12 h-[4px] bg-blue-900 rounded-sm"
            >
            </motion.div>
            <motion.div
              key="closed-middle"
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              exit={{}}
              className="absolute w-10 top-2/4 translate-y-neg-2/4 h-[4px] bg-blue-900 rounded-sm"
            >
            </motion.div>
            <motion.div
              key="closed-bottom"
              initial={{ top: '16px', rotate: -45 }}
              animate={{ top: '36px', rotate: 0}}
              exit={{}}
              className="absolute w-12 h-[4px] bg-blue-900 rounded-sm"
            >
            </motion.div>
          </div> }

          { isOpen && <div className=" relative flex flex-col items-center h-[36px] w-16 lg:hidden">
            <motion.div 
              key="closed-top"
              initial={{ top: '-4px', rotate: 0 }}
              animate={{ top: '16px', rotate: 45 }}
              exit={{}}
              className="absolute w-12 h-[4px] bg-blue-900 rounded-sm"
            >
            </motion.div>
            <motion.div
              key="closed-middle"
              initial={{ width: '2.5rem' }}
              animate={{ width: 0 }}
              exit={{}}
              className="absolute w-10 top-2/4 translate-y-neg-2/4 h-[4px] bg-blue-900 rounded-sm"
            >
            </motion.div>
            <motion.div
              key="closed-bottom"
              initial={{ top: '36px', rotate: 0}}
              animate={{ top: '16px', rotate: -45 }}
              exit={{}}
              className="absolute w-12 h-[4px] bg-blue-900 rounded-sm"
            >
            </motion.div>
          </div>}
        </AnimatePresence>
      </div>
  );
}