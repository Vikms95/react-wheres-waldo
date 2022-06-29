import React, { useEffect, useContext } from 'react';
import {
  query, onSnapshot, collection, getFirestore, QuerySnapshot, DocumentData,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import DropdownButton from './DropdownButton';
import ConsoleContext from '../../context/ConsoleContext';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  validatedChars: string[];
  lastClickedCoords: number[]
  isLastClickValid: boolean
  setValidatedChars: React.Dispatch<React.SetStateAction<string[]>>
  setIsLastClickValid: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GameDropdown(props: Props) {
  const {
    dropdownRef,
    validatedChars,
    lastClickedCoords,
    isLastClickValid,
    setValidatedChars,
    setIsLastClickValid,
  } = props;

  const selectedConsole = useContext(ConsoleContext);

  /**
   * Renders succesful click feedback everytime
   * a new one is validated and removes
   * the dropdown 1 second after
   */
  useEffect(() => {
    setTimeout(() => setIsLastClickValid, 1000);
    setTimeout(closeDropdown, 1200);
  }, [validatedChars]);

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

  const closeDropdown = () => {
    if (dropdownRef.current) dropdownRef.current.style.display = 'none';
  };

  const renderDropdownButtons = () => (
    getConsoleCharacterData(selectedConsole).map(({ name }) => (
      <DropdownButton
        key={name}
        name={name}
        checkCoordinatesOnDatabase={checkCoordinatesOnDatabase}
      />
    )));

  const renderSuccesfulClick = () => (
    <li className="succesful-click">
      <FontAwesomeIcon icon={faCheck} />
      Correct
    </li>
  );

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
    >
      <ul className="character-list">
        {(isLastClickValid)
          ? renderSuccesfulClick()
          : renderDropdownButtons()}
        {!isLastClickValid && (
        <li className="close-dropdown">
          <button
            className="close-dropdown-button"
            type="button"
            onClick={closeDropdown}
          >
            <FontAwesomeIcon icon={faXmark} />
            Close
          </button>
        </li>
        ) }
      </ul>
    </div>
  );
}
