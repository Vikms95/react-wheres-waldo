import React from 'react';
import { Link } from 'react-router-dom';
import snes from '../../assets/snes.jpg';
import ps1 from '../../assets/ps1.jpg';
import ps2 from '../../assets/ps2.jpg';
import gc from '../../assets/gamecube.jpg';

interface Props{

}

export default function Homepage(props: Props) {
  return (
    <main className="homepage-container">
      <section className="instructions-container">
        <h3 className="instructions-header">Instructions</h3>
        <div className="instructions-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatum nulla ex molestias error cum ipsa, repellendus
          vitae placeat dolores aliquam pariatur ducimus eum, recusandae
          consectetur quae. Fugiat tempore asperiores placeat.
        </div>
        <article>
          <h4>How to play</h4>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum nulla ex molestias error cum ipsa, repellendus
            vitae placeat dolores aliquam pariatur ducimus eum, recusandae
            consectetur quae. Fugiat tempore asperiores placeat.
          </div>
        </article>
        <article>
          <h4>Leaderboard</h4>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum nulla ex molestias error cum ipsa, repellendus
            vitae placeat dolores aliquam pariatur ducimus eum, recusandae
            consectetur quae. Fugiat tempore asperiores placeat.
          </div>
        </article>
      </section>

      <section className="map-selection-container">
        <img src={snes} alt="super-nintendo-map" />
        <img src={gc} alt="gamecube-map" />
        <img src={ps1} alt="playstation1-map" />
        <img src={ps2} alt="playstation2-map" />
      </section>

    </main>
  );
}
