import styled from "styled-components";
import BgVideo from "../Widgets/BgVideo.jsx";
import video from "/ajo-montaje.mp4";
import TextAndImage from "../Widgets/TextAndImage.jsx";
import image from "/ajo.png";
function AboutMeSection(params) {
  const contenido = {
    image,
    alt: "Ajo",
    text: "Somos una empresa dedicada a la producción y comercialización de ajo de alta calidad. Nuestro compromiso es ofrecer productos frescos y saludables, cultivados con prácticas sostenibles que respetan el medio ambiente. Contamos con un equipo de expertos que supervisa cada etapa del proceso, desde la siembra hasta la distribución, garantizando así la excelencia en cada bulbo que llega a nuestros clientes. Nos enorgullece ser un referente en el sector agrícola, promoviendo el consumo de alimentos naturales y contribuyendo al bienestar de nuestras comunidades.",
  };

  return (
    <AboutMeSectionStyled>
      
        <BgVideo video={video} />
      
      <div className="content-wrapper">
        <TextAndImage props={contenido} />
      </div>
    </AboutMeSectionStyled>
  );
}

export default AboutMeSection;

const AboutMeSectionStyled = styled.div`
  height: 100vh;
  .content-wrapper {
    position: relative;
    z-index: 10;
    top: 0;
  }
`;
