import React, { useContext } from "react";
import { AppContext } from "../components/context/AppContext";
import { motion, AnimatePresence } from 'framer-motion';
import InicioPage from "../pages/Inicio";
import AboutMeSection from "../pages/AboutMeSection";
import MarcaPage from "../pages/MarcaSection";
import ContactoPage from "../pages/ContactSection";
import { SECTIONS_CONFIG } from "../config/sectionsConfig";

const pageVariants = {
  initial: { opacity: 0, x: 50 }, // Estado inicial
  in: { opacity: 1, x: 0 },       // Estado final (entró)
  out: { opacity: 0, x: -50 }      // Estado de salida
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
    <AnimatePresence mode="wait"> {/* 'wait' asegura que un componente salga antes de que el siguiente entre */}
      {/* La clave aquí es el activeSectionKey, que fuerza la re-renderización */}
      <motion.div
        key={activeSectionKey} 
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 0.7 }} // Duración de la transición
        className={`page-wrapper page-${activeSectionKey}`}
      >
        <ComponentToRender />
      </motion.div>
    </AnimatePresence>
  );
}

