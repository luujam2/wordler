import React, { useState } from "react";

export const Settings = () => {
  const [wordLength, setWordLength] = useState(5);
  const [guesses, setGuesses] = useState(6);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `${window.location.origin}?guesses=${guesses}&wordLength=${wordLength}`;
      }}
    >
      <div>
        <label htmlFor="word-length">Number of letters</label>
        <select
          name="word-length"
          onChange={(e) => setWordLength(Number(e.target.value))}
          value={wordLength}
        >
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
        </select>
      </div>
      <div>
        <label htmlFor="guesses">Number of guesses</label>
        <input
          type="number"
          onChange={(e) => setGuesses(Number(e.target.value))}
          value={guesses}
          min={1}
          max={50}
        />
      </div>
      <input type="submit" value="Play" />
    </form>
  );
};
