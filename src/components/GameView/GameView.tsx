import React, {
  useState, useEffect, useRef, useContext,
} from 'react';

import { getConsoleCharacterData } from '../../utils/characterData';
import Modal from '../Modal/Modal';
import GameTimer from './GameTimer';
import GameImage from './GameImage';
import GameCharImage from './GameCharImage';
import GameDropdown from '../GameDropdown/GameDropdown';
import ConsoleContext from '../../context/ConsoleContext';

export default function GameView() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLastClickValid, setIsLastClickValid] = useState(false);
  const [lastClickedCoords, setLastClickedCoords] = useState([0, 0]);
  const [validatedChars, setValidatedChars] = useState<string[]>(['', '', '']);

  const selectedConsole = useContext(ConsoleContext);

  const dropdownRef = useRef<HTMLInputElement>(null);
  const timeElapsedIntervalIdRef = useRef<NodeJS.Timer | null>(null);
  const lastClickIntervalIdRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    timeElapsedIntervalIdRef.current = setInterval(incrementTimer, 1000);
    return () => clearInterval(timeElapsedIntervalIdRef.current as NodeJS.Timer);
  }, [timeElapsed]);

  useEffect(() => {
    // When three characters are validated, stop the timer
    if (isGameWin()) {
      clearInterval(timeElapsedIntervalIdRef.current as NodeJS.Timer);
    }
  }, [validatedChars]);

  /**
   * Increments timer state by 1
   */
  const incrementTimer = () => {
    setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
  };

  /**
   * Moves dropdown to click coordinates
   */
  const moveDropdownOnClick = (coordsY: number, coordsX: number) => {
    if (dropdownRef.current !== null) {
      dropdownRef.current.style.display = 'flex';
      dropdownRef.current.style.left = `${coordsX}px`;
      dropdownRef.current.style.top = `${coordsY}px`;
    }
  };

  /**
   * Stores last clicked coordinates on state to compare use them
   * whenever a character is selected from the dropdown later on
   */
  const storeLastClickedCoords = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const coordsX = Math.ceil((event.nativeEvent.offsetX / window.innerWidth) * 100);
    const coordsY = Math.ceil((event.nativeEvent.offsetY / window.innerWidth) * 100);
    setLastClickedCoords([coordsX, coordsY]);
  };

  const isGameWin = () => (
    validatedChars.length === 3
  );

  /**
   * Takes event as parameter and changes element's top and left
   * values based on the registered click coordinates
   */
  const renderGameDropdown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    // Clear the interval that would close the last dropdown,
    // so it does not close our newly rendered dropdown
    clearInterval(lastClickIntervalIdRef.current as NodeJS.Timer);
    setIsLastClickValid(false);
    moveDropdownOnClick((e.pageY - 80), e.pageX);
    storeLastClickedCoords(e);
  };

  const renderCharImages = () => (
    getConsoleCharacterData(selectedConsole)
      .map(({ image, name }) => (
        <GameCharImage
          key={image}
          image={image}
          name={name}
        />
      ))
  );

  return (
    <main className="gameview-container">
      <GameDropdown
        dropdownRef={dropdownRef}
        validatedChars={validatedChars}
        isLastClickValid={isLastClickValid}
        lastClickedCoords={lastClickedCoords}
        lastClickIntervalIdRef={lastClickIntervalIdRef}
        setValidatedChars={setValidatedChars}
        setIsLastClickValid={setIsLastClickValid}
      />
      { (isGameWin())
        && (
          <Modal
            timeElapsed={timeElapsed}
          />
        )}

      <section className="characters-container">
        {renderCharImages()}
      </section>

      <GameTimer
        timeElapsed={timeElapsed}
      />
      <GameImage
        renderGameDropdown={renderGameDropdown}
      />
    </main>
  );
}
