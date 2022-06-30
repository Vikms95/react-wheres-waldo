import React, {
  SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalForm from './ModalForm';
import ModalButton from './ModalButton';
import formatTimer from '../../utils/formatTimer';

interface Props{
    timeElapsed: number
}

function Modal(props: Props) {
  const { timeElapsed } = props;

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

  return (
    <section className="background-brightness-wrapper">
      <article className="game-win-modal" ref={modalRef}>

        <article className="score-display">
          <FontAwesomeIcon icon={faStopwatch} />
          {' '}
          Your score is
          {' '}
          <span className="timer-value" data-testid="timer-value">
            {formatTimer(timeElapsed.toString())}
          </span>
        </article>

        <ModalForm
          timeElapsed={timeElapsed}
          playerAlias={playerAlias}
          setPlayerAlias={setPlayerAlias}
          handleInputChange={handleInputChange}
        />

        <article className="form-bottom">
          <ModalButton
            type="button"
            link="/leaderboards"
            content="Leaderboards"
            className="leaderboard-button form-button"
          />

          <ModalButton
            type="button"
            link="/"
            content="Home"
            className="form-button"
          />
        </article>

      </article>
    </section>
  );
}

export default Modal;
