import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedButton({ isOpen, motionKey }){

  return (
    <AnimatePresence >
      { !isOpen && <div className="w-full h-full relative flex flex-col items-center">
        <motion.div 
          key={ motionKey + "-closed-top" }
          initial={{ translateY: '-50%', top: '50%', rotate: 45 }}
          animate={{ top: 0, rotate: 0 }}
          exit={{}}
          className="absolute w-full h-[10%] bg-blue-900 rounded-sm"
        >
        </motion.div>
        <motion.div
          key={ motionKey + "-closed-middle" }
          initial={{ translateY: '-50%', width: 0, top: '50%' }}
          animate={{ width: '80%' }}
          exit={{}}
          className="absolute w-[80%] h-[10%] bg-blue-900 rounded-sm"
        >
        </motion.div>
        <motion.div
          key={ motionKey + "-closed-bottom" }
          initial={{ translateY: '-50%', top: '50%', rotate: -45 }}
          animate={{ top: '100%', rotate: 0}}
          exit={{}}
          className="absolute w-full h-[10%] bg-blue-900 rounded-sm"
        >
        </motion.div>
      </div> }

      { isOpen && <div className="h-full w-full relative flex flex-col items-center lg:hidden">
        <motion.div 
          key={ motionKey + "-closed-top" }
          initial={{ translateY: '-50%', top: 0, rotate: 0 }}
          animate={{ top: '50%', rotate: 45 }}
          exit={{}}
          className="absolute w-full h-[10%] bg-blue-900 rounded-sm"
        >
        </motion.div>
        <motion.div
          key={ motionKey + "-closed-middle" }
          initial={{ translateY: '-50%', width: '80%' }}
          animate={{ width: 0 }}
          exit={{}}
          className="absolute w-[80%] h-[10%] bg-blue-900 rounded-sm"
        >
        </motion.div>
        <motion.div
          key={ motionKey + "-closed-bottom" }
          initial={{ translateY: '-50%', top: '100%', rotate: 0}}
          animate={{ top: '50%', rotate: -45 }}
          exit={{}}
          className="absolute w-full h-[10%] bg-blue-900 rounded-sm"
        >
        </motion.div>
      </div>}
    </AnimatePresence>
  );
}