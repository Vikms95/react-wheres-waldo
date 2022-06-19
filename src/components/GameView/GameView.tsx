/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState, useEffect, useRef,
} from 'react';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';
import mario from '../../assets/mario-snes.png';
import formatTimer from '../../utils/formatTimer';
import GameDropdown from '../GameDropdown/GameDropdown';
import getConsoleCharacterImages from '../../utils/getConsoleCharactersData';

interface Props{
  consoleName :string | null
}

export default function GameView(props: Props) {
  const { consoleName } = props;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const dropdownRef = useRef<HTMLInputElement>(null);

  /**
   * Renders one of the imported images based on
   * consoleName prop
   */
  const renderGameImage = (name: string | null) => {
    const IMAGES = {
      'super-nintendo': snes,
      gamecube: gc,
      'playstation-1': ps1,
      'playstation-2': ps2,
    };

    return IMAGES[name as keyof typeof IMAGES];
  };

  /**
   * Increments timer state by 1
   */
  const incrementTimer = () => {
    setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
  };

  /**
   * Takes a click event and calculates a computed value with the current click offset
   */
  const getClickCoordinates = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const coordsX = event.pageX - event.currentTarget.offsetLeft;
    const coordsY = event.pageY - event.currentTarget.offsetTop - 80;
    return { coordsY, coordsX };
  };

  /**
   * Moves dropdown to click coordinates
   */
  const moveDropdownOnClick = (coordsY: number, coordsX: number) => {
    if (dropdownRef.current !== null) {
      dropdownRef.current.style.display = 'block';
      dropdownRef.current.style.top = `${coordsY}px`;
      dropdownRef.current.style.left = `${coordsX}px`;
    }
  };

  /**
   * Takes event as parameter and changes element's top and left
   * values based on the registered click coordinates
   *
   */
  const renderGameDropdown = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const { coordsY, coordsX } = getClickCoordinates(event);
    moveDropdownOnClick(coordsY, coordsX);
    // Store coordinates clicked to later add them to the object along with the character?
    // It can be called within this function,so just parametize the function to store the characters
    // checkIfCharacter
  };

  useEffect(() => {
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timeElapsed]);

  return (
    <main className="gameview-container">
      <GameDropdown dropdownRef={dropdownRef} consoleName={consoleName} />
      <section className="characters-container">
        {getConsoleCharacterImages(consoleName).map((characterImage) => (
          <img
            src={characterImage}
            alt={`${consoleName as string}-character`}
            className="character-image"
          />
        ))}
      </section>
      <section className="timer-container">
        {formatTimer(timeElapsed.toString())}
      </section>
      <img
        src={renderGameImage(consoleName)}
        alt={consoleName as string}
        onClick={(e) => renderGameDropdown(e as React.MouseEvent<HTMLImageElement>)}
      />
    </main>
  );
}
