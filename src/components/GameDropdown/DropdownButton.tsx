import React from 'react';
import capitalizeString from '../../utils/capitalizeString';

interface Props {
  name: string
  checkCoordinatesOnDatabase: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    characterName: string
  ) => void
}

function DropdownButton(props: Props) {
  const { name, checkCoordinatesOnDatabase } = props;
  return (
    <li key={name} className="character-name">
      <button
        type="button"
        className="character-name"
        onClick={(e) => checkCoordinatesOnDatabase(e, name)}
      >
        {capitalizeString(name)}
      </button>
    </li>
  );
}

export default DropdownButton;
