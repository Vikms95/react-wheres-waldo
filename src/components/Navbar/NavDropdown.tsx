import React, { LegacyRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signIn, signOutUser } from '../../utils/setupGoogleSignin';

interface Props{
  dropdownRef: React.RefObject<HTMLUListElement>
  isDropdownRendered: boolean
  handleClickOutsideDropdown: (event: MouseEvent) => void
}

function NavDropdown(props: Props) {
  const { dropdownRef, isDropdownRendered, handleClickOutsideDropdown } = props;

  return (
    <ul className="header-dropdown" ref={(dropdownRef as LegacyRef<HTMLUListElement> | undefined)} hidden>
      <li>
        <Link to="/leaderboards/*" className="dropdown-item">
          <div>Leaderboards</div>
        </Link>
      </li>

      <li>
        <button type="button" className="sign-in webpage-dropdown" onClick={signIn}>
          Sign-in with Google
        </button>
      </li>
      <li>
        <button type="button" className="sign-out webpage-dropdown" onClick={signOutUser}>
          <div className="user-pic" />
          {' '}
          Sign-out
        </button>
      </li>
    </ul>
  );
}

export default NavDropdown;
