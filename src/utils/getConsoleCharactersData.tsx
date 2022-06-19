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

const getConsoleCharacterData = (consoleName: string | null) => {
  const CHARACTER_IMAGES = {
    'super-nintendo':
    [
      { name: 'mario', image: marioPhoto },
      { name: 'chrono', image: chronoPhoto },
      { name: 'zero', image: zeroPhoto },
    ],
    gamecube: [
      { name: 'samus', image: samusPhoto },
      { name: 'marth', image: marthPhoto },
      { name: 'toad', image: toadPhoto },
    ],
    'playstation-1': [
      { name: 'mantis', image: mantisPhoto },
      { name: 'vivi', image: viviPhoto },
      { name: 'alucard', image: alucardPhoto },
    ],
    'playstation-2': [
      { name: 'ratchet', image: ratchetPhoto },
      { name: 'prince', image: princePhoto },
      { name: 'chibi', image: chibiPhoto },
    ],
  };
  return CHARACTER_IMAGES[consoleName as keyof typeof CHARACTER_IMAGES];
};

export default getConsoleCharacterData;
