import React from "react";
import styled from "styled-components";
import "../styles/Text.css";

// 중앙에 배치될 텍스트를 스타일링합니다.
const CenteredText = styled.div`
  font-family: "Galmuri11", sans-serif;
  font-size: large;
  color: white;
`;

const ImageWithCenterText = ({ text, width = "75%" }) => {
  return (
    <div className="hint-style">
      <CenteredText style={{ width: width }}>{text}</CenteredText>
    </div>
  );
};

export default ImageWithCenterText;
