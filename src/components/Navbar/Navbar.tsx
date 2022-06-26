import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOutUser } from '../../utils/setupGoogleSignin';

function Navbar() {
  const [isDropdownRendered, setIsDropdownRendered] = useState(false);

  const renderHeaderDropdown = () => {

  };

  return (
    <nav className="navigation-bar">

      <Link to="/" className="webpage-header">
        <h1> FindMe </h1>
      </Link>

      <Link to="/leaderboards/*" className="leaderboards webpage-header">
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

      <button
        type="button"
        className="open-header-dropdown"
        onClick={() => setIsDropdownRendered(!isDropdownRendered)}
      >
        <FontAwesomeIcon icon={faEllipsis} />
        {(isDropdownRendered)
        && (
        <ul className="header-dropdown">
          <Link to="/leaderboards/*" className="dropdown-item">
            <li>Leaderboards</li>
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

        </ul>
        )}
      </button>

    </nav>
  );
}

export default Navbar;
