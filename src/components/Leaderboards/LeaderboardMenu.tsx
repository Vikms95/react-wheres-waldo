import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Leaderboards from './Leaderboards';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';

interface Props{
  handleSelectedConsole: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  selectedConsole: string | null
}

function LeaderboardMenu(props: Props) {
  const { handleSelectedConsole: handleConsoleImage, selectedConsole } = props;

  return (
    <section className="leaderboard-selection-container">
      <article>
        <h2>Super Nintendo</h2>
        <Link
          to="/super-nintendo"
          data-type="super-nintendo"
          onClick={(e) => handleConsoleImage(e)}
        >
          <img src={snes} alt="super-nintendo" data-type="super-nintendo" />
        </Link>
      </article>

      <article>
        <h2>Gamecube</h2>
        <Link
          to="/game-cube"
          data-type="game-cube"
          onClick={(e) => handleConsoleImage(e)}
        >
          <img src={gc} alt="game-cube" data-type="game-cube" />
        </Link>

      </article>
      <article>

        <h2>Playstation 1</h2>
        <Link
          to="/playstation-1"
          data-type="playstation-1"
          onClick={(e) => handleConsoleImage(e)}
        >
          <img src={ps1} alt="playstation-1" data-type="playstation-1" />
        </Link>
      </article>

      <article>
        <h2>Playstation 2</h2>
        <Link
          to="/playstation-2"
          data-type="playstation-2"
          onClick={(e) => handleConsoleImage(e)}
        >
          <img src={ps2} alt="playstation-2" data-type="playstation-2" />
        </Link>
      </article>

    </section>
  );
}

export default LeaderboardMenu;
