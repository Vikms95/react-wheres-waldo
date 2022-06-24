import './styles/App.scss';
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Leaderboards from './components/Leaderboards';
import GameView from './components/GameView';
import LeaderboardMenu from './components/Leaderboards/LeaderboardMenu';
import ConsoleContext from './context/ConsoleContext';
import saveCoordinatesToDatabase from './utils/setupDatabase';

export default function App() {
  const [selectedConsole, setSelectedConsole] = useState<string | null>(
    localStorage.getItem('consoleName') || '',
  );

  useEffect(() => {
    saveCoordinatesToDatabase();
  }, []);

  /**
     * Sets the image to use when Gameview is loaded
     * based on the console button clicked
     */
  const handleSelectedConsole = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    const imageElement = e.target as HTMLInputElement;
    const gameImage:string | null = imageElement.getAttribute('data-type');

    localStorage.setItem('consoleName', gameImage as string);
    setSelectedConsole(gameImage);
  };

  return (
    <ConsoleContext.Provider value={selectedConsole as string}>
      <div className="App">
        <HashRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={(
                <Homepage
                  handleSelectedConsole={handleSelectedConsole}
                />
)}
            />
            <Route
              path="/leaderboards/*"
              element={(
                <LeaderboardMenu
                  handleSelectedConsole={handleSelectedConsole}
                />

)}
            />
            <Route
              path={`/${selectedConsole}`}
              element={(
                <Leaderboards />
)}
            />

            <Route
              path="/game"
              element={(
                <GameView />
)}
            />
          </Routes>
        </HashRouter>
      </div>
    </ConsoleContext.Provider>
  );
}
