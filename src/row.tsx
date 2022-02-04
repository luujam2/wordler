import React from "react";
import { Board, BoardResult } from "./board";
import { motion, Variants } from "framer-motion";
import styled from "@emotion/styled";

type RowProps = {
  word?: string;
  result?: BoardResult[];
  isError?: boolean;
  wordLength: number;
  ref?: React.RefObject<HTMLDivElement> | undefined;
  isWin?: boolean;
};

type CellProps = {
  letter?: string;
  result?: BoardResult;
};

const variants: Variants = {
  no: { backgroundColor: "grey", rotate: 0 },
  partial: { backgroundColor: "orange", rotate: 360 },
  exact: { backgroundColor: "green", rotate: 360 },
  unmatch: { backgroundColor: "white", scale: 1 },
  win: {
    scale: [1, 2, 1],
  },
};

const StyledRow = styled(motion.div)<{ wordLength: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.wordLength}, 1fr)`};
  grid-template-rows: 80px;
  column-gap: 10px;
  align-items: center;
  justify-items: center;

  @media (max-width: 500px) {
    grid-template-rows: 50px;
  }
`;

export const Row = ({ word, result, isError, wordLength, isWin }: RowProps) => {
  const variantsa = {
    win: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0,
      },
    },
    error: { x: [-10, 10, -10, 10, -10, 10, 0] },
    initial: { x: 0, scale: 1 },
  };

  const cells = [];
  if (!word) {
    for (let i = 0; i < wordLength; i++) {
      cells.push(<Cell key={`cell-${i}`} />);
    }
  } else {
    for (let i = 0; i < wordLength; i++) {
      cells.push(
        <Cell key={`cell-${i}`} letter={word[i]} result={result?.[i]} />
      );
    }
  }

  return (
    <StyledRow
      wordLength={wordLength}
      variants={variantsa}
      animate={isError ? "error" : isWin ? "win" : "initial"}
    >
      {cells}
    </StyledRow>
  );
};

const StyledCell = styled(motion.div)<{ match: BoardResult | undefined }>`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 2rem;
  border: 2px solid lightgrey;

  background-color: ${(props) => {
    switch (props.match) {
      case BoardResult.MATCH:
        return "green";
      case BoardResult.PARTIAL_MATCH:
        return "orange";
      case BoardResult.NO_MATCH:
        return "grey";
      default:
        return "white";
    }
  }};
`;

const Cell = ({ letter, result }: CellProps) => {
  if (!letter) {
    return <StyledCell match={undefined} variants={variants}></StyledCell>;
  }

  let variantToUse;
  switch (result) {
    case BoardResult.MATCH:
      variantToUse = "exact";
      break;
    case BoardResult.PARTIAL_MATCH:
      variantToUse = "partial";
      break;
    case BoardResult.NO_MATCH:
      variantToUse = "no";
      break;
    default:
      variantToUse = "unmatch";
  }

  return (
    <StyledCell variants={variants} animate={variantToUse} match={result}>
      {letter.toUpperCase()}
    </StyledCell>
  );
};
