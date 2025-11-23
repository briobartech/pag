// src/components/CursorRevealImage/CursorRevealImage.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import "../../assets/style/RevealOnHover.css";
import revealImage from "/banner.jpg"; // Importa la imagen que se mostrará en la lupa
import { AppContext } from "../context/AppContext";

export function CursorRevealImage() {
  
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })  
const [isHovering, setIsHovering] = useState(false); // Para controlar el estado del hover
  const containerRef = useRef(null); // Referencia al div contenedor
  const magnifierRadius = 190;
  const currentRadius = isHovering ? magnifierRadius : 0;
  const context = useContext(AppContext);
  useEffect(() => {
   
    const handleMouseMove = (event) => {
      if (currentContainer) {
        const rect = currentContainer.getBoundingClientRect();
        setMousePosition({
          // Calcula la posición del cursor relativa al contenedor
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    // Agregamos el event listener al contenedor del efecto, no al documento,
    // para que la posición sea relativa a él.
    const currentContainer = containerRef.current;
    if (currentContainer) {
        const rect = currentContainer.getBoundingClientRect();
        
        // 1. Establece la posición inicial de la lupa en el centro del componente.
        setMousePosition({
            x: rect.width / 2,
            y: rect.height / 2,
        });
        
        // 2. Adjunta el listener de movimiento del mouse
        currentContainer.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []); // Se ejecuta una sola vez al montar el componente



  const dynamicMaskStyle = {
    // CLAVE: Reemplazamos 'black' por la variable 'revealColor'
    WebkitMaskImage: `radial-gradient(circle ${currentRadius}px at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(0, 0, 0, 0.8) 30%,         /* 0% (Centro): Máxima opacidad */
      rgba(0, 0, 0, 0.5) 50%,        /* 60%: Mantiene la opacidad alta hasta aquí */
      rgba(0, 0, 0, 0.4) 60%, 
      rgba(0, 0, 0, 0.3) 70%,         /* 80%: Transiciona a transparente */
      rgba(0, 0, 0, 0.2) 80%, 
      rgba(0, 0, 0, 0.1) 90%, 
      rgba(0, 0, 0, 0.05) 95%, 
      rgba(0, 0, 0, 0) 100%         /* 100% (Borde): Mantiene la transparencia */
    )`,
    maskImage: `radial-gradient(circle ${currentRadius}px at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(0, 0, 0, 0.8) 30%, 
      rgba(0, 0, 0, 0.5) 50%, 
      rgba(0, 0, 0, 0.4) 60%, 
      rgba(0, 0, 0, 0.3) 70%, 
      rgba(0, 0, 0, 0.2) 80%, 
      rgba(0, 0, 0, 0.1) 90%, 
      rgba(0, 0, 0, 0.05) 95%, 
      rgba(0, 0, 0, 0) 100%
    )`,
    backgroundImage: `url(${revealImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    
    width: "100%",
    height: "100vh",
    // dejar bajo para que se vea el contenido/headers por encima
    zIndex: 5,
    opacity: context.valueVideo
    
  };

  return (
    <div
      ref={containerRef}
      className="cursor-reveal-image-overlay"
      style={dynamicMaskStyle} // Aplicamos el estilo dinámico aquí
      // Los eventos de mouse controlan el estado 'isHovering'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ... */}
    </div>
  );
}

export default CursorRevealImage;
