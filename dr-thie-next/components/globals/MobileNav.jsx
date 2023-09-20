import { servicesList } from "@/utils/data/services/services";
import { motion } from "framer-motion";
import Navigation from "./Navigation";

export default function MobileNav({ styles, state, serviceList }){

  return (
    <motion.section
      key='mobile-nav'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={ [styles.mobileNav, "lg:hidden fixed flex flex-col w-[100vw] h-[100vh] inset-0 z-10"].join(' ') }
      >
      <div className="bg-white w-full h-[100px] sm:h-[110px] "></div>

      <motion.div
        key='mobile-nav-navbar'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: .25 } }}
        className={ [styles.navbar, "relative self-center w-7/12 min-h-[300px] max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-110px)] pt-12 overflow-y-scroll no-scrollbar"].join(' ') }
      >
        <Navigation styles={ styles } servicesList={ servicesList } isColumn={ true }/>
      </motion.div>

    </motion.section>
  );
}