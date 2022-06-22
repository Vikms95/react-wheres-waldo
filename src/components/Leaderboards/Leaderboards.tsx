import React, { useState, useEffect, SetStateAction } from 'react';
import {
  query, onSnapshot, collection, getFirestore, orderBy, limit,
} from 'firebase/firestore';

export default function Leaderboards() {
  const [scores, setScores] = useState<object[]>([]);

  useEffect(() => {
    fetchScoresFromDatabase();
  }, []);

  const fetchScoresFromDatabase = () => {
    const databaseQuery = query(
      collection(getFirestore(), 'highscores'),
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

  return (
    <main className="leaderboards-container">

      <h1 className="leaderboards-title">
        Leaderboards
      </h1>

      <section className="leaderboards-table">

        <article className="table-header">
          <h2>Players</h2>
          <article className="player-names-container">
            <ul className="table-list">
              {scores?.map((score: any) => <div>{score.alias}</div>)}
            </ul>
          </article>
        </article>

        <article className="table-header">
          <h2>Scores</h2>
          <article className="player-scores-container">
            <ul className="table-list">
              {scores?.map((score: any) => <div>{score.score}</div>)}
            </ul>
          </article>
        </article>

      </section>
    </main>
  );
}
