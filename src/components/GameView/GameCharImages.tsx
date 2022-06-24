import React, { useContext } from 'react';
import getConsoleCharacterData from '../../utils/getConsoleCharactersData';
import capitalizeString from '../../utils/capitalizeString';
import ConsoleContext from '../../context/ConsoleContext';

function GameCharImages() {
  const selectedConsole = useContext(ConsoleContext);
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
