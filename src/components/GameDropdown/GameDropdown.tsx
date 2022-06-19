import React, { useEffect } from 'react';
import isClickOutside from '../../utils/isClickOutside';
import mario from '../../assets/mario-snes.png';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
}

export default function GameDropdown(props: Props) {
  const { dropdownRef } = props;

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <ul>
        <li>
          <img src={mario} alt="mario" className="character-image" />
        </li>
        <li>
          <img src={mario} alt="mario" className="character-image" />
        </li>
        <li>
          <img src={mario} alt="mario" className="character-image" />
        </li>
      </ul>
    </div>
  );
}
