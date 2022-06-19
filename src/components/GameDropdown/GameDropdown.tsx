import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  consoleName: string | null
}

export default function GameDropdown(props: Props) {
  const { dropdownRef, consoleName } = props;

  const closeDropdown = () => {
    if (dropdownRef.current) dropdownRef.current.style.display = 'none';
  };

  return (
    <div
      className="dropdown-container"
      ref={dropdownRef}
    >
      <ul className="character-list">
        {getConsoleCharacterData(consoleName).map(({ name }) => (
          <li
            key={name}
            className="character-name"
          >
            <button
              type="button"
              className="character-name"
            >
              {capitalizeString(name)}
            </button>
          </li>
        ))}
        <li className="close-dropdown">

          <button className="close-dropdown-button" type="button" onClick={closeDropdown}>
            <FontAwesomeIcon icon={faXmark} />
            Close
          </button>
        </li>
      </ul>
    </div>
  );
}
