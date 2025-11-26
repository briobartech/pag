import React, { createContext, useState, useRef, useMemo } from "react";

import { SECTIONS_CONFIG, SECTION_KEYS } from "../../config/sectionsConfig";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [startBtn, setStartBtn] = useState(true);
  const [valueBtn, setValueBtn] = useState(1);
  const [valueVideo, setValueVideo] = useState(0);
  const [hideBtnStart, setHideBtnStart] = useState(false);
  const [activeSectionKey, setActiveSectionKey] = useState(SECTION_KEYS[0]);
  const bgVideoRef = useRef(null);
  const endedListenerRef = useRef(null);
  const playBgVideoOnce = () => {
    const video = bgVideoRef.current;
    if (!video) {
      console.warn("bgVideoRef no está conectado aún");
      return;
    }

    // Asegurarse que no esté en loop mientras lo reproducimos una vez
    const previousLoop = video.loop;
    video.loop = false;

    // limpiar listener anterior si lo hubiera
    if (endedListenerRef.current) {
      video.removeEventListener("ended", endedListenerRef.current);
      endedListenerRef.current = null;
    }

    const onEnded = () => {
      console.log("Bg video finished (ended) — deteniendo reproducción.");
      try {
        video.pause();
      } catch (e) {
        /* noop */
      }
      // restaurar el loop original si lo necesitas:
      video.loop = previousLoop;
      // limpiar listener
      video.removeEventListener("ended", onEnded);
      endedListenerRef.current = null;
    };

    endedListenerRef.current = onEnded;
    video.addEventListener("ended", onEnded);

    video.play().catch((err) => {
      console.error("Error al reproducir bg video", err);
      // restaurar loop si fallo
      video.loop = previousLoop;
    });
  };
  const stopBgVideo = () => {
    const video = bgVideoRef.current;
    if (!video) return;
    if (endedListenerRef.current) {
      video.removeEventListener("ended", endedListenerRef.current);
      endedListenerRef.current = null;
    }
    video.pause();
  };
  const startApp = () => {
    setStartBtn(false);
    setTimeout(() => {
      setHideBtnStart(true);
      
    },1500);
    playBgVideoOnce();

    setTimeout(() => {
      setValueVideo(1);
      setValueBtn(0);
      setActiveSectionKey(1);
    }, 4000);
  };

  const setSection = (key) => {
    if (SECTION_KEYS.includes(key)) {
      setActiveSectionKey(key);
    } else {
      console.warn(`Sección '${key}' no encontrada.`);
    }
  };

  const contextValue = useMemo(
    () => ({
      activeSectionKey,
      setSection,
      activeSectionData: SECTIONS_CONFIG[activeSectionKey],
      sectionsConfig: SECTIONS_CONFIG,
    }),
    [activeSectionKey]
  );

  return (
    <AppContext.Provider
      value={{
        valueVideo,
        setValueVideo,
        valueBtn,
        setValueBtn,
        startBtn,
        startApp,
        bgVideoRef,
        playBgVideoOnce,
        stopBgVideo,
        activeSectionKey,
        setActiveSectionKey,hideBtnStart
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
