import React from 'react';
import { Link } from 'react-router-dom';

interface Props{
  consoleName: string | null
}

function ModalButtons(props: Props) {
  const { consoleName } = props;

  return (
    <article className="form-buttons">
      <Link to="/leaderboards">
        <button type="button" className="leaderboard-button">
          {' '}
          Leaderboards
        </button>
      </Link>
      <Link to="/game">
        <button type="button" data-type={consoleName}>
          {' '}
          Retry
        </button>
      </Link>
      <Link to="/">
        <button type="button"> Home </button>
      </Link>
    </article>
  );
}

export default ModalButtons;
