import React from "react";
import styled from "styled-components";

function NavBar() {
  return (
    <NavBarStyled>
      <nav className="navbar_content">
        <ul>
          <li className="nav-bar-btn">
            <a href="#inicio">Inicio</a>
          </li>
          <li className="nav-bar-btn">
            <a href="#quienes-somos">¿Quienes somos?</a>
          </li>
          <li className="nav-bar-btn">
            <a href="">Proceso</a>
          </li>
          <li className="nav-bar-btn">
            <a href="">Contacto</a>
          </li>
        </ul>
      </nav>
    </NavBarStyled>
  );
}

export default NavBar;

const NavBarStyled = styled.div`
  .navbar_content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0); /* Fondo semitransparente */
    display: flex;
    justify-content: right;
    align-items: center;
    z-index: 12; /* Asegura que esté por encima del video y el contenido */
  }
  .navbar_content, ul {
    list-style-type: none;
    margin: 20px;
    padding: 0;
    display: flex;
    flex-direction: row;
  }
  .navbar_content, a {
    font-family: "Alumni Sans Pinstripe", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    color: white;
    font-size: 20px;
    margin: 0 15px;
    cursor: pointer;
  }
 
  .nav-bar-btn {
    padding: 10px 15px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    transition: transform 0.3s ease-in-out;
  }

  .nav-bar-btn:hover {
    transform: scale(1.5);
  }
`;
