import React from 'react';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';

interface Props{
  consoleName: string | null
}

function GameCharImages(props: Props) {
  const { consoleName } = props;
  return (
    <section className="characters-container">
      {getConsoleCharacterData(consoleName).map(({ image, name }) => (
        <div key={name} className="character-data-container">
          <span className="character-name">{capitalizeString(name)}</span>
          <img src={image} alt={name} className="character-image" />
        </div>
      ))}
    </section>
  );
}

export default GameCharImages;
