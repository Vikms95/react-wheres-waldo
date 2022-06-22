import React, { FormEvent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import formatTimer from '../../utils/formatTimer';

interface Props{
    timeElapsed: number
    submitScoreToDatabase: (e: FormEvent<HTMLFormElement>, name: string) => Promise<void>
    playerAlias: string
    handleInputChange: (event: MouseEvent | SyntheticEvent) => void
    consoleName: string | null
}

function Modal(props: Props) {
  const {
    timeElapsed,
    submitScoreToDatabase,
    playerAlias,
    handleInputChange,
    consoleName,
  } = props;

  return (
    <section className="background-brightness-wrapper">
      <article className="game-win-modal-border">
        <article className="game-win-modal">
          <article className="score-display">
            Your score is:
            {' '}
            <span className="timer-value">
              {formatTimer(timeElapsed.toString())}
            </span>
          </article>
          <form className="alias-form" onSubmit={(e) => submitScoreToDatabase(e, playerAlias)}>

            <label htmlFor="score" className="form-input">
              Enter alias
              <input id="score" type="text" value={playerAlias} onChange={handleInputChange} placeholder="Your alias here ..." />
              <hr className="input-hr" />
            </label>

            <button type="submit"> Upload score </button>
          </form>
          <article className="form-buttons">
            <Link to="/leaderboards">
              <button type="button" className="leaderboard-button"> Leaderboards </button>
            </Link>
            <Link to="/game">
              <button type="button" data-type={consoleName}> Retry </button>
            </Link>
            <Link to="/">
              <button type="button"> Home </button>
            </Link>
          </article>
        </article>
      </article>
    </section>
  );
}

export default Modal;
