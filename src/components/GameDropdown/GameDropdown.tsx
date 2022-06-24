import React, { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import DropdownButton from './DropdownButton';
import ConsoleContext from '../../context/ConsoleContext';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  validatedCharacters: string[];
  isLastClickValid: boolean
  setIsLastClickValid: React.Dispatch<React.SetStateAction<boolean>>
  checkCoordinatesOnDatabase: (
    characterName: string) => void
}

export default function GameDropdown(props: Props) {
  const {
    dropdownRef,
    isLastClickValid,
    validatedCharacters,
    setIsLastClickValid,
    checkCoordinatesOnDatabase,
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
  }, [validatedCharacters]);

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
