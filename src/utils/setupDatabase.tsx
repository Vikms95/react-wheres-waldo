import { initializeApp } from 'firebase/app';
import {
  addDoc, collection, getFirestore, onSnapshot, query,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBXpredE18hwvOQufPrjZR99-bhGB7cq6g',
  authDomain: 'wheres-waldo-c41c4.firebaseapp.com',
  projectId: 'wheres-waldo-c41c4',
  storageBucket: 'wheres-waldo-c41c4.appspot.com',
  messagingSenderId: '479455283648',
  appId: '1:479455283648:web:83d64240ea9b28b111a025',
};

const app = initializeApp(firebaseConfig);

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

/**
 * Sets up character positions data only when the collection does not exist
 */
const saveCoordinatesToDatabase = () => {
  const consoleNames = ['super-nintendo', 'game-cube', 'playstation-1', 'playstation-2'];

  onSnapshot(query(collection(getFirestore(), 'coordinates')), async (snapshot) => {
    // Only setup the database if no database is created
    if (snapshot.docs.length === 0) {
      try {
        await addDoc(collection(getFirestore(), 'coordinates'), { characterCoordinates });
      } catch (err) {
        console.error('Unable to create database: ', err);
      }
    }
  });
};

const saveItemToDatabase = () => {

};

export default saveCoordinatesToDatabase;
