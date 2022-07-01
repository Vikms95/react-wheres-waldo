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
          <h3 className="instructions-header">Find your favourite videogame characters!</h3>
          <p className="instructions-text">
            We are sure you remember the videogame characters that accompanied your childhood.
            <br />
            <br />
            Now they are hiding from you, for some reason.
            <br />
            <br />
            <strong>
              <i>
                Find them and get the best score on each map.
              </i>
            </strong>
          </p>
        </article>
        <article className="instructions-article">
          <h4 className="instructions-header">How to play</h4>
          <p className="instructions-text">
            When the game starts, three characters are proposed to be found.
            <br />
            <br />
            <strong>
              <i>
                Click on a character and select its name from the dropdown list to score one point.
              </i>
            </strong>
            <br />
            <br />
            Whenever all three characters are found, you will be given the option to upload your
            score to a worldwide leaderboard.
          </p>
        </article>
        <article className="instructions-article">
          <h4 className="instructions-header">Leaderboard</h4>
          <p className="instructions-text">
            Each console has two leaderboards.
            <br />
            Latest scores displays the best scores uploaded on the last 24 hours.
            <br />
            All-time scores displays the best scores on record.
          </p>
        </article>
      </section>

      <section className="map-selection-container">
        <Link
          to="/game"
          data-type="super-nintendo"
          data-testid="super-nintendo"
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
          data-type="playstation-2"
          onClick={(e) => handleSelectedConsole(e)}
        >
          <img
            src={ps2}
            alt="playstation-2"
            className="homepage-link-ps2"
            data-type="playstation-2"
          />
        </Link>
        <Link
          to="/game"
          data-type="playstation-1"
          onClick={(e) => handleSelectedConsole(e)}
        >
          <img src={ps1} alt="playstation-1" data-type="playstation-1" />
        </Link>
      </section>
    </main>
  );
}
