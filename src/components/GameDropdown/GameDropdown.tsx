import React from 'react';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  consoleName: string | null
}

export default function GameDropdown(props: Props) {
  const { dropdownRef, consoleName } = props;

  return (
    <div className="dropdown-container" ref={dropdownRef}>
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
      </ul>
    </div>
  );
}
