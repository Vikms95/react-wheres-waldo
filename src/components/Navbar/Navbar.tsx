import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../../utils/setupGoogleSignin';

function Navbar() {
  return (
    <header className="navigation-bar">
      <Link to="/" className="webpage-header">
        <h1> FindMe </h1>
      </Link>
      <Link to="/leaderboards/*" className="webpage-header">
        <h1>Leaderboards</h1>
      </Link>
      <button type="button" onClick={signIn}>Sign-in</button>
    </header>
  );
}

export default Navbar;
