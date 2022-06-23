import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboards from './Leaderboards';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';

interface Props{
  handleConsoleImage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

function LeaderboardMenu(props: Props) {
  const { handleConsoleImage } = props;

  return (
    <section className="map-selection-container">
      <Link
        to="/leaderboards/:super-nintendo"
        data-type="super-nintendo"
        onClick={(e) => handleConsoleImage(e)}
      >
        <img src={snes} alt="super-nintendo" data-type="super-nintendo" />
      </Link>
      <Link
        to="/leaderboards:game-cube"
        data-type="game-cube"
        onClick={(e) => handleConsoleImage(e)}
      >
        <img src={gc} alt="game-cube" data-type="game-cube" />
      </Link>
      <Link
        to="/leaderboards/:playstation-1"
        data-type="playstation-1"
        onClick={(e) => handleConsoleImage(e)}
      >
        <img src={ps1} alt="playstation-1" data-type="playstation-1" />
      </Link>
      <Link
        to="/leaderboards/playstation-2"
        data-type="playstation-2"
        onClick={(e) => handleConsoleImage(e)}
      >
        <img src={ps2} alt="playstation-2" data-type="playstation-2" />
      </Link>
    </section>
  );
}

export default LeaderboardMenu;
