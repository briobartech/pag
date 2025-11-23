import { createContext, useState, useEffect } from "react";
import miVideo from "/ajo-montaje.mp4";
import miVideo2 from "/video2.mp4";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [startBtn, setStartBtn] = useState(true);
  const [valueBtn, setValueBtn] = useState(1);
  const [valueVideo, setValueVideo] = useState(0);

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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
