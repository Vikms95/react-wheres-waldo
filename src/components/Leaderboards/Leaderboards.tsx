import React, {
  useState, useEffect, useContext, SetStateAction,
} from 'react';

import {
  query, onSnapshot, collection, getFirestore, orderBy, limit,
} from 'firebase/firestore';

import uniqid from 'uniqid';
import Score from './Score';
import ConsoleContext from '../../context/ConsoleContext';
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
      <table className="leaderboard-container" cellPadding={-5}>

        <thead className="table-title">
          Last scores
        </thead>

        <thead className="table-headers">
          <tr>Player</tr>
          <tr>Score</tr>
        </thead>

        <thead className="leaderboards-table">
          {renderTodaysScores()}
        </thead>

      </table>

      <table className="leaderboard-container">

        <thead className="table-title">
          All-time scores
        </thead>

        <thead className="table-headers">
          <tr>Player</tr>
          <tr>Score</tr>
        </thead>

        <thead className="leaderboards-table">
          {scores.map((score: any) => (
            <Score
              key={uniqid()}
              alias={score.alias}
              score={score.score}
            />
          ))}
        </thead>

      </table>

    </main>
  );
}
