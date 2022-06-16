import React from 'react';

interface Props{

}

export default function Homepage(props: Props) {
  return (
    <main className="homepage-container">
      <section className="instructions-container">
        <h3>Instructions</h3>
        <article>
          <h4>How to play</h4>
        </article>
        <article>
          <h4>Leaderboard</h4>
        </article>
      </section>
      <section className="map-selection-container">
        <img src="" alt="super-nintendo-map" />
        <img src="" alt="gamecube-map" />
        <img src="" alt="playstation1-map" />
        <img src="" alt="playstation2-map" />
      </section>
    </main>
  );
}
