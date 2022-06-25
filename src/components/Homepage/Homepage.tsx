import React from 'react';
import { Link } from 'react-router-dom';

import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';

interface Props{
  handleSelectedConsole: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export default function Homepage(props: Props) {
  const { handleSelectedConsole } = props;

  return (
    <main className="homepage-container">
      <section className="instructions-container">
        <article className="instructions-article">
          <h3 className="instructions-header">Instructions</h3>
          <p className="instructions-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum nulla ex molestias error cum ipsa, repellendus
            vitae placeat dolores aliquam pariatur ducimus eum, recusandae
            consectetur quae. Fugiat tempore asperiores placeat.
          </p>
        </article>
        <article className="instructions-article">
          <h4 className="instructions-header">How to play</h4>
          <p className="instructions-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum nulla ex molestias error cum ipsa, repellendus
            vitae placeat dolores aliquam pariatur ducimus eum, recusandae
            consectetur quae. Fugiat tempore asperiores placeat.
          </p>
        </article>
        <article className="instructions-article">
          <h4 className="instructions-header">Leaderboard</h4>
          <p className="instructions-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum nulla ex molestias error cum ipsa, repellendus
            vitae placeat dolores aliquam pariatur ducimus eum, recusandae
            consectetur quae. Fugiat tempore asperiores placeat.
          </p>
        </article>
      </section>

      <section className="map-selection-container">
        <Link
          to="/game"
          data-type="super-nintendo"
          onClick={(e) => handleSelectedConsole(e)}
        >
          <img src={snes} alt="super-nintendo" data-type="super-nintendo" />
        </Link>
        <Link
          to="/game"
          data-type="game-cube"
          onClick={(e) => handleSelectedConsole(e)}
        >
          <img src={gc} alt="game-cube" data-type="game-cube" />
        </Link>
        <Link
          to="/game"
          data-type="playstation-1"
          onClick={(e) => handleSelectedConsole(e)}
        >
          <img src={ps1} alt="playstation-1" data-type="playstation-1" />
        </Link>
        <Link
          to="/game"
          data-type="playstation-2"
          onClick={(e) => handleSelectedConsole(e)}
        >
          <img src={ps2} alt="playstation-2" data-type="playstation-2" />
        </Link>
      </section>

    </main>
  );
}
