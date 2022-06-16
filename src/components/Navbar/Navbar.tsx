import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboards from '../Leaderboards/Leaderboards';

interface Props{

}

function Navbar(props: Props) {
  return (
    <header className="navigation-bar">
      <Link to="/" className="webpage-header">
        <h1> FindMe </h1>
      </Link>
      <Link to="/leaderboards" className="leaderboards-header">
        <h2>Leaderboards</h2>
      </Link>

    </header>
  );
}

export default Navbar;
