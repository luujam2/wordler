import React from "react";
import reactDom from "react-dom";
import { BoardInit } from "./board";
import { Settings } from "./settings";

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop as string),
});

const Main = () => {
  const guesses = Number((params as any).guesses);
  const wordLength = Number((params as any).wordLength);

  if (guesses > 1 && guesses < 50 && wordLength > 4 && wordLength < 9) {
    return <BoardInit noOfGuesses={guesses} wordLength={wordLength} />;
  }

  return <Settings />;
};

reactDom.render(<Main />, document.getElementById("output"));
