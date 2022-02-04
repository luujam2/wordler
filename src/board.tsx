import styled from "@emotion/styled";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { Keyboard } from "./keyboard";
import { Row } from "./row";
import Modal, { Contents } from "./modal";
import { Results } from "./results";

export enum BoardResult {
  MATCH,
  PARTIAL_MATCH,
  NO_MATCH,
}

export type LetterMapping = {
  [key: string]: BoardResult;
};

const compare = (
  word: string,
  wordToGuess: string,
  letterMapping: LetterMapping,
  setLetterMapping: React.Dispatch<React.SetStateAction<LetterMapping>>
) => {
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

  for (let i = 0; i < word.length; i++) {
    let currentMapping = letterMapping[word[i]];

    if (matchingIndices.includes(i)) {
      letterMapping[word[i]] = BoardResult.MATCH;
    } else if (
      partialMatchingIndices.includes(i) &&
      currentMapping !== BoardResult.MATCH
    ) {
      letterMapping[word[i]] = BoardResult.PARTIAL_MATCH;
    } else if (
      currentMapping !== BoardResult.MATCH &&
      currentMapping !== BoardResult.PARTIAL_MATCH
    ) {
      letterMapping[word[i]] = BoardResult.NO_MATCH;
    }

    if (matchingIndices.includes(i)) {
      result.push(BoardResult.MATCH);
    } else if (partialMatchingIndices.includes(i)) {
      result.push(BoardResult.PARTIAL_MATCH);
    } else {
      result.push(BoardResult.NO_MATCH);
    }
  }

  setLetterMapping(letterMapping);

  return result;
};

const StyledBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 10px;
  height: 320px;

  @media (min-width: 700px) {
    height: 500px;
  }
`;

const StyledMain = styled.div`
  width: 320px;
  margin: 0 auto;
  text-align: center;

  @media (min-width: 700px) {
    font-size: 50px;
    width: 500px;
  }
`;

type BoardInitProps = {
  noOfGuesses: number;
  wordLength: number;
};

type BoardProps = {
  noOfGuesses: number;
  words: string[];
  guessableWords: string[];
  reset: () => void;
};

export const BoardInit = ({ noOfGuesses, wordLength }: BoardInitProps) => {
  const [words, setWords] = useState<string[] | null | undefined>(undefined);
  const [game, setGame] = useState(0);
  const [guessableWords, setGuessableWords] = useState<
    string[] | null | undefined
  >(undefined);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const { words, guessableWords } = await import(
          `../words/${wordLength}-letter-words`
        );

        setWords(words);
        setGuessableWords(guessableWords);
      } catch (e) {
        setWords(null);
        setGuessableWords(null);
      }
    };

    loadWords();
  });

  if (!words || !guessableWords) {
    return <div>loading</div>;
  }

  return (
    <Board
      key={game}
      noOfGuesses={noOfGuesses}
      words={words}
      guessableWords={guessableWords}
      reset={() => setGame(game + 1)}
    />
  );
};

export const Board = ({
  noOfGuesses,
  words,
  guessableWords,
  reset,
}: BoardProps) => {
  const [word, setWord] = useState("");
  const [wordToGuess, setWordToGuess] = useState("");
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasUserWon, setHasUserWon] = useState(false);

  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessResults, setGuessResults] = useState<BoardResult[][]>([]);
  const [letterMapping, setLetterMapping] = useState<LetterMapping>({});
  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);

  const wordLength = wordToGuess.length;
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const activeRow = useRef<HTMLDivElement>(null);

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      (activeRow as any).current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      ref(node);
    },
    [ref]
  );

  const scrollToView = () => {
    if (!inView) {
      activeRow.current?.scrollIntoView();
    }
  };

  useEffect(() => {
    const wordToGuess = words[Math.floor(Math.random() * words.length)];
    console.log(wordToGuess);

    setWordToGuess(wordToGuess);
  }, []);

  const handleLetter = (letter: string) => {
    if (letter === "Enter" && word.length === wordLength) {
      //scroll to view
      scrollToView();
      // check word exists in dictionary
      //compare to word to guess
      if (!guessableWords.includes(word)) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
        return;
      }

      const result = compare(
        word,
        wordToGuess,
        letterMapping,
        setLetterMapping
      );
      setGuesses([...guesses, word]);
      setGuessResults([...guessResults, result]);
      setWord("");

      // check if no. of guesses have been exceeded
      // check if user has guessed word
      if (
        result.filter((boardResult) => boardResult !== BoardResult.MATCH)
          .length === 0
      ) {
        setHasUserWon(true);
        return setShowModal(true);
      }

      if (currentGuessNumber === noOfGuesses - 1) {
        return setShowModal(true);
      }
      setCurrentGuessNumber(currentGuessNumber + 1);
    }

    if (letter === "Backspace") {
      setWord(word.slice(0, -1));
      //scroll to view
      scrollToView();
    }

    if (word.length === wordLength) {
      return;
    }

    if (letter.length === 1) {
      setWord(word + letter.toLowerCase());
      //scroll to view
      scrollToView();
    }
  };

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      if (showModal) {
        return;
      }
      handleLetter(e.key);
    };

    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  });

  const boardStructure = [];

  for (let i = 0; i < noOfGuesses; i++) {
    if (guesses[i]) {
      boardStructure.push(
        <Row
          word={guesses[i]}
          result={guessResults[i]}
          wordLength={wordLength}
        />
      );
    } else if (i === currentGuessNumber) {
      boardStructure.push(
        <Row
          ref={setRefs}
          word={word}
          isError={isError}
          wordLength={wordLength}
        />
      );
    } else {
      boardStructure.push(<Row wordLength={wordLength} />);
    }
  }

  return (
    <>
      <StyledMain>
        <h1>Wordler</h1>
        <StyledBoard>{boardStructure}</StyledBoard>
      </StyledMain>
      <Keyboard
        letterMapping={letterMapping}
        clickHandler={(letter) => handleLetter(letter)}
      />
      {showModal && (
        <Modal>
          <Contents>
            <Results
              hasUserWon={hasUserWon}
              noOfGuesses={noOfGuesses}
              wordToGuess={wordToGuess}
              playAgain={() => {
                reset();
              }}
            />
          </Contents>
        </Modal>
      )}
    </>
  );
};
