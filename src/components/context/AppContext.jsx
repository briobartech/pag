import { createContext, useState, useEffect } from "react";
import miVideo from "/ajo-montaje.mp4";
import miVideo2 from "/video2.mp4";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const fuentes = [miVideo, miVideo2];
  const [videoIndex, setVideoIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [startBtn, setStartBtn] = useState(true);
  const currentVideoSource = fuentes[videoIndex];
  const [valueBtn, setValueBtn] = useState(1);
  const [valueVideo, setValueVideo] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoaded = () => {
    setIsVisible(true);
  };

 
  const startApp = () => {
    setStartBtn(false);
    setTimeout(() => {
      setValueVideo(1);
      setValueBtn(0);
    }, 2000);
  };

  return (
    <AppContext.Provider
      value={{
        valueVideo,
        setValueVideo,
        valueBtn,
        setValueBtn,
        startBtn,
        startApp,
        handleVideoLoaded,
        currentVideoSource,
        videoIndex,
        setVideoIndex,
        isVisible,
        
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
