import React from 'react';
import { Link } from 'react-router-dom';
import { signIn, signOutUser } from '../../utils/setupGoogleSignin';

function Navbar() {
  return (
    <header className="navigation-bar">
      <Link to="/" className="webpage-header">
        <h1> FindMe </h1>
      </Link>
      <Link to="/leaderboards/*" className="webpage-header">
        <h1>Leaderboards</h1>
      </Link>

      <button
        type="button"
        className="sign-in webpage-header"
        onClick={signIn}
      >
        Sign-in with Google
      </button>
      <button
        type="button"
        className="sign-out webpage-header"
        onClick={signOutUser}
      >
        <div className="user-pic" />
        {' '}
        Sign-out
      </button>
    </header>
  );
}

export default Navbar;
