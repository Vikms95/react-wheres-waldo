import React from 'react';
import formatTimer from '../../utils/formatTimer';

interface Props{
  timeElapsed: number
}

function GameTimer(props: Props) {
  const { timeElapsed } = props;
  return (
    <section className="timer-container">
      {formatTimer(timeElapsed.toString())}
    </section>
  );
}

export default GameTimer;
