import React from 'react';

interface Props{
  alias: string
  score: string
}

function Score(props: Props) {
  const { alias, score } = props;
  return (
    <>
      <th>
        <td colSpan={2} className="alias">{alias}</td>
      </th>
      <th>
        <td colSpan={2} className="score">{score}</td>
      </th>
    </>
  );
}

export default Score;
