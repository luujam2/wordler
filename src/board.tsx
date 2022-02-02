import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Keyboard } from "./keyboard";
import { Row } from "./row";
import { words } from "./words"; //TODO dynamic import word list based on number of letters chosen

const WORD_LENGTH = 5;
const NUMBER_OF_GUESSES = 6;
let currentGuessNumber = 0;

const wordToGuess = words[Math.floor(Math.random() * words.length)];
console.log(wordToGuess);
export enum BoardResult {
  MATCH,
  PARTIAL_MATCH,
  NO_MATCH,
}

export type LetterMapping = {
  [key: string]: BoardResult;
};

const guesses: string[] = [];
const guessResults: BoardResult[][] = [];
const letterMapping: LetterMapping = {};

const compare = (word: string) => {
  const result = [];
  const matchingIndices = [];
  const partialMatchingIndices = [];
  const remainingLetters = [];

  // get full matches first
  for (let i = 0; i < word.length; i++) {
    if (wordToGuess[i] === word[i]) {
      matchingIndices.push(i);
    } else {
      // get set of letters which weren't guessed
      remainingLetters.push(wordToGuess[i]);
    }
  }

  //check if there are partial matches - removing letters from initial set
  for (let i = 0; i < word.length; i++) {
    if (!matchingIndices.includes(i) && remainingLetters.includes(word[i])) {
      partialMatchingIndices.push(i);
      const indexOfLetterToRemove = remainingLetters.indexOf(word[i]);
      remainingLetters.splice(indexOfLetterToRemove, 1);
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (matchingIndices.includes(i)) {
      result.push(BoardResult.MATCH);
      letterMapping[word[i]] = BoardResult.MATCH;
    } else if (partialMatchingIndices.includes(i)) {
      result.push(BoardResult.PARTIAL_MATCH);
      letterMapping[word[i]] = BoardResult.PARTIAL_MATCH;
    } else {
      result.push(BoardResult.NO_MATCH);
      letterMapping[word[i]] = BoardResult.NO_MATCH;
    }
  }

  return result;
};

const StyledBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 100px);
  row-gap: 10px;
`;

const StyledMain = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`;

export const Board = () => {
  const [word, setWord] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      setIsError(false);

      if (Number(e.keyCode) === 13 && word.length === WORD_LENGTH) {
        // check word exists in dictionary
        //compare to word to guess
        if (!words.includes(word)) {
          console.log("INVALID GUESS");
          setIsError(true);
          return;
        }

        const result = compare(word);
        guesses.push(word);
        guessResults.push(result);
        setWord("");
        currentGuessNumber++;
      }

      if (Number(e.keyCode) === 8) {
        setWord(word.slice(0, -1));
      }

      if (word.length === WORD_LENGTH) {
        return;
      }

      if (Number(e.keyCode) >= 65 && Number(e.keyCode) < 91) {
        setWord(word + e.key);
      }
    };

    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  });

  const boardStructure = [];

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    if (guesses[i]) {
      boardStructure.push(<Row word={guesses[i]} result={guessResults[i]} />);
    } else if (i === currentGuessNumber) {
      boardStructure.push(<Row word={word} isError={isError} />);
    } else {
      boardStructure.push(<Row />);
    }
  }

  return (
    <StyledMain>
      <h1>Wordler</h1>
      <StyledBoard>{boardStructure}</StyledBoard>
      <Keyboard
        letterMapping={letterMapping}
        clickHandler={(letter) => {
          if (letter === "backspace") {
            return setWord(word.slice(0, -1));
          }

          if (letter === "enter" && word.length === WORD_LENGTH) {
            setIsError(false);
            if (!words.includes(word)) {
              console.log("INVALID GUESS");
              setIsError(true);
              return;
            }
            const result = compare(word);
            guesses.push(word);
            guessResults.push(result);

            setWord("");
            currentGuessNumber++;
            return;
          }

          if (letter === "enter") {
            return;
          }

          setWord(word + letter);
        }}
      />
    </StyledMain>
  );
};
