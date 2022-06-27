import React, {
  useRef, useState, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOutUser } from '../../utils/setupGoogleSignin';
import NavDropdown from './NavDropdown';

function Navbar() {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const renderDropdownButtonRef = useRef(null);
  const [isDropdownRendered, setIsDropdownRendered] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown);
  }, []);

  const renderHeaderDropdown = () => {
    if (dropdownRef.current !== null && dropdownRef.current.hasAttribute('hidden')) {
      dropdownRef.current.removeAttribute('hidden');
    } else {
      dropdownRef.current?.setAttribute('hidden', 'true');
    }
  };

  /**
   * Takes a reference from an element and checks if
   * the click is within the element
   */
  const isClickOutside = (
    event: MouseEvent,
    ref?: React.MutableRefObject<any>,
    secondRef?: React.MutableRefObject<any>,
  ) => (
    // if the dropdown is not clicked but that click does not include the button
    !ref?.current.contains(event.target as HTMLInputElement)
    && !secondRef?.current.contains(event.target as HTMLInputElement));

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (isClickOutside(event, dropdownRef, renderDropdownButtonRef)) {
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
        <FontAwesomeIcon icon={faGoogle} />
        Sign in
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
        ref={renderDropdownButtonRef}
        onClick={renderHeaderDropdown}
      >
        <FontAwesomeIcon icon={faEllipsis} />

        <NavDropdown
          dropdownRef={dropdownRef}
          isDropdownRendered={isDropdownRendered as boolean}
          handleClickOutsideDropdown={handleClickOutsideDropdown}
        />

      </div>

    </nav>
  );
}

export default Navbar;
