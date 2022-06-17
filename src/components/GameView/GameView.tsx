import React from 'react';
import { render } from '@testing-library/react';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';

interface Props{
  consoleName :string | null
}

export default function GameView(props: Props) {
  const { consoleName } = props;
  const renderImage = (par: string | null) => {
    const IMAGES = {
      'super-nintendo': snes,
      gamecube: gc,
      'playstation-1': ps1,
      'playstation-2': ps2,
    };

    return IMAGES[par as keyof typeof IMAGES];
  };

  return (
    <main className="gameview-container">
      <img src={renderImage(consoleName)} alt="hi" />
    </main>
  );
}
