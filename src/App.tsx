/* eslint-disable no-restricted-globals */
import './styles/App.scss';
import React, { useEffect, useState } from 'react';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import { initializeApp } from 'firebase/app';

import { getActiveElement } from '@testing-library/user-event/dist/utils';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Leaderboards from './components/Leaderboards/Leaderboards';
import GameView from './components/GameView/GameView';

const firebaseConfig = {
  apiKey: 'AIzaSyBXpredE18hwvOQufPrjZR99-bhGB7cq6g',
  authDomain: 'wheres-waldo-c41c4.firebaseapp.com',
  projectId: 'wheres-waldo-c41c4',
  storageBucket: 'wheres-waldo-c41c4.appspot.com',
  messagingSenderId: '479455283648',
  appId: '1:479455283648:web:83d64240ea9b28b111a025',
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const [consoleName, setConsoleName] = useState<string | null>(
    localStorage.getItem('consoleName') || '',
  );

  /**
   * Sets the image to use when Gameview is loaded
   * based on the console clicked
   */
  const handleConsoleImage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const imageElement = event.target as HTMLInputElement;
    const gameImage:string | null = imageElement.getAttribute('alt');
    setConsoleName(gameImage);
    localStorage.setItem('consoleName', gameImage as string);
  };

  useEffect(() => {
    window.addEventListener('load', () => {
      location.href = '/';
    });
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={(
              <Homepage
                handleConsoleImage={handleConsoleImage}
              />
)}
          />
          <Route
            path="/leaderboards"
            element={<Leaderboards />}
          />
          <Route
            path="/game"
            element={(
              <GameView
                consoleName={consoleName}
              />
)}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}
