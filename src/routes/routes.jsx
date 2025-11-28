import React, { useContext } from "react";
import { AppContext } from "../components/context/AppContext";
import { motion, AnimatePresence } from 'framer-motion';
import InicioPage from "../pages/Inicio";
import AboutMeSection from "../pages/AboutMeSection";
import MarcaPage from "../pages/MarcaSection";
import ContactoPage from "../pages/ContactSection";
import { SECTIONS_CONFIG } from "../config/sectionsConfig";

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};
const COMPONENTS_MAP = {
  inicio: InicioPage,
  about_us: AboutMeSection,
  marca: MarcaPage,
  contacto: ContactoPage,
};
export function SectionRouter() {
  const { activeSectionKey } = useContext(AppContext);
console.log(activeSectionKey)

  const ComponentToRender =
    COMPONENTS_MAP[SECTIONS_CONFIG[activeSectionKey]] || (() => <div>Página no encontrada</div>);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSectionKey}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`page-wrapper page-${activeSectionKey}`}
        style={{ willChange: "opacity" }}
      >
        <ComponentToRender />
      </motion.div>
    </AnimatePresence>
  );
}

