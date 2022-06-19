import React from 'react';
import getConsoleCharacterImages from '../../utils/getConsoleCharactersData';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  consoleName: string | null
}

export default function GameDropdown(props: Props) {
  const { dropdownRef, consoleName } = props;

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <ul>
        {getConsoleCharacterImages(consoleName).map((characterImage) => (
          <li>
            <img
              src={characterImage}
              alt="dropdown-character"
              className="dropdown-character-image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
