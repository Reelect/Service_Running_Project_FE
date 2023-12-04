import React, { forwardRef } from "react";
import styled from "styled-components";
import "../styles/Text.css";

// 중앙에 배치될 텍스트를 스타일링합니다.
const CenteredText = styled.div`
  font-family: "Galmuri11", sans-serif;
  font-size: large;
  color: white;
  /* word-break: keep-all; */
`;

const GrayHintBox = forwardRef(({ text, width = "70%" }, childRef) => {
  const textWithBreaks = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="hint-style" ref={childRef}>
      <CenteredText style={{ width: width }}>{textWithBreaks}</CenteredText>
    </div>
  );
});

export default GrayHintBox;
