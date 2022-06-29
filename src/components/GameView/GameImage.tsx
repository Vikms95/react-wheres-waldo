import React, { useContext } from 'react';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';
import ConsoleContext from '../../context/ConsoleContext';

interface Props{
  renderGameDropdown: (e: React.MouseEvent<HTMLImageElement>) => void
}

function GameImage(props: Props) {
  const {
    renderGameDropdown,
  } = props;

  const selectedConsole = useContext(ConsoleContext);

  /**
   * Renders one of the imported images based on
   * selectedConsole prop
   */
  const renderGameImage = (name: string | null) => {
    const IMAGES = {
      'super-nintendo': snes,
      'game-cube': gc,
      'playstation-1': ps1,
      'playstation-2': ps2,
    };

    return IMAGES[name as keyof typeof IMAGES];
  };

  return (
    <img
      src={renderGameImage(selectedConsole)}
      alt={(selectedConsole as string)}
      onClick={(e) => renderGameDropdown((e as React.MouseEvent<HTMLImageElement>))}
    />
  );
}

export default GameImage;
