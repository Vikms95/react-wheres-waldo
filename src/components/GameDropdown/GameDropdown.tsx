import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import DropdownButton from './DropdownButton';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  consoleName: string | null;
  validatedCharacters: string[];
  isLastClickValid: boolean
  setIsLastClickValid: React.Dispatch<React.SetStateAction<boolean>>
  checkCoordinatesOnDatabase: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    characterName: string) => void
}

export default function GameDropdown(props: Props) {
  const {
    dropdownRef,
    consoleName,
    isLastClickValid,
    validatedCharacters,
    setIsLastClickValid,
    checkCoordinatesOnDatabase,
  } = props;

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

  const renderDropdownButtons = () => getConsoleCharacterData(consoleName).map(({ name }) => (
    <DropdownButton
      key={name}
      name={name}
      checkCoordinatesOnDatabase={checkCoordinatesOnDatabase}
    />
  ));

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
