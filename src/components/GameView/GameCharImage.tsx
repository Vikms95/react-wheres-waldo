import React from 'react';
import capitalizeString from '../../utils/capitalizeString';

interface Props{
  name: string
  image: string
}

function GameCharImage(props: Props) {
  const { name, image } = props;
  return (
    <div key={name} className="character-data-container">
      <span className="character-name">{capitalizeString(name)}</span>
      <img src={image} alt={name} className="character-image" />
    </div>
  );
}

export default GameCharImage;
