import React, { useEffect } from 'react';
import isClickOutside from '../../utils/isClickOutside';

interface Props{
  dropdownRef: React.RefObject<HTMLInputElement>;
  setIsDropdownRendered: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GameDropdown(props: Props) {
  const { dropdownRef, setIsDropdownRendered } = props;

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (isClickOutside(event)) {
      setIsDropdownRendered(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.addEventListener('mousedown', handleClickOutsideDropdown);
    };
  });

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <ul>
        <li>hi</li>
        <li>hi</li>
        <li>hi</li>
      </ul>
    </div>
  );
}
