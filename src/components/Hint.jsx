import React, { useState } from "react";
import SquareButton from "../components/SizedButton";
import GrayHintBox from "../components/GrayHintBox";
import "../styles/Text.css";

function HiddenHintComponent({ hint, width = "300px", margin = "137px" }) {
  const [isHintVisible, setIsHintVisible] = useState(false);

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };

  return (
    <>
      <SquareButton
        text={isHintVisible ? "숨기기" : "힌트 보기"}
        onClick={toggleHint}
        width="100px"
        margin={margin}
      />
      {isHintVisible && <GrayHintBox text={hint} />}
    </>
  );
}

export default HiddenHintComponent;
