import React, { useState, useEffect, useRef } from 'react';

import {
  query, onSnapshot, collection, getFirestore, QuerySnapshot, DocumentData,
} from 'firebase/firestore';

import { time } from 'console';
import Modal from '../Modal/Modal';
import GameTimer from './GameTimer';
import GameImage from './GameImage';
import GameCharImages from './GameCharImages';
import GameDropdown from '../GameDropdown/GameDropdown';

interface Props{
  selectedConsole: string | null
}

export default function GameView(props: Props) {
  const { selectedConsole } = props;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLastClickValid, setIsLastClickValid] = useState(false);
  const [lastClickedCoords, setLastClickedCoords] = useState([0, 0]);
  const [validatedChars, setValidatedChars] = useState<string[]>([]);

  const dropdown = useRef<HTMLInputElement>(null);
  const intervalId = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setValidatedChars([]);
    setTimeElapsed(0);
  }, []);

  useEffect(() => {
    intervalId.current = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId.current as NodeJS.Timer);
  }, [timeElapsed]);

  useEffect(() => {
    // When three characters are validated, stop the timer
    if (isGameWin()) {
      clearInterval(intervalId.current as NodeJS.Timer);
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
    if (dropdown.current !== null) {
      dropdown.current.style.display = 'flex';
      dropdown.current.style.left = `${coordsX}px`;
      dropdown.current.style.top = `${coordsY}px`;
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
   * Queries an instance of the coordinates collection to
   * later check on the clicked character name
   */
  const checkCoordinatesOnDatabase = (
    characterName: string,
  ) => {
    const databaseQuery = query(collection(getFirestore(), 'coordinates'));

    onSnapshot(databaseQuery, (snapshot) => {
      const characterToCheck = fetchCharFromDatabase(snapshot, characterName);
      checkCoordsValidity(characterName, characterToCheck);
    });
  };

  /**
   * Fetches character coordinates from database
   * based on the passed name
   */
  const fetchCharFromDatabase = (
    dbSnapshot: QuerySnapshot<DocumentData>,
    characterName: string,
  ) => {
    const data = dbSnapshot.docs[0].data().characterCoordinates;
    return data[selectedConsole as string][characterName];
  };

  /**
   * Checks whether the clicked coordinates are equal
   * to the ones on the database. If that is the case,
   * sets the char to the validated list, sets the last
   * click as valid and increases opacity on the character image
   */
  const checkCoordsValidity = (characterName: string, characterToCheck: any) => {
    if (isClickValid(characterName, characterToCheck)) {
      setValidatedChars((prevValidatedChars) => [...prevValidatedChars, characterName]);
      setIsLastClickValid(true);
      // TODO change with ref?
      document.querySelector(`[alt=${characterName}]`)?.classList.add('selected');
    }
  };

  const isClickValid = (characterName: string, characterToCheck: any) => (
    isCharPendingToValidate(characterName) && isClickInRange(lastClickedCoords, characterToCheck)
  );

  const isCharPendingToValidate = (name: string) => (
    !validatedChars.includes(name)
  );

  const isClickInRange = (coords: number[], object: any) => (
    isWidthInRange(coords, object) && isHeigthInRange(coords, object)
  );

  const isWidthInRange = (coords: number[], object: any) => (
    coords[0] >= object.width[0] && coords[0] <= object.width[1]
  );

  const isHeigthInRange = (coords: number[], object: any) => (
    coords[1] >= object.height[0] && coords[1] <= object.height[1]
  );

  const isGameWin = () => (
    validatedChars.length === 3
  );

  /**
   * Takes event as parameter and changes element's top and left
   * values based on the registered click coordinates
   */
  const renderGameDropdown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsLastClickValid(false);
    moveDropdownOnClick((e.pageY - 80), e.pageX);
    storeLastClickedCoords(e);
  };

  return (
    <main className="gameview-container">
      <GameDropdown
        dropdownRef={dropdown}
        selectedConsole={selectedConsole}
        isLastClickValid={isLastClickValid}
        validatedCharacters={validatedChars}
        setIsLastClickValid={setIsLastClickValid}
        checkCoordinatesOnDatabase={checkCoordinatesOnDatabase}
      />
      { (isGameWin())
        && (
          <Modal
            timeElapsed={timeElapsed}
            selectedConsole={selectedConsole}
          />
        )}
      <GameCharImages
        selectedConsole={selectedConsole}
      />
      <GameTimer
        timeElapsed={timeElapsed}
      />
      <GameImage
        selectedConsole={selectedConsole}
        renderGameDropdown={renderGameDropdown}
      />
    </main>
  );
}
