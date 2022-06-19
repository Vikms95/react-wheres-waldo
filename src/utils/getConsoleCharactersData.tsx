import marioPhoto from '../assets/mario-snes.png';
import chronoPhoto from '../assets/chrono-snes.png';
import zeroPhoto from '../assets/zero-snes.png';

const getConsoleCharacterImages = (consoleName: string | null) => {
  const CHARACTER_IMAGES = {
    'super-nintendo': [marioPhoto, chronoPhoto, zeroPhoto],
    gamecube: [marioPhoto, marioPhoto, marioPhoto],
    'playstation-1': [marioPhoto, marioPhoto, marioPhoto],
    'playstation-2': [marioPhoto, marioPhoto, marioPhoto],
  };
  console.log(CHARACTER_IMAGES[consoleName as keyof typeof CHARACTER_IMAGES]);
  return CHARACTER_IMAGES[consoleName as keyof typeof CHARACTER_IMAGES];
};

export default getConsoleCharacterImages;
