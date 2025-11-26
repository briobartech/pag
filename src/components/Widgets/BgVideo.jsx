import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import styled from "styled-components";

function BgVideo({ video,autoplay}) {
  const context = useContext(AppContext);

  return (
    <BgVideoStyled>
      <video
        key={video}
        ref={context.bgVideoRef}
        autoPlay={autoplay}
        muted
        className="bg-video"
        style={{ opacity: !context.valueVideo }} // Opacidad: 1 (visible) o 0 (invisible)
      >
        <source src={video} type="video/mp4" />
      </video>
    </BgVideoStyled>
  );
}
export default BgVideo;
const BgVideoStyled = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;

  .bg-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;     /* mantiene proporción y cubre el contenedor */
    object-position: center bottom; /* centra foco en la parte baja */
    display: block;
    transition: opacity 1.5s ease-in-out;
  }
     @media (max-width: 600px) {
    .bg-video {
      object-position: 50% 85%;
    }
  }
`;
