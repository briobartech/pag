import React, { useState } from 'react';
import ReactHowler from 'react-howler';

const Reproductor = ({ playOnLastPage,musicSource }) => {
    const [isPlaying, setIsPlaying] = useState(true);
  
    React.useEffect(() => {
      if (playOnLastPage) {
        setIsPlaying(true); // Inicia la reproducción si está en la última página
      }
    }, [playOnLastPage]);
  
    return (
      <div>
        <ReactHowler src={musicSource} playing={isPlaying} volume={1} />
        
      </div>
    );
  };
export default Reproductor;