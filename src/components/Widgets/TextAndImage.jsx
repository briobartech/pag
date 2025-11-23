import styled from "styled-components";
import { textTheme } from "../../assets/fonts";
function TextAndImage({ props }) {
  return (
    <TextAndImageStyled>
      <img className="img-content" src="/ajo.png" alt={props.alt} />
      <p className="text-content">{props.text}</p>
    </TextAndImageStyled>
  );
}

export default TextAndImage;
const TextAndImageStyled = styled.div`
  .text-content {
    font-family: ${textTheme.calSans};
    font-size: 1.2rem;
    line-height: 1.6;
  }

  .img-content {
    background-color: transparent;
    display: block;
    max-width: 100%;
    height: auto;
  }

  .img-content,
  .text-content {
    background-color: transparent;
  }
`;
