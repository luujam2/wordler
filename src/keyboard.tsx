import React, { Dispatch, SetStateAction } from "react";
import { BoardResult, LetterMapping } from "./board";
import styled from "@emotion/styled";

type KeyboardProps = {
  clickHandler: (letter: string) => void;
  letterMapping: LetterMapping;
};

type ButtonProps = {
  letter: string;
  match: BoardResult;
};

const Button = styled.button<ButtonProps>`
  grid-area: ${(props) => props.letter};
  background-color: ${(props) => {
    switch (props.match) {
      case BoardResult.MATCH:
        return "green";
      case BoardResult.PARTIAL_MATCH:
        return "orange";
      case BoardResult.NO_MATCH:
        return "darkgrey";
      default:
        return "";
    }
  }};
  overflow: hidden;
  min-width: 0;
`;

const StyledKeyboard = styled.div`
  display: grid;
  position: absolute;
  bottom: 0;
  height: 100px;
  margin: 50px auto;
  left: 0;
  right: 0;
  width: 90%;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 5px;
  row-gap: 5px;
  grid-template-areas:
    "q w e r t y u i o p bs bs"
    ". a s d f g h j k l enter ."
    ". . z x c v b n m . enter .";
  min-height: 0; /* NEW */
  min-width: 0; /* NEW; needed for Firefox */

  @media (min-width: 700px) {
    width: 40%;
    height: 200px;
  }
`;

const Key = ({
  letter,
  letterMapping,
  clickHandler,
}: KeyboardProps & { letter: string }) => {
  return (
    <Button
      letter={letter}
      match={letterMapping[letter]}
      onClick={() => clickHandler(letter)}
    >
      {letter.length === 1 ? letter.toUpperCase() : letter}
    </Button>
  );
};

export const Keyboard = ({ clickHandler, letterMapping }: KeyboardProps) => {
  return (
    <StyledKeyboard>
      <Key
        letter="q"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="w"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="e"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="r"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="t"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="y"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="u"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="i"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="o"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="p"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />

      <Key
        letter="a"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="s"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="d"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="f"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="g"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="h"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="j"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="k"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="l"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />

      <Key
        letter="z"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="x"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="c"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="v"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="b"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="n"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="m"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="bs"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
      <Key
        letter="enter"
        letterMapping={letterMapping}
        clickHandler={clickHandler}
      />
    </StyledKeyboard>
  );
};
