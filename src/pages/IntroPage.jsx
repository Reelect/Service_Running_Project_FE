import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/SquareButton";
import { ReactComponent as TitleSvg } from "../assets/start/title.svg";
import { ReactComponent as GistSvg } from "../assets/start/GIST.svg";
import Bg from "../assets/start/bg.png";

import GrayHintBox from "../components/GrayHintBox";
import Text from "../components/Text";

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

const StartPage = () => {
  return (
    <StartDiv>
      <GistSvg width="100%" />
      <TitleSvg width="65%" />
      <Text input="게임 안내" bdr="3px black" fs="40px" is_order={true} />
      <Text input="첫째" bdr="2px black" fs="30px" />
      <GrayHintBox
        text={"모험가 등록을 위해서 \n 닉네임과 전화번호를 입력해주세요."}
      />
      <Text input="둘째" bdr="2px black" fs="30px" />
      <GrayHintBox
        text={
          "도서관 1층, 2층, 전시관에 \n 숨겨진 보물을 찾고 QR을 인식해주세요."
        }
      />
      <Text input="셋째" bdr="2px black" fs="30px" />
      <GrayHintBox
        text={"3개의 보물을 찾고 상품을 받아가세요!\n(선착순, 추첨도 시행)"}
      />
      <br />
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button text="모험시작" fontSize={33} />
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button text="메인화면" fontSize={33} />
      </Link>
    </StartDiv>
  );
};

export default StartPage;
