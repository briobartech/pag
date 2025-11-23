import styled from "styled-components";
import icon from "/ajo.png";

function IconPage() {
  return (
    <IconPageStyled>
      <img src={icon} alt="icono" />
    </IconPageStyled>
  );
}

export default IconPage;

const IconPageStyled = styled.div`
  position: fixed;
  top: 16px;
  left: 16px;
  width: 56px;
  height: 56px;
  z-index: 9999;
  pointer-events: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  /* Ajustes para pantallas pequeñas */
  @media (max-width: 600px) {
    top: 12px;
    left: 12px;
    width: 44px;
    height: 44px;
  }
`;