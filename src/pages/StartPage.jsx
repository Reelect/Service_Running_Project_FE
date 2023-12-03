import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

import Button from "../components/SquareButton";
import { ReactComponent as DescriptionSvg } from "../assets/start/find_get_treasure.svg";
import { ReactComponent as TitleSvg } from "../assets/start/title.svg";
import { ReactComponent as GistSvg } from "../assets/start/GIST.svg";
import Chest from "../assets/start/chest.png";
import Bg from "../assets/start/bg.png";

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
      <GistSvg
        width="100%"
        style={{ marginTop: "5vh", marginBottom: "2.5vh" }}
      />
      <TitleSvg width="80%" />
      <br />
      <br />
      <DescriptionSvg width="80%" />
      <Link to="/intro" style={{ textDecoration: "none" }}>
        <Button text="시작하기" fontSize={33} />
      </Link>
      <Link to="/leaderboard" style={{ textDecoration: "none" }}>
        <Button text="현황보기" fontSize={33} />
      </Link>
      <img src={Chest} alt="" width="50%" />
    </StartDiv>
  );
};

export default StartPage;
