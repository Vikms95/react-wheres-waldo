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
          <li className="character-name">
            <p>{capitalizeString(name)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
