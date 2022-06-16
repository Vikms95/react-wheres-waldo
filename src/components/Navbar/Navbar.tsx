import React from 'react';

interface Props{

}

function Navbar(props: Props) {
  return (
    <header className="navigation-bar">
      <h1 className="webpage-header"> FindMe </h1>
      <h2 className="leaderboards-header"> Leaderboards </h2>
    </header>
  );
}

export default Navbar;
