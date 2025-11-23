// src/components/ScrollZoomPage.jsx

import React, { useContext } from "react";

import { AppContext } from "../context/AppContext";
import image from "/bg.png";
function ScrollZoomPage() {
  const activeView = useContext(AppContext).activeViewId
  // 3. Aplicar las transformaciones como estilo dinámico
  const imgStyle = {
    // Zoom: scale(factor)
    // Paneo: translate(x, y)
    transform: `scale(${activeView.scale}) translate(${activeView.x}%, ${activeView.y}%)`,

    // CLAVE: La transición suave
    transition: "transform 1.0s cubic-bezier(0.2, 0.8, 0.2, 1)",
  };

  return (
    <div className="scroll-controlled-container">
      {/* 4. El Contenedor Fijo con tu CSS */}
      <div className="background-fixed-wrapper">
        <img
          src={image} // Reemplaza con tu imagen
          alt="Fondo de Paisaje"
          style={imgStyle} // Aplica el estilo dinámico aquí
        />
      </div>

      {/* Contenido principal de la página (superpuesto) */}
      <div className="page-content-wrapper">
        <h1>Vista Activa: {activeView.label}</h1>
        {/* ... */}
      </div>
    </div>
  );
}
export default ScrollZoomPage;
