import React, { useState, useEffect } from 'react';
import {
  query, onSnapshot, collection, getFirestore,
} from 'firebase/firestore';

export default function Leaderboards() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    retrieveScoresFromDatabase();
  }, []);

  const retrieveScoresFromDatabase = () => {
    const databaseQuery = query(collection(getFirestore(), 'highscores'));

    onSnapshot(databaseQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setScores((prevScores) => {
          console.log(prevScores);
          return [...prevScores, { ...doc.data() }];
        });
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
