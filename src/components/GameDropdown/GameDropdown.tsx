import React, { useEffect } from 'react';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';
import isClickOutside from '../../utils/isClickOutside';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  consoleName: string | null
}

export default function GameDropdown(props: Props) {
  const { dropdownRef, consoleName } = props;

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    // eslint-disable-next-line no-debugger
    console.log(isClickOutside(event, dropdownRef));
    if (dropdownRef.current && isClickOutside(event, dropdownRef)) {
      dropdownRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.addEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);

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
      </ul>
    </div>
  );
}
