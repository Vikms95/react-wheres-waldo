import React, {
  LegacyRef, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOutUser } from '../../utils/setupGoogleSignin';

function Navbar() {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const renderHeaderDropdown = () => {
    if (dropdownRef.current !== null && dropdownRef.current.hasAttribute('hidden')) {
      dropdownRef.current.removeAttribute('hidden');
    } else {
      dropdownRef.current?.setAttribute('hidden', 'true');
    }
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

      <div
        role="button"
        tabIndex={0}
        className="open-header-dropdown"
        onClick={renderHeaderDropdown}
      >
        <FontAwesomeIcon icon={faEllipsis} />

        <ul className="header-dropdown" ref={dropdownRef as LegacyRef<HTMLUListElement> | undefined} hidden>
          <li>
            <Link to="/leaderboards/*" className="dropdown-item">
              <div>Leaderboards</div>
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="sign-in webpage-dropdown"
              onClick={signIn}
            >
              Sign-in with Google
            </button>
          </li>
          <li>
            <button
              type="button"
              className="sign-out webpage-dropdown"
              onClick={signOutUser}
            >
              <div className="user-pic" />
              {' '}
              Sign-out
            </button>
          </li>
        </ul>

      </div>

    </nav>
  );
}

export default Navbar;
