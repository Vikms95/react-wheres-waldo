import marioPhoto from '../assets/mario-snes.png';
import chronoPhoto from '../assets/chrono-snes.png';
import zeroPhoto from '../assets/zero-snes.png';
import samusPhoto from '../assets/samus-gc.png';
import marthPhoto from '../assets/marth-gc.png';
import toadPhoto from '../assets/toad-gc.png';
import mantisPhoto from '../assets/mantis-ps1.png';
import viviPhoto from '../assets/vivi-ps1.png';
import alucardPhoto from '../assets/alucard-ps1.png';
import ratchetPhoto from '../assets/ratchet-ps2.png';
import princePhoto from '../assets/prince-ps2.png';
import chibiPhoto from '../assets/chibi-ps2.png';

const getConsoleCharacterImages = (consoleName: string | null) => {
  const CHARACTER_IMAGES = {
    'super-nintendo': [marioPhoto, chronoPhoto, zeroPhoto],
    gamecube: [samusPhoto, marthPhoto, toadPhoto],
    'playstation-1': [mantisPhoto, viviPhoto, alucardPhoto],
    'playstation-2': [ratchetPhoto, princePhoto, chibiPhoto],
  };
  return CHARACTER_IMAGES[consoleName as keyof typeof CHARACTER_IMAGES];
};

export default getConsoleCharacterImages;
