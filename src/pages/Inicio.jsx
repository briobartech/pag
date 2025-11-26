import { useContext, useState } from "react";
import { AppContext } from "../components/context/AppContext.jsx";
import BlurText from "../components/Widgets/BlurText.jsx";
import styled from "styled-components";
import BgVideo from "../components/Widgets/BgVideo.jsx";
import video from "/intro2.mp4";


function Inicio() {
  const context = useContext(AppContext);
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };


  return (
    <InicioStyled $valueBtn={useContext(AppContext).valueBtn}>
      <TextAndImage />
      <div className="">
        <BgVideo video={video} />
      </div>

      <div className="inicio">
        {context.startBtn ? (
          <div className="contenido-superpuesto">
            <button
              className="btn-start"
              onClick={context.startApp}
              type="button"
            >
              Iniciar recorrido
            </button>
          </div>
        ) : (
          <div
            className="welcome-msg"
            style={{
              opacity: context.startBtn ? "0" : "1",
              display: context.hideBtnStart === true ? "block" : "none",
            }}
          >
            <BlurText
              text="BIENVENIDO"
              delay={400}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-8"
            />
          </div>
        )}
      </div>
    </InicioStyled>
  );
}

export default Inicio;

const InicioStyled = styled.div`
  .text-2xl {
    font-size: 3em;
    ¡Claro!
      Aquí
      tienes
      una
      configuración
      CSS
      básica
      pero
      elegante
      para
      el
      estilo
      de
      un
      texto
      de
      tipo
      título
      (<h1>, <h2>, etc.).
      Esta
      configuración
      se
      centra
      en
      una
      tipografía
      legible,
    un
      espaciado
      cómodo
      y
      un
      toque
      sutil
      de
      estilo.
      🎨
      Estilos
      CSS
      para
      un
      Título
      Elegante
      CSS
      h1 {
      /* 1. Tipografía y Tamaño */
      font-family: "Georgia", serif; /* Una fuente clásica y elegante */
      font-size: 2.5em; /* Un tamaño destacado para un h1 */
      font-weight: 700; /* Negrita definida, pero no demasiado pesada */

      /* 2. Color */
      color: #2c3e50; /* Un color oscuro y profundo (azul marino/gris oscuro) */

      /* 3. Espaciado y Alineación */
      margin-top: 0.5em; /* Espacio superior */
      margin-bottom: 0.75em; /* Espacio inferior para separar del contenido */
      padding-bottom: 0.1em; /* Un poco de padding abajo para el subraya */
      text-align: left; /* Alineación común y limpia */

      /* 4. Efecto Sutil (Opcional) */
      border-bottom: 2px solid #3498db; /* Una línea inferior sutil de color azul */
      letter-spacing: -0.02em; /* Un ligero ajuste entre letras para refinar el aspecto */
      line-height: 1.2; /* Altura de línea para mejor legibilidad */
    }
  }
  .welcome-msg {
    opacity: 1;
    z-index: 100;
    position: absolute;
    top: 50%;
    left: 40%;
    transition: opacity 1s ease-in-out;
  }
  .contenido-superpuesto {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
  }
  .btn-start {
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    color: white;
    font-size: 24px;
    font-family: "Alumni Sans Pinstripe", sans-serif;
    font-weight: 400;
    font-style: normal;
    transition: border-color 0.5s ease-in-out, border-width 0.5s ease-in-out;
    position: relative;
    z-index: 100;
  }
  .btn-start:hover {
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    border: 2px solid white;
    color: white;
  }
  .btn-start::before,
  .btn-start::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: #fff;

    /* CLAVE 1: INICIA INVISIBLE */
    opacity: 0;

    /* CAMBIO: El borde del círculo inicia invisible (transparente) */
    border: 1px solid transparent;
    /* CLAVE: Transición para el borde del círculo */
    transition: border-color 0.5s ease-in-out, border-width 0.5s ease-in-out,
      opacity 0.5s ease-in-out;
  }

  /* Asegura el posicionamiento de las líneas (sin cambios) */
  .btn-start::before {
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
  }

  .btn-start::after {
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
  }

  /* ---------------------------------------------------------------- */
  /* ESTADO HOVER: HACEMOS VISIBLE TODO */
  /* ---------------------------------------------------------------- */
  .btn-start:hover {
    /* 1. Hacemos visible el borde del círculo */
    border-color: #fff;
  }

  .btn-start:hover::before,
  .btn-start:hover::after {
    /* 2. Hacemos visible las líneas laterales */
    opacity: 1;
  }
`;
