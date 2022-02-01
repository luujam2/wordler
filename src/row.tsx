import React from "react";
import { BoardResult } from "./board";
import { motion, Variants } from "framer-motion";

type RowProps = {
  word?: string;
  result?: BoardResult[];
  isError?: boolean;
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

export const Row = ({ word, result, isError }: RowProps) => {
  const cells = [];
  if (!word) {
    for (let i = 0; i < 5; i++) {
      cells.push(<Cell />);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      cells.push(<Cell letter={word[i]} result={result?.[i]} />);
    }
  }

  return (
    <motion.div
      className="row"
      animate={isError ? { x: [-10, 10, -10, 10, -10, 10, 0] } : { x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cells}
    </motion.div>
  );
};

const Cell = ({ letter, result }: CellProps) => {
  if (!letter) {
    return <div className="cell"></div>;
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
    <motion.div
      variants={variants}
      initial="no"
      animate={variantToUse}
      className="cell"
    >
      {letter.toUpperCase()}
    </motion.div>
  );
};
