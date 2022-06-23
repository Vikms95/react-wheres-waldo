import React from 'react';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';

interface Props{
  selectedConsole: string | null
}

function GameCharImages(props: Props) {
  const { selectedConsole } = props;
  return (
    <section className="characters-container">
      {getConsoleCharacterData(selectedConsole).map(({ image, name }) => (
        <div key={name} className="character-data-container">
          <span className="character-name">{capitalizeString(name)}</span>
          <img src={image} alt={name} className="character-image" />
        </div>
      ))}
    </section>
  );
}

export default GameCharImages;
