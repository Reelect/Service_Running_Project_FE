import React, { useState, useRef, useEffect } from "react";
import SquareButton from "../components/SizedButton";
import GrayHintBox from "../components/GrayHintBox";
import "../styles/Text.css";
import "../styles/Hint.css";

function HiddenHintComponent({ hint, width = "300px", margin = "137px" }) {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const hintDiv = useRef();
  const [givenMargin, setGivenMargin] = useState("0px");

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };

  useEffect(() => {
    if (!!hintDiv.current) {
      let temp = window.getComputedStyle(hintDiv.current);
      let marginBot = temp.getPropertyValue("height");
      setGivenMargin(marginBot);
    }
  }, []);

  return (
    <>
      <SquareButton
        text={isHintVisible ? "숨기기" : "힌트 보기"}
        onClick={toggleHint}
        width="100px"
        margin={givenMargin}
      />
      <div ref={hintDiv} className={isHintVisible ? "visible" : "hidden"}>
        <GrayHintBox text={hint} />
      </div>
    </>
  );
}

export default HiddenHintComponent;
