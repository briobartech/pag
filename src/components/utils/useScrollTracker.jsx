// src/hooks/useScrollTracker.js

import { useState, useEffect } from 'react';

export const useScrollTracker = (sectionIds) => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || null); // Inicia en la primera sección

  
  useEffect(() => {
    // Asume que el Navbar principal tiene una altura de 100px
    const NAVBAR_HEIGHT = 100; 
    const SECTION_MARGIN = 150; 
    
    // Obtiene los elementos del DOM una sola vez
    const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Lógica de Visibilidad del Side Nav
      // Muestra el SideNav cuando el scroll supera la altura del Navbar principal
      setIsSideNavVisible(scrollY > NAVBAR_HEIGHT);

      // 2. Lógica de Detección de Sección Activa
      // Recorre las secciones de abajo hacia arriba
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        
        // Comprueba si la parte superior de la sección ha pasado el punto de activación
        if (section.offsetTop <= scrollY + SECTION_MARGIN) {
          setActiveSection(section.id);
          break; 
        }
      }
    };

    // Adjunta el listener y ejecuta una vez para inicializar la posición y el estado
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    // Limpieza
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]); // Se vuelve a ejecutar si la lista de secciones cambia
  
  return { isSideNavVisible, activeSection };
};