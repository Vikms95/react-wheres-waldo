import React, { useState, useEffect } from 'react';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';
import formatTimer from '../../utils/formatTimer';

interface Props{
  consoleName :string | null
}

export default function GameView(props: Props) {
  const { consoleName } = props;

  const [timeElapsed, setTimeElapsed] = useState(0);

  /**
   * Renders one of the imported images based on
   * consoleName prop
   */
  const renderImage = (name: string | null) => {
    const IMAGES = {
      'super-nintendo': snes,
      gamecube: gc,
      'playstation-1': ps1,
      'playstation-2': ps2,
    };

    return IMAGES[name as keyof typeof IMAGES];
  };

  const incrementTimer = () => {
    setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timeElapsed]);

  return (
    <main className="gameview-container">
      <section className="timer-container">
        {formatTimer(timeElapsed.toString())}
      </section>
      <img src={renderImage(consoleName)} alt={consoleName as string} />
    </main>
  );
}
