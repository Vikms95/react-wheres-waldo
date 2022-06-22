import React, {
  FormEvent, LegacyRef, SyntheticEvent, useEffect, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import formatTimer from '../../utils/formatTimer';

interface Props{
    timeElapsed: number
    playerAlias: string
    consoleName: string | null
    validatedCharacters: string[]
    handleInputChange: (event: MouseEvent | SyntheticEvent) => void
    submitScoreToDatabase: (e: FormEvent<HTMLFormElement>, name: string) => Promise<void>
}

function Modal(props: Props) {
  const {
    timeElapsed,
    playerAlias,
    consoleName,
    validatedCharacters,
    handleInputChange,
    submitScoreToDatabase,
  } = props;

  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (validatedCharacters.length === 3 && modalRef.current) {
      modalRef.current.classList.add('show');
    }
  });

  return (
    <section className="background-brightness-wrapper">
      <article className="game-win-modal-border" ref={modalRef}>
        <article className="game-win-modal">
          <article className="score-display">
            Your score is:
            {' '}
            <span className="timer-value">
              {formatTimer(timeElapsed.toString())}
            </span>
          </article>
          <form
            className="alias-form"
            onSubmit={(e) => submitScoreToDatabase(e, playerAlias)}
          >

            <label
              htmlFor="score"
              className="form-input"
            >
              Enter alias
              <input
                id="score"
                type="text"
                value={playerAlias}
                onChange={handleInputChange}
                placeholder="Your alias here ..."
              />
              <hr className="input-hr" />
            </label>

            <button type="submit"> Upload score </button>
          </form>
          <article className="form-buttons">
            <Link to="/leaderboards">
              <button
                type="button"
                className="leaderboard-button"
              >
                {' '}
                Leaderboards
              </button>
            </Link>
            <Link to="/game">
              <button
                type="button"
                data-type={consoleName}
              >
                {' '}
                Retry
              </button>
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
