import styled from "@emotion/styled";
import React from "react";
import ReactDOM from "react-dom";

export const Contents = styled.div`
  position: fixed;
  display: grid;
  place-items: center;
  height: 80%;
  margin: 10% 20%;
  top: 0;
  right: 0;
  left: 0;
  background: rgba(137, 169, 179, 0.95);
  z-index: 99;
  border: 2px solid grey;

  @media (max-width: 500px) {
    height: 94%;
    margin: 5% 5%;
  }
`;

export default ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("modal-root") as HTMLDivElement
  );
};
