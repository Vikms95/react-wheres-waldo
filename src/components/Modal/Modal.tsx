import React, {
  FormEvent, SyntheticEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import ModalForm from './ModalForm';
import formatTimer from '../../utils/formatTimer';
import ModalButton from './ModalButton';
import ConsoleContext from '../../context/ConsoleContext';
import getCurrentDate from '../../utils/getCurrentDate';

interface Props{
    timeElapsed: number
}

function Modal(props: Props) {
  const {
    timeElapsed,
  } = props;

  const [playerAlias, setPlayerAlias] = useState('');

  const selectedConsole = useContext(ConsoleContext);

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
    const { score, alias } = getScoreInfo(name);
    const date = getCurrentDate();
    setPlayerAlias('');

    try {
      await addDoc(collection(getFirestore(), `highscores-${consoleToSubmit}`), { alias, score, date });
    } catch (err) {
      console.error('Error submiting your item to the database', err);
    }
  };

  const getScoreInfo = (name: string) => {
    const alias = name || 'Anonymous';
    const score = formatTimer(timeElapsed.toString());
    return { score, alias };
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

          <ModalForm
            playerAlias={playerAlias}
            handleInputChange={handleInputChange}
            submitScoreToDatabase={submitScoreToDatabase}
          />
          <article className="form-buttons">
            <ModalButton
              content="Leaderboards"
              link="/leaderboards"
              className="leaderboard-button"
            />

            <ModalButton
              content="Home"
              link="/"
            />
          </article>

        </article>
      </article>
    </section>
  );
}

export default Modal;
