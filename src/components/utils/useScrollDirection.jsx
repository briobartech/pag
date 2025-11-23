// src/hooks/useWheelInteraction.js
import { useState, useEffect, useRef } from 'react';

export const useScrollDirection = (ref) => { 
  const [direction, setDirection] = useState('none');
  const timeoutRef = useRef(null); // Para manejar el reinicio del estado

  useEffect(() => {
    const targetElement = ref && ref.current ? ref.current : window;
    
    const handleWheel = (event) => {
      // Limpia el temporizador anterior
      clearTimeout(timeoutRef.current);
      
      const newDirection = event.deltaY > 0 ? 'down' : (event.deltaY < 0 ? 'up' : 'none');
      
      // Solo actualiza la dirección si no es 'none' o si es diferente al estado actual
      if (newDirection !== 'none') {
        setDirection(newDirection);
      }

      // Establece un temporizador para resetear la dirección a 'none' después de un breve tiempo
      timeoutRef.current = setTimeout(() => {
        setDirection('none');
      }, 50); // 50ms es suficiente para que React registre el cambio

      // ¡CLAVE para el Problema 2!
      event.preventDefault(); 
    };

    targetElement.addEventListener('wheel', handleWheel, { passive: false }); // passive: false es crucial

    return () => {
      targetElement.removeEventListener('wheel', handleWheel);
      clearTimeout(timeoutRef.current);
    };
  }, [ref]); 

  return { direction }; // Ya no necesitamos lastEventTime
};