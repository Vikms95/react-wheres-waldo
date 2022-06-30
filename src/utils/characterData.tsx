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
    'game-cube': [
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

const characterCoordinates = {
  'super-nintendo': {
    mario: { width: [87, 94], height: [101, 112] },
    chrono: { width: [48, 53], height: [126, 134] },
    zero: { width: [26, 38], height: [128, 138] },
  },
  'game-cube': {
    samus: { width: [82, 89], height: [112, 120] },
    marth: { width: [48, 54], height: [139, 148] },
    toad: { width: [33, 38], height: [94, 98] },
  },
  'playstation-1': {
    mantis: { width: [45, 50], height: [143, 148] },
    vivi: { width: [42, 46], height: [109, 115] },
    alucard: { width: [61, 68], height: [140, 148] },
  },
  'playstation-2': {
    ratchet: { width: [44, 50], height: [126, 134] },
    prince: { width: [76, 81], height: [93, 100] },
    chibi: { width: [23, 28], height: [77, 84] },
  },
};

export { getConsoleCharacterData, characterCoordinates };
