import React from 'react';

interface Props{
  alias: string
  score: string
}

function Score(props: Props) {
  const { alias, score } = props;
  return (
    <>
      <div className="alias">{alias}</div>
      <div className="score">{score}</div>
    </>
  );
}

export default Score;
