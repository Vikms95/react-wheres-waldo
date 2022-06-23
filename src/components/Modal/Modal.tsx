import React, {
  FormEvent, SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import formatTimer from '../../utils/formatTimer';

interface Props{
    timeElapsed: number
    consoleName: string | null
}

function Modal(props: Props) {
  const {
    timeElapsed,
    consoleName,
  } = props;

  const [playerAlias, setPlayerAlias] = useState('');

  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.add('show');
    }
  });

  const handleInputChange = (event: MouseEvent | SyntheticEvent) => {
    const inputElement = event.target as HTMLInputElement;
    setPlayerAlias(inputElement.value);
  };

  const submitScoreToDatabase = async (
    e: FormEvent<HTMLFormElement>,
    name: string,
    consoleToSubmit: string | null,
  ) => {
    e.preventDefault();
    const { time, alias } = getScoreInfo(name);
    setPlayerAlias('');

    try {
      await addDoc(collection(getFirestore(), `highscores-${consoleToSubmit}`), { alias, score: time });
    } catch (err) {
      console.error('Error submiting your item to the database', err);
    }
  };

  const getScoreInfo = (name: string) => {
    const alias = name || 'Anonymous';
    const time = formatTimer(timeElapsed.toString());
    return { time, alias };
  };

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
            onSubmit={(e) => submitScoreToDatabase(e, playerAlias, consoleName)}
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
