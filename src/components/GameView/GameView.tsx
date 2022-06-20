/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState, useEffect, useRef,
} from 'react';
import {
  query, onSnapshot, collection, getFirestore,
} from 'firebase/firestore';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';
import formatTimer from '../../utils/formatTimer';
import capitalizeString from '../../utils/capitalizeString';
import GameDropdown from '../GameDropdown/GameDropdown';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';

interface Props{
  consoleName :string | null
}

export default function GameView(props: Props) {
  const { consoleName } = props;

  const [lastClickedCoords, setLastClickedCoords] = useState([0, 0]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const dropdownRef = useRef<HTMLInputElement>(null);

  /**
   * Renders one of the imported images based on
   * consoleName prop
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
      dropdownRef.current.style.top = `${coordsY}px`;
      dropdownRef.current.style.left = `${coordsX}px`;
    }
  };

  /**
   * Stores last clicked coordinates on state to compare use them
   * whenever a character is selected from the dropdown later on
   */
  const storeLastClickedCoords = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const coordsX = Math.ceil((event.nativeEvent.offsetX / window.innerWidth) * 100);
    const coordsY = Math.ceil((event.nativeEvent.offsetY / window.innerWidth) * 100);
    setLastClickedCoords([coordsX, coordsY]);
  };

  /**
   * Takes event as parameter and changes element's top and left
   * values based on the registered click coordinates
   *
   */
  const renderGameDropdown = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    moveDropdownOnClick((e.pageY - 80), e.pageX);
    storeLastClickedCoords(e);
  };

  const areCoordsInRange = (coords: number[], object: any) => (
    coords[0] >= object.width[0] && coords[0] <= object.width[1]
    && coords[1] >= object.height[0] && coords[1] <= object.height[1]
  );

  const checkCoordinatesOnDatabase = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    characterName: string,
  ) => {
    const coordsToCompare = lastClickedCoords;

    const databaseQuery = query(collection(getFirestore(), 'coordinates'));
    onSnapshot(databaseQuery, (snapshot) => {
      const data = snapshot.docs[0].data().characterCoordinates;
      const keyToCheck = data[consoleName as string];
      const characterToCheck = keyToCheck[characterName];
      if (areCoordsInRange(coordsToCompare, characterToCheck)) {
        console.log('Hi');
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timeElapsed]);

  return (
    <main className="gameview-container">
      <GameDropdown
        dropdownRef={dropdownRef}
        consoleName={consoleName}
        checkCoordinatesOnDatabase={checkCoordinatesOnDatabase}
      />
      <section className="characters-container">
        {getConsoleCharacterData(consoleName).map(({ image, name }) => (
          <div
            key={name}
            className="character-data-container"
          >
            <span className="character-name">{capitalizeString(name)}</span>
            <img
              src={image}
              alt={name}
              className="character-image"
            />
          </div>
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
