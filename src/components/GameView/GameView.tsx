import React, {
  useState, useEffect, useRef, SyntheticEvent, FormEvent,
} from 'react';
import {
  query, onSnapshot, collection, getFirestore, QuerySnapshot, DocumentData, addDoc,
} from 'firebase/firestore';

import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';
import formatTimer from '../../utils/formatTimer';
import capitalizeString from '../../utils/capitalizeString';
import GameDropdown from '../GameDropdown/GameDropdown';
import Modal from '../Modal/Modal';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';

interface Props{
  consoleName :string | null
}

export default function GameView(props: Props) {
  const { consoleName } = props;

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [playerAlias, setPlayerAlias] = useState('');
  const [isLastClickValid, setIsLastClickValid] = useState(false);
  const [lastClickedCoords, setLastClickedCoords] = useState([0, 0]);
  const [validatedCharacters, setValidatedCharacters] = useState<string[]>([]);

  const dropdown = useRef<HTMLInputElement>(null);
  const intervalId = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    intervalId.current = setInterval(incrementTimer, 1000);
    return () => clearInterval(intervalId.current as NodeJS.Timer);
  }, [timeElapsed]);

  useEffect(() => {
    if (validatedCharacters.length === 3) {
      clearInterval(intervalId.current as NodeJS.Timer);
    }
  }, [validatedCharacters]);

  /**
   * Increments timer state by 1
   */
  const incrementTimer = () => {
    setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
  };

  const handleInputChange = (event: MouseEvent | SyntheticEvent) => {
    const inputElement = event.target as HTMLInputElement;
    setPlayerAlias(inputElement.value);
  };

  /**
   * Moves dropdown to click coordinates
   */
  const moveDropdownOnClick = (coordsY: number, coordsX: number) => {
    if (dropdown.current !== null) {
      dropdown.current.style.display = 'flex';
      dropdown.current.style.top = `${coordsY}px`;
      dropdown.current.style.left = `${coordsX}px`;
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

  const fetchCharFromDatabase = (
    dbSnapshot: QuerySnapshot<DocumentData>,
    characterName: string,
  ) => {
    const data = dbSnapshot.docs[0].data().characterCoordinates;
    return data[consoleName as string][characterName];
  };

  const checkCoordinatesOnDatabase = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    characterName: string,
  ) => {
    const databaseQuery = query(collection(getFirestore(), 'coordinates'));
    onSnapshot(databaseQuery, (snapshot) => {
      const characterToCheck = fetchCharFromDatabase(snapshot, characterName);

      if (isCharPendingToValidate(characterName)
       && isClickInRange(lastClickedCoords, characterToCheck)) {
        setValidatedCharacters(
          (prevValidatedCharacters) => [...prevValidatedCharacters, characterName],
        );
        setIsLastClickValid(true);
        // TODO change with ref
        document.querySelector(`[alt=${characterName}]`)?.classList.add('selected');
      }
    });
  };

  const submitScoreToDatabase = async (
    e: FormEvent<HTMLFormElement>,
    name: string,
    consoleToSubmit: string | null,
  ) => {
    e.preventDefault();
    const time = formatTimer(timeElapsed.toString());
    const alias = name || 'Anonymous';

    try {
      await addDoc(collection(getFirestore(), `highscores-${consoleToSubmit}`), { alias, score: time });
    } catch (err) {
      console.log(err);
    }
    setPlayerAlias('');
  };

  const isCharPendingToValidate = (name: string) => (
    !validatedCharacters.includes(name)
  );

  const isClickInRange = (coords: number[], object: any) => (
    coords[0] >= object.width[0] && coords[0] <= object.width[1]
    && coords[1] >= object.height[0] && coords[1] <= object.height[1]
  );

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
   * Takes event as parameter and changes element's top and left
   * values based on the registered click coordinates
   *
   */
  const renderGameDropdown = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    setIsLastClickValid(false);
    moveDropdownOnClick((e.pageY - 80), e.pageX);
    storeLastClickedCoords(e);
  };

  const renderCharacterImages = () => (
    getConsoleCharacterData(consoleName).map(({ image, name }) => (
      <div key={name} className="character-data-container">
        <span className="character-name">{capitalizeString(name)}</span>
        <img src={image} alt={name} className="character-image" />
      </div>
    ))
  );

  return (
    <main className="gameview-container">

      <GameDropdown
        dropdownRef={dropdown}
        consoleName={consoleName}
        setIsLastClickValid={setIsLastClickValid}
        isLastClickValid={isLastClickValid}
        validatedCharacters={validatedCharacters}
        checkCoordinatesOnDatabase={checkCoordinatesOnDatabase}
      />

      { (validatedCharacters.length === 3)
        && (
          <Modal
            timeElapsed={timeElapsed}
            playerAlias={playerAlias}
            consoleName={consoleName}
            validatedCharacters={validatedCharacters}
            handleInputChange={handleInputChange}
            submitScoreToDatabase={submitScoreToDatabase}
          />
        )}

      <section className="characters-container">
        {renderCharacterImages()}
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
