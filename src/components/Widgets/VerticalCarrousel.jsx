import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
  VerticalCarrousel
  - Props:
    - items (array of nodes or strings) OR children (React nodes)
    - height (string, default "60vh")
    - autoPlay (boolean)
    - autoPlayInterval (ms)
    - loop (boolean)
  - Usage examples:
    <VerticalCarrousel items={[ <Item1/>, <Item2/> ]} />
    or
    <VerticalCarrousel>
      <Item1/>
      <Item2/>
    </VerticalCarrousel>
*/

function VerticalCarrousel({
  items,
  children,
  height = "60vh",
  autoPlay = false,
  autoPlayInterval = 4000,
  loop = true,
}) {
  const slides = items ?? React.Children.toArray(children);
  const length = slides.length;
  const [index, setIndex] = useState(0);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const lastWheel = useRef(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goNext();
    }, autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [index, autoPlay, autoPlayInterval]);

  const goNext = () => {
    setIndex((prev) => {
      if (prev >= length - 1) return loop ? 0 : prev;
      return prev + 1;
    });
  };

  const goPrev = () => {
    setIndex((prev) => {
      if (prev <= 0) return loop ? length - 1 : prev;
      return prev - 1;
    });
  };

  const onWheel = (e) => {
    // throttle wheel (ms)
    const now = Date.now();
    if (now - lastWheel.current < 300) return;
    lastWheel.current = now;

    if (e.deltaY > 0) goNext();
    else if (e.deltaY < 0) goPrev();
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startY.current = e.touches?.[0]?.clientY ?? 0;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentY = e.touches?.[0]?.clientY ?? 0;
    const diff = currentY - startY.current;
    // small threshold
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext();
      else goPrev();
      isDragging.current = false;
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    // keyboard nav: ArrowUp / ArrowDown / PageUp / PageDown
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goNext();
      if (e.key === "ArrowUp" || e.key === "PageUp") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [length]);

  return (
    <CarouselStyled
      style={{ height }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={containerRef}
      aria-roledescription="carousel"
    >
      <Viewport>
        <Slides style={{ transform: `translateY(-${index * 100}%)` }}>
          {slides.map((child, i) => (
            <Slide key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${length}`}>
              {child}
            </Slide>
          ))}
        </Slides>
      </Viewport>

      <Controls>
        <ActionButton onClick={goPrev} aria-label="previous slide">▲</ActionButton>
        <Counter aria-hidden>{index + 1} / {length}</Counter>
        <ActionButton onClick={goNext} aria-label="next slide">▼</ActionButton>
      </Controls>

      <Dots role="tablist" aria-label="carousel pagination">
        {slides.map((_, i) => (
          <Dot
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            $active={i === index}
          />
        ))}
      </Dots>
    </CarouselStyled>
  );
}

export default VerticalCarrousel;

/* ===========================
   Styled Components
   =========================== */
const CarouselStyled = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  user-select: none;
  touch-action: pan-y;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Viewport = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
`;

const Slides = styled.div`
  height: 100%;
  transition: transform 450ms cubic-bezier(.2,.9,.2,1);
  display: flex;
  flex-direction: column;
`;

const Slide = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02));
  padding: 2rem;
  box-sizing: border-box;
`;

const Controls = styled.div`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  z-index: 40;
`;

const ActionButton = styled.button`
  width: 44px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: #fff;
  cursor: pointer;
  display: inline-grid;
  place-items: center;
  font-weight: 700;
  transition: background 160ms ease, transform 120ms ease;
  &:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }
  &:active { transform: translateY(0); }
`;

const Counter = styled.div`
  color: rgba(255,255,255,0.9);
  font-size: 0.9rem;
  padding: 6px 8px;
  background: rgba(0,0,0,0.35);
  border-radius: 6px;
`;

const Dots = styled.div`
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: flex;
  gap: 8px;
  z-index: 40;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: none;
  background: ${(p) => (p.$active ? "white" : "rgba(255,255,255,0.25)")};
  opacity: ${(p) => (p.$active ? 1 : 0.8)};
  transition: transform 120ms ease, background 120ms ease;
  cursor: pointer;
  &:hover { transform: scale(1.2); }
`;