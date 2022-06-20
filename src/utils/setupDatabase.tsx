import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { addSyntheticLeadingComment } from 'typescript';
import getConsoleCharacterData from './getConsoleCharactersData';

const firebaseConfig = {
  apiKey: 'AIzaSyBXpredE18hwvOQufPrjZR99-bhGB7cq6g',
  authDomain: 'wheres-waldo-c41c4.firebaseapp.com',
  projectId: 'wheres-waldo-c41c4',
  storageBucket: 'wheres-waldo-c41c4.appspot.com',
  messagingSenderId: '479455283648',
  appId: '1:479455283648:web:83d64240ea9b28b111a025',
};

const app = initializeApp(firebaseConfig);

/**
 * Sets up character positions data only when the collection does not exist
 */
const saveCoordinatesToDatabase = async () => {
  const consoleNames = ['super-nintendo', 'game-cube', 'playstation-1', 'playstation-2'];

  // Only setup the database if no database is created
  if (collection(getFirestore(), 'coordinates').id.length === 0) {
    try {
      await addDoc(collection(getFirestore(), 'coordinates'), {
        'super-nintendo': [
          { mario: { width: [87, 94], height: [101, 112] } },
          { chrono: { width: [48, 53], height: [126, 134] } },
          { zero: [900, 300] },
        ],
        'game-cube': [
          { samus: [500, 200] },
          { marth: [200, 400] },
          { toad: [900, 300] },
        ],
        'playstation-1': [
          { mantis: [500, 200] },
          { vivi: [200, 400] },
          { alucard: [900, 300] },
        ],
        'playstation-2': [
          { ratchet: [500, 200] },
          { prince: [200, 400] },
          { chibi: [900, 300] },
        ],
      });
    } catch (err) {
      console.error('Unable to create database: ', err);
    }
  }
};

export default saveCoordinatesToDatabase;
