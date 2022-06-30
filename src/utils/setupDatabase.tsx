import { initializeApp } from 'firebase/app';
import {
  addDoc, collection, getFirestore, onSnapshot, query,
} from 'firebase/firestore';
import { characterCoordinates } from './characterData';

const firebaseConfig = {
  apiKey: 'AIzaSyBXpredE18hwvOQufPrjZR99-bhGB7cq6g',
  authDomain: 'wheres-waldo-c41c4.firebaseapp.com',
  projectId: 'wheres-waldo-c41c4',
  storageBucket: 'wheres-waldo-c41c4.appspot.com',
  messagingSenderId: '479455283648',
  appId: '1:479455283648:web:83d64240ea9b28b111a025',
};

initializeApp(firebaseConfig);

/**
 * Sets up character positions data
 */
const saveCoordinatesToDatabase = () => {
  // We check if the database is in existence, and only create it if it does not exist
  onSnapshot(query(collection(getFirestore(), 'coordinates')), async (snapshot) => {
    if (snapshot.docs.length === 0) {
      try {
        await addDoc(collection(getFirestore(), 'coordinates'), { characterCoordinates });
      } catch (err) {
        console.error('Unable to create database: ', err);
      }
    }
  });
};

export default saveCoordinatesToDatabase;
