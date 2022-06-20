/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState, useEffect, useRef,
} from 'react';
import {
  query, onSnapshot, collection, getFirestore, connectFirestoreEmulator,
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

  const [clickedCoords, setClickedCoords] = useState([0, 0]);
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
   * Takes event as parameter and changes element's top and left
   * values based on the registered click coordinates
   *
   */
  const renderGameDropdown = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    moveDropdownOnClick((event.pageY - 80), event.pageX);
    console.log((event.nativeEvent.offsetX / window.innerWidth) * 2 - 1);
    console.log(1 - (event.nativeEvent.offsetY / window.innerHeight) * 2 - 1);
    // console.log(window.innerHeight, innerWidth);
    // Store coordinates clicked to later add them to the object along with the character?
    // It can be called within this function,so just parametize the function to store the characters
    // checkIfCharacter
    const coordQuery = query(collection(getFirestore(), 'coordinates'));
    onSnapshot(coordQuery, (snapshot) => {
      // method to retrieve data!!
      // console.log(snapshot.docs[0].data());
    });
  };

  useEffect(() => {
    const intervalId = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId);
  }, [timeElapsed]);

  return (
    <main className="gameview-container">
      <GameDropdown dropdownRef={dropdownRef} consoleName={consoleName} />
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
