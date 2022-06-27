import React, { LegacyRef } from 'react';
import { Link } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOutUser } from '../../utils/setupGoogleSignin';

interface Props{
  dropdownRef: React.RefObject<HTMLUListElement>
}

function NavDropdown(props: Props) {
  const { dropdownRef } = props;

  return (
    <ul className="header-dropdown" ref={(dropdownRef as LegacyRef<HTMLUListElement> | undefined)} hidden>
      <li>
        <Link to="/leaderboards/*" className="dropdown-item">
          <div>Leaderboards</div>
        </Link>
      </li>

      <li>
        <button
          type="button"
          className="sign-in webpage-dropdown dropdown-item"
          onClick={signIn}
        >
          <FontAwesomeIcon icon={faGoogle} />
          Sign in
        </button>
      </li>
      <li>
        <button
          type="button"
          className="sign-out webpage-dropdown dropdown-item"
          onClick={signOutUser}
        >
          <div className="user-pic" />
          {' '}
          Sign-out
        </button>
      </li>
    </ul>
  );
}

export default NavDropdown;
