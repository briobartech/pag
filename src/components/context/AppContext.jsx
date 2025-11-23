import { createContext, useState, useEffect } from "react";
import miVideo from "/ajo-montaje.mp4";
import miVideo2 from "/video2.mp4";
import { useScrollDirection } from "../utils/useScrollDirection";

export const AppContext = createContext();

export function AppContextProvider(props) {
  const [startBtn, setStartBtn] = useState(true);
  const [valueBtn, setValueBtn] = useState(1);
  const [valueVideo, setValueVideo] = useState(0);

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const { direction } = useScrollDirection();
  

 const VIEW_POINTS = [
  // 0. INICIO (Vista Completa - FRENTE / PARTE MÁS BAJA)
  // Aquí la imagen se muestra en su escala 1x, anclada a la parte inferior.
  { id: 'inicio', label: 'Inicio', scale: 1.8, x: 10, y: -60 },
  
  // 1. LAGO
  // Zoom ligero/moderado. Pan ligeramente a la derecha (el lago está un poco a la derecha)
  // y subir un poco para compensar el object-position: bottom.
  { id: 'lago', label: 'El Lago', scale: 1.8, x: -35, y: -35  }, // x negativo para mover la imagen a la izquierda (centrar punto derecho) 1.5, x: -10, y: -20
  
  // 2. CIUDAD DE FONDO
  // Zoom más fuerte. Pan a la izquierda (la ciudad está a la izquierda) y subir más.
  { id: 'ciudad', label: 'La Ciudad', scale:2, x: 15, y: -8}, // x positivo para mover la imagen a la derecha (centrar punto izquierdo)
  
  // 3. CIELO
  // Zoom aún más fuerte (o moderado, dependiendo del efecto deseado).
  // Pan horizontal a cero (centrado), y subir MUCHO para alcanzar el cielo.
  { id: 'cielo', label: 'El Cielo', scale: 2, x: -35, y: 15}, // y muy negativo para subir la imagen drásticamente scale: 1.8, x: 0, y: -60
];
  // Usamos useEffect para reaccionar a la dirección de la rueda
  useEffect(() => {
    if (direction === "down") {
      setCurrentViewIndex((prevIndex) =>
        Math.min(prevIndex + 1, VIEW_POINTS.length - 1)
      );
    } else if (direction === "up") {
      setCurrentViewIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  }, [direction]);

  // El ID del punto de vista activo
  const activeViewId = VIEW_POINTS[currentViewIndex];

  const startApp = () => {
    setStartBtn(false);
    console.log(currentViewIndex);
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
        direction,
        activeViewId,currentViewIndex
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
