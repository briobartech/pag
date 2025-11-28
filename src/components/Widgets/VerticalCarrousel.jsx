import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { LANGUAGES } from "../../config/LanguajeSelector.js";
import { AppContext } from "../context/AppContext.jsx";

export default function VerticalLanguageCarousel({ onChange }) {
  const [index, setIndex] = useState(0);
  const total = LANGUAGES.length;
  const { setLang } = useContext(AppContext);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Notify external and actualizar contexto
  useEffect(() => {
    const current = LANGUAGES[index];
    onChange && onChange(current);
    setLang && setLang(current);
  }, [index, onChange, setLang]);

  // Visible (active, previous, next)
  const getWrapped = (i) => (i + total) % total;
  const visible = [
    LANGUAGES[getWrapped(index - 1)],
    LANGUAGES[getWrapped(index)],
    LANGUAGES[getWrapped(index + 1)],
  ];

  const handleWheel = (e) => {
    if (e.deltaY > 0) next();
    else if (e.deltaY < 0) prev();
  };

  return (
    <CarouselWrapper
      onWheel={handleWheel}
      role="listbox"
      aria-activedescendant={`lang-${LANGUAGES[index].code}`}
      tabIndex={0}
    >
      <Inner>
        {visible.map((lang, i) => {
          const isActive = lang.code === LANGUAGES[index].code;
          // position: -1 (up), 0 (center), 1 (down)
          const pos = i - 1;
          return (
            <Item
              key={lang.code}
              id={`lang-${lang.code}`}
              $active={isActive}
              $pos={pos}
              role="option"
              aria-selected={isActive}
              onClick={() => {
                // click en superior o inferior mueve el carrusel
                if (pos === -1) prev();
                else if (pos === 1) next();
              }}
            >
              <Flag>
                <img src={lang.icon} alt={lang.name} />
              </Flag>
              <Name>{lang.name}</Name>
              {isActive && <Indicator />}
            </Item>
          );
        })}
      </Inner>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  width: 320px;
  height: 400px;

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: default;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Item = styled.div`
  position: absolute;
  left: 50%;
  width: 180px;
  transform: translateX(-50%)
    translateY(
      ${({ $pos }) => {
        if ($pos === -1) return "-70%";
        if ($pos === 0) return "0%";
        return "70%";
      }}
    )
    scale(${({ $active }) => ($active ? 1 : 0.85)});
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  transition: transform 300ms ease, opacity 300ms ease, scale 300ms ease;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 14px;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 12px rgba(0,0,0,0.25)" : "none"};
  pointer-events: ${({ $active }) => ($active ? "auto" : "auto")};
  &:hover {
    opacity: 0.9;
  }
`;

const Flag = styled.div`
  width: 34px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Name = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.5px;
`;

const Indicator = styled.span`
  margin-left: auto;
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
`;