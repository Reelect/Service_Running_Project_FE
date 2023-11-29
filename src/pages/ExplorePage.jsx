import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../components/SquareButton";
import HiddenHintComponent from "../components/Hint";
import { ReactComponent as TList } from "../assets/explore/treasure_list.svg";
import Text from "../components/Text";
import { ReactComponent as TitleSvg } from "../assets/start/title.svg";
import { ReactComponent as GistSvg } from "../assets/start/GIST.svg";
import Chest from "../assets/explore/chest.png";
import Bg from "../assets/start/bg.png";
import F1 from "../assets/explore/1F.png";
import F2 from "../assets/explore/2F.png";
import questionBox from "../assets/explore/questionbox.png";

const StartDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: auto;
  background-image: url(${Bg}); /* 이미지 경로를 적절히 설정하세요 */
  background-size: cover;
  background-position: center; /* 배경 이미지가 div의 중앙에 위치하도록 설정 */
  background-repeat: no-repeat; /* 배경 이미지가 반복되지 않도록 설정 */
`;

const ExplorePage = () => {
  const [number, setNumber] = useState(0);

  const clickHandler = (step) => {
    setNumber((prevNumber) => number + step);
  };

  const currentExplore = (Q) => {
    console.log(Q);
    if (Q === 0) {
      return (
        <>
          <TList width="80%" style={{ marginBottom: "", marginTop: "0" }} />
          <img src={Chest} alt="" width="50%" />
          <Button
            text="1 층"
            fontSize={33}
            onClick={() => {
              clickHandler(1);
            }}
          />
          <br />
          <Button
            text="2 층"
            fontSize={33}
            onClick={() => {
              clickHandler(2);
            }}
          />
          <br />
          <Button
            text="전시관"
            fontSize={33}
            onClick={() => {
              clickHandler(3);
            }}
          />
        </>
      );
    } else if (Q === 1) {
      return (
        <>
          <Text input="보물 탐색" bdr="2.5px black" fs="50px" />
          <Text input="1층" bdr="2.5px black" fs="40px" />
          <img src={F1} alt="" width="80%" style={{ margin: "10px" }} />
          <HiddenHintComponent
            hint={"대덕전자 故김정식 회장님의 기부로 지어진 공간"}
          />
          <br />
          <Button
            text="돌아가기"
            fontSize={33}
            onClick={() => {
              clickHandler(-1);
            }}
          />
        </>
      );
    } else if (Q === 2) {
      return (
        <>
          <Text input="보물 탐색" bdr="2.5px black" fs="50px" />
          <Text input="2층" bdr="2.5px black" fs="40px" />
          <img src={F2} alt="" width="80%" style={{ margin: "10px" }} />
          <HiddenHintComponent
            hint={"GIST 중앙도서관의 자원봉사자를 위한 공간"}
            margin="123px"
          />
          <br />
          <Button
            text="돌아가기"
            fontSize={33}
            onClick={() => {
              clickHandler(-2);
            }}
          />
        </>
      );
    } else if (Q === 3) {
      return (
        <>
          <Text input="보물 탐색" bdr="2.5px black" fs="50px" />
          <Text input="전시관" bdr="2.5px black" fs="40px" />
          <img
            src={questionBox}
            alt=""
            width="50%"
            style={{ margin: "10px" }}
          />
          <HiddenHintComponent
            hint={"전시장의 모든 것이 보물일지도 몰라요!"}
            margin="111px"
          />
          <br />
          <Button
            text="돌아가기"
            fontSize={33}
            onClick={() => {
              clickHandler(-3);
            }}
          />
        </>
      );
    }
  };

  return <StartDiv>{currentExplore(number)}</StartDiv>;
};

export default ExplorePage;
