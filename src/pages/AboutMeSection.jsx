import styled from "styled-components";
import BgVideo from "../components/Widgets/BgVideo.jsx";
import video from "/about-us-bg.mp4";
import maskarade from "/mask.png";
import Reproductor from "../components/utils/MusicPlayer.jsx";
import musicSource from '/about-us.ogg'
function AboutMeSection(params) {
  // 2. Datos para el carrusel (en tu caso, años)

  return (
    <AboutMeSectionStyled>
      <BgVideo video={video} autoplay={false} />

      <MaskWrapper imageSrc={maskarade} />
      <Reproductor musicSource={musicSource}/> 
    </AboutMeSectionStyled>
  );
}

export default AboutMeSection;

const AboutMeSectionStyled = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  .content-wrapper {
    position: relative;
    z-index: 10;
    top: 0;
  }
`;
const MaskWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  z-index: 5;

  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  background-position: left;

  mix-blend-mode: screen;

  /* -webkit-mask-image: url(${(props) => props.imageSrc}); */
  /* mask-image: url(${(props) => props.imageSrc}); */
  /* -webkit-mask-size: cover; */
`;
