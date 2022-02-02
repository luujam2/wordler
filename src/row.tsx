import React from "react";
import { Board, BoardResult } from "./board";
import { motion, Variants } from "framer-motion";
import styled from "@emotion/styled";

type RowProps = {
  word?: string;
  result?: BoardResult[];
  isError?: boolean;
  wordLength: number;
};

type CellProps = {
  letter?: string;
  result?: BoardResult;
};

const variants: Variants = {
  no: { backgroundColor: "grey", rotate: 0 },
  partial: { backgroundColor: "orange", rotate: 360 },
  exact: { backgroundColor: "green", rotate: 360 },
};

const StyledRow = styled(motion.div)<{ wordLength: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.wordLength}, 1fr)`};
  grid-template-rows: 1fr;
  column-gap: 10px;
  align-items: center;
  justify-items: center;
`;

export const Row = ({ word, result, isError, wordLength }: RowProps) => {
  const cells = [];
  if (!word) {
    for (let i = 0; i < wordLength; i++) {
      cells.push(<Cell />);
    }
  } else {
    for (let i = 0; i < wordLength; i++) {
      cells.push(<Cell letter={word[i]} result={result?.[i]} />);
    }
  }

  return (
    <StyledRow
      wordLength={wordLength}
      animate={isError ? { x: [-10, 10, -10, 10, -10, 10, 0] } : { x: 0 }}
      transition={{ duration: 0.5 }}
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
    return <StyledCell match={undefined}></StyledCell>;
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
    default:
      variantToUse = "no";
  }

  return (
    <StyledCell
      variants={variants}
      initial="no"
      animate={variantToUse}
      match={result}
    >
      {letter.toUpperCase()}
    </StyledCell>
  );
};
