import './styles/App.scss';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Leaderboards from './components/Leaderboards/Leaderboards';
import GameView from './components/GameView/GameView';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/game" element={<GameView />} />
        </Routes>
      </HashRouter>

    </div>
  );
}
