import React from "react";

type ResultsProps = {
  hasUserWon: boolean;
  noOfGuesses: number;
  wordToGuess: string;
  playAgain: () => void;
};

export const Results = ({
  hasUserWon,
  noOfGuesses,
  wordToGuess,
  playAgain,
}: ResultsProps) => {
  const stats = JSON.parse(localStorage.getItem("statistics") ?? "{}");

  stats.wins = (stats.wins ??= 0) + (hasUserWon ? 1 : 0);
  stats.gamesPlayed = (stats.gamesPlayed ??= 0) + 1;
  stats.currentStreak = hasUserWon ? (stats.currentStreak ??= 0) + 1 : 0;

  localStorage.setItem("statistics", JSON.stringify(stats));

  const winPercentage = (stats.wins / stats.gamesPlayed) * 100;

  return (
    <div>
      <p>
        {hasUserWon
          ? `Congratulations! you guessed the word in ${noOfGuesses} tries.`
          : `word was ${wordToGuess}`}
      </p>
      <p>
        <div>Games played: {stats.gamesPlayed}</div>
        <div>Wins: {stats.wins}</div>
        <div>Current win streak: {stats.currentStreak}</div>
        <div>Win %: {winPercentage}</div>
      </p>
      <button onClick={playAgain}>Play again</button>
      <button>Change settings</button>
    </div>
  );
};
