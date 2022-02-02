import styled from "@emotion/styled";
import React, { useState } from "react";

const StyledForm = styled.form`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
`;

const StyledPlay = styled.input`
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const Settings = () => {
  const [wordLength, setWordLength] = useState(5);
  const [guesses, setGuesses] = useState(6);

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `${window.location.origin}?guesses=${guesses}&wordLength=${wordLength}`;
      }}
    >
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

      <label htmlFor="guesses">Number of guesses</label>
      <input
        type="number"
        onChange={(e) => setGuesses(Number(e.target.value))}
        value={guesses}
        min={1}
        max={50}
      />
      <StyledPlay type="submit" value="Play" />
    </StyledForm>
  );
};
