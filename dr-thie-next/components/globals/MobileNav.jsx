import { servicesList } from "@/utils/data/services/services";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import Navigation from "./Navigation";

export default function MobileNav({ styles, state, serviceList }){

  return (
    <>
    <AnimatePresence >
    <MotionConfig transition={{ duration: .5 }}>

      {state && <motion.section
        key='mobile-nav'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={ [styles.mobileNav, "fixed flex flex-col w-[100vw] h-[100vh] inset-0 z-10"].join(' ') }
        >
        <div className="bg-white w-full h-[100px] sm:h-[110px] "></div>

        <div className={ [styles.navbar, "relative self-center w-7/12 min-h-[300px] mt-16"].join(' ') }>
          <Navigation styles={ styles } servicesList={ servicesList } isColumn={ true }/>
        </div>

      </motion.section>}

    </MotionConfig>
    </AnimatePresence>
    </>
  );
}