/* eslint-disable no-restricted-globals */
import './styles/App.scss';
import React, { useEffect, useState } from 'react';
import {
  HashRouter, Routes, Route,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Leaderboards from './components/Leaderboards/Leaderboards';
import GameView from './components/GameView/GameView';
import saveCoordinates from './utils/setupDatabase';

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
    localStorage.setItem('consoleName', gameImage as string);
    setConsoleName(gameImage);
  };

  useEffect(() => {
    saveCoordinates();
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
