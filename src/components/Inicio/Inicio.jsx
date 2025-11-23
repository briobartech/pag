import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import BlurText from "../Widgets/BlurText.jsx";
import styled from "styled-components";
import BgVideo from "../Widgets/BgVideo.jsx";
import video from "/video2.mp4";
import CursorRevealImage from "../Widgets/RevealOnLayer.jsx";

function Inicio() {
  const context = useContext(AppContext);
  //startBtn
  return (
    <InicioStyled $valueBtn={useContext(AppContext).valueBtn}>
      <div className="cursor-reveal-image">
        <CursorRevealImage />
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
              display: context.valueBtn === 0 ? "none" : "block",
            }}
          >
            <BlurText
              text="BIENVENIDO"
              delay={350}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => console.log("Animation completed!")}
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
height: 100vh;
  .cursor-reveal-image {
    width: 100%;
    height: 100vh;
   
    
  }
  
  }
  .welcome-msg {
    opacity: 1;
    z-index: 100;

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
