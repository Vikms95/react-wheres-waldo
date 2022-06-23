import React from 'react';
import capitalizeString from '../../utils/capitalizeString';

interface Props {
  name: string
  checkCoordinatesOnDatabase: (
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
        onClick={() => checkCoordinatesOnDatabase(name)}
      >
        {capitalizeString(name)}
      </button>
    </li>
  );
}

export default DropdownButton;
