import React, { createContext, useState, useRef, useMemo } from "react";
import { SECTIONS_CONFIG, SECTION_KEYS } from "../../config/sectionsConfig";
import { LANGUAGES } from "../../config/LanguajeSelector.js";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [startBtn, setStartBtn] = useState(true);
  const [valueBtn, setValueBtn] = useState(1);
  const [valueVideo, setValueVideo] = useState(0);
  const [hideBtnStart, setHideBtnStart] = useState(false);
  const [activeSectionKey, setActiveSectionKey] = useState(SECTION_KEYS[0]);
  const bgVideoRef = useRef(null);
  const endedListenerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Lenguaje seleccionado global
  const [lang, setLang] = useState(LANGUAGES[0]);

  // Función para alternar el estado de silencio al hacer clic en el botón
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

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
    toggleMute();
    setStartBtn(false);
    setTimeout(() => {
      setHideBtnStart(true);
    }, 1500);
    playBgVideoOnce();
    setTimeout(() => {
      setValueBtn(0);
    }, 2000);
    setTimeout(() => {
      setValueVideo(1);

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
      lang,
      setLang,
    }),
    [activeSectionKey, lang]
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
        setActiveSectionKey,
        hideBtnStart,
        toggleMute,
        isMuted,
        lang,
        setLang,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
