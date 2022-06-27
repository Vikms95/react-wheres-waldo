import React from 'react';

interface Props{
  alias: string
  score: string
}

function Score(props: Props) {
  const { alias, score } = props;
  return (
    <>
      <tr>
        <td colSpan={2} className="alias">{alias}</td>
      </tr>
      <tr>
        <td colSpan={2} className="score">{score}</td>
      </tr>
    </>
  );
}

export default Score;
