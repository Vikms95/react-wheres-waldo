import React, {
  FormEvent, SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import ModalForm from './ModalForm';
import formatTimer from '../../utils/formatTimer';
import ModalButton from './ModalButton';

interface Props{
    timeElapsed: number
    selectedConsole: string | null
}

function Modal(props: Props) {
  const {
    timeElapsed,
    selectedConsole,
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

          <ModalForm
            playerAlias={playerAlias}
            selectedConsole={selectedConsole}
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
