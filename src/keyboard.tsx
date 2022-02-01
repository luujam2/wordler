import React, { Dispatch, SetStateAction } from "react";
import { LetterMapping } from "./board";

type KeyboardProps = {
  clickHandler: (letter: string) => void;
  letterMapping: LetterMapping;
};

export const Keyboard = ({ clickHandler, letterMapping }: KeyboardProps) => {
  console.log(letterMapping);
  return (
    <div className="keyboard">
      <button
        className={`key-q guess-${letterMapping["q"] ?? "none"}`}
        onClick={() => clickHandler("q")}
      >
        Q
      </button>
      <button
        className={`key-w guess-${letterMapping["w"] ?? "none"}`}
        onClick={() => clickHandler("w")}
      >
        W
      </button>
      <button
        className={`key-e guess-${letterMapping["e"] ?? "none"}`}
        onClick={() => clickHandler("e")}
      >
        E
      </button>
      <button
        className={`key-r guess-${letterMapping["r"] ?? "none"}`}
        onClick={() => clickHandler("r")}
      >
        R
      </button>
      <button
        className={`key-t guess-${letterMapping["t"] ?? "none"}`}
        onClick={() => clickHandler("t")}
      >
        T
      </button>
      <button
        className={`key-y guess-${letterMapping["y"] ?? "none"}`}
        onClick={() => clickHandler("y")}
      >
        Y
      </button>
      <button
        className={`key-u guess-${letterMapping["u"] ?? "none"}`}
        onClick={() => clickHandler("u")}
      >
        U
      </button>
      <button
        className={`key-i guess-${letterMapping["i"] ?? "none"}`}
        onClick={() => clickHandler("i")}
      >
        I
      </button>
      <button
        className={`key-o guess-${letterMapping["o"] ?? "none"}`}
        onClick={() => clickHandler("o")}
      >
        O
      </button>
      <button
        className={`key-p guess-${letterMapping["p"] ?? "none"}`}
        onClick={() => clickHandler("p")}
      >
        P
      </button>

      <button
        className={`key-a guess-${letterMapping["a"] ?? "none"}`}
        onClick={() => clickHandler("a")}
      >
        A
      </button>
      <button
        className={`key-s guess-${letterMapping["s"] ?? "none"}`}
        onClick={() => clickHandler("s")}
      >
        S
      </button>
      <button
        className={`key-d guess-${letterMapping["d"] ?? "none"}`}
        onClick={() => clickHandler("d")}
      >
        D
      </button>
      <button
        className={`key-f guess-${letterMapping["f"] ?? "none"}`}
        onClick={() => clickHandler("f")}
      >
        F
      </button>
      <button
        className={`key-g guess-${letterMapping["g"] ?? "none"}`}
        onClick={() => clickHandler("g")}
      >
        G
      </button>
      <button
        className={`key-h guess-${letterMapping["h"] ?? "none"}`}
        onClick={() => clickHandler("h")}
      >
        H
      </button>
      <button
        className={`key-j guess-${letterMapping["j"] ?? "none"}`}
        onClick={() => clickHandler("j")}
      >
        J
      </button>
      <button
        className={`key-k guess-${letterMapping["k"] ?? "none"}`}
        onClick={() => clickHandler("k")}
      >
        K
      </button>
      <button
        className={`key-l guess-${letterMapping["l"] ?? "none"}`}
        onClick={() => clickHandler("l")}
      >
        L
      </button>

      <button
        className={`key-z guess-${letterMapping["z"] ?? "none"}`}
        onClick={() => clickHandler("z")}
      >
        Z
      </button>
      <button
        className={`key-x guess-${letterMapping["x"] ?? "none"}`}
        onClick={() => clickHandler("x")}
      >
        X
      </button>
      <button
        className={`key-c guess-${letterMapping["c"] ?? "none"}`}
        onClick={() => clickHandler("c")}
      >
        C
      </button>
      <button
        className={`key-v guess-${letterMapping["v"] ?? "none"}`}
        onClick={() => clickHandler("v")}
      >
        V
      </button>
      <button
        className={`key-b guess-${letterMapping["b"] ?? "none"}`}
        onClick={() => clickHandler("b")}
      >
        B
      </button>
      <button
        className={`key-n guess-${letterMapping["n"] ?? "none"}`}
        onClick={() => clickHandler("n")}
      >
        N
      </button>
      <button
        className={`key-m guess-${letterMapping["m"] ?? "none"}`}
        onClick={() => clickHandler("m")}
      >
        M
      </button>
      <button className="key-backspace" onClick={() => clickHandler("bs")}>
        Backspace
      </button>
      <button className="key-enter" onClick={() => clickHandler("enter")}>
        Enter
      </button>
    </div>
  );
};
