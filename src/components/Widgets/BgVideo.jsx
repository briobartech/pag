import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import styled from "styled-components";

function BgVideo({ video }) {
  const context = useContext(AppContext);

  return (
    <BgVideoStyled>
      <video
        key={video}
        
        autoPlay
        loop
        muted
        className="bg-video"
        style={{ opacity: context.valueVideo }} // Opacidad: 1 (visible) o 0 (invisible)
      >
        <source src={video} type="video/mp4" />
      </video>
    </BgVideoStyled>
  );
}
export default BgVideo;
const BgVideoStyled = styled.div`
  
  height: 100vh;
  
  .bg-video {
   
    
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    display: block;
    transition: opacity 1.5s ease-in-out;
    z-index: -1; 
    
  }
`;
