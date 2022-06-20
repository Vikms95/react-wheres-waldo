import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';

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
    checkCoordinatesOnDatabase,
    validatedCharacters,
    isLastClickValid,
    setIsLastClickValid,
  } = props;

  const closeDropdown = () => {
    if (dropdownRef.current) dropdownRef.current.style.display = 'none';
  };

  const renderDropdownButtons = () => getConsoleCharacterData(consoleName).map(({ name }) => (
    <li key={name} className="character-name">

      <button
        type="button"
        className="character-name"
        onClick={(e) => checkCoordinatesOnDatabase(e, name)}
      >
        {capitalizeString(name)}
      </button>

    </li>
  ));

  const renderSuccesfulClick = () => (
    <li className="succesful-click">
      <FontAwesomeIcon icon={faCheck} />
      Correct
    </li>
  );

  const renderSuccesfulClickFeedback = () => {
    setIsLastClickValid(false);
    closeDropdown();
  };

  useEffect(() => {
    setTimeout(renderSuccesfulClick, 1000);
    setTimeout(closeDropdown, 1200);
  }, [validatedCharacters]);

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
