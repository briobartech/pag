// src/components/SideProgressNav.jsx

import React from "react";
import styled from "styled-components";
import { useScrollTracker } from "../utils/useScrollTracker"; // Importa el hook

// Define tus secciones para que coincidan con los IDs de tu contenido

const SECTIONS_MAP = [
  { id: "inicio", label: "Inicio" },
  { id: "quienes-somos", label: "¿Quiénes somos?" },
  { id: "proceso", label: "Proceso" },
  { id: "contacto", label: "Contacto" },
  // ... si agregas más secciones, agrégalas aquí.
];
const SECTION_IDS = SECTIONS_MAP.map((s) => s.id);
export function SideProgressNav() {
  // Obtiene el estado del hook
  const { isSideNavVisible, activeSection } = useScrollTracker(SECTION_IDS);

  return (
    // Usa el componente Styled de React para el contenedor
    <NavContainer isVisible={isSideNavVisible} aria-hidden={!isSideNavVisible}>
      <Tracker>
        {SECTIONS_MAP.map((section, index) => ( // <--- Itera sobre el MAPA COMPLETO
          <NavPoint 
            key={section.id} 
            // Compara el ID activo del hook con el ID del mapa
            isActive={section.id === activeSection} 
            href={`#${section.id}`} 
          >
            {/* CLAVE: Muestra la etiqueta legible (label) */}
            {section.id === activeSection && <Label>{section.label}</Label>} 
          </NavPoint>
        ))}
      </Tracker>
    </NavContainer>
  );
}

// src/components/SideProgressNav.jsx (justo arriba del componente SideProgressNav)

// ----------------------------------------------------
// 1. Contenedor Principal
// ----------------------------------------------------
const NavContainer = styled.div`
  /* Posicionamiento: Fijo y centrado */
  position: fixed;
  top: 50%;
  right: 200px;
  transform: translateY(-50%);
  z-index: 1000;

  /* Visibilidad controlada por props */
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

// ----------------------------------------------------
// 2. Contenedor de los Puntos
// ----------------------------------------------------
const Tracker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ----------------------------------------------------
// 3. El Punto Individual (Usamos 'a' para que sea clickeable)
// ----------------------------------------------------
const NavPoint = styled.a`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive ? "white" : "rgba(255, 255, 255, 0.3)"};
  position: relative;
  transition: background-color 0.3s, transform 0.3s;

  /* Margen entre puntos y pseudo-elemento para la línea */
  margin-bottom: 30px;

  /* Línea de conexión: Usamos ::after (o ::before) */
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 30px; /* Distancia igual a margin-bottom */
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

// ----------------------------------------------------
// 4. Etiqueta de la Sección Activa
// ----------------------------------------------------
const Label = styled.span`
  position: absolute;
  left: 20px;
  top: -5px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  white-space: nowrap;
`;
