import React, {
  useState, useEffect, useContext, SetStateAction,
} from 'react';

import {
  query, onSnapshot, collection, getFirestore, orderBy, limit,
} from 'firebase/firestore';

import uniqid from 'uniqid';
import ConsoleContext from '../../context/ConsoleContext';
import Score from './Score';
import getCurrentDate from '../../utils/getCurrentDate';

export default function Leaderboards() {
  const [scores, setScores] = useState<object[]>([]);

  const selectedConsole = useContext(ConsoleContext);

  useEffect(() => {
    fetchScoresFromDatabase(selectedConsole);
    renderTodaysScores();
  }, []);

  const fetchScoresFromDatabase = (consoleName: string | null) => {
    const databaseQuery = query(
      collection(getFirestore(), `highscores-${consoleName}`),
      orderBy('score', 'asc'),
      limit(50),
    );

    onSnapshot(databaseQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setScores((prevScores: SetStateAction<object[]>) => [
          ...prevScores as [], { ...doc.data() },
        ]);
      });
    });
  };

  const renderTodaysScores = () => {
    const today = getCurrentDate();
    return scores.filter((score: any) => (score.date === today))
      .map((score: any) => (
        <Score
          key={uniqid()}
          alias={score.alias}
          score={score.score}
        />
      ));
  };

  return (
    <main className="leaderboards-container">
      <section className="leaderboard-container">

        <h1>
          Last scores
          <hr />
        </h1>

        <div className="table-headers">
          <h2>Player</h2>
          <h2>Score</h2>
        </div>

        <section className="leaderboards-table">
          {renderTodaysScores()}
        </section>
      </section>

      <section className="leaderboard-container">

        <h1>
          All-time scores
          <hr />

        </h1>
        <div className="table-headers">
          <h2>Player</h2>
          <h2>Score</h2>
        </div>

        <section className="leaderboards-table">
          {scores.map((score: any) => (
            <Score
              key={uniqid()}
              alias={score.alias}
              score={score.score}
            />
          ))}
        </section>
      </section>

    </main>
  );
}
