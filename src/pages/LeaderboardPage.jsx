import styled from "styled-components";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/SquareButton";

import { ReactComponent as TitleSvg } from "../assets/leaderboard/title.svg";

import Bg from "../assets/start/bg.png";

const TableContainer = styled.div`
  @import url("https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css");
  font-family: "Galmuri11", sans-serif;
  max-height: 60%; // 원하는 높이로 설정
  overflow-y: auto;
  width: 85%;
  margin: auto;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #cc3333;
  color: white;
  position: sticky; // 여기에 position: sticky 추가
  padding: 8px;
  top: 0; // 상단에 고정
  z-index: 10; // 테이블 내용보다 위에 렌더링되도록 z-index 설정
`;

const WinnerText = styled.span`
  color: yellow; // 노란색으로 텍스트 색상 지정
  font-weight: bold; // 텍스트를 굵게
  background-color: #cc3333;
  padding: 0.2em 0.4em; // 상하좌우 패딩 추가
  margin: 0 0.2em; // 좌우 마진 추가
  border-radius: 4px;
`;

const Td = styled.td`
  text-align: center;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:nth-child(odd) {
    background-color: #dddddd;
  }
`;

const TreasureStatusTd = styled.td`
  text-align: center;
  padding: 8px;
  color: ${(props) => (props.found ? "green" : "red")};
`;

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

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [adventurers, setAdventurers] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "list")
      .then((response) => {
        setAdventurers(
          response.data.map((adventurer) => ({
            ...adventurer,
            treasuresFound: [
              adventurer.treasure1,
              adventurer.treasure2,
              adventurer.treasure3,
              adventurer.complete,
            ]
              .filter(Boolean)
              .join(", "),
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching adventurers status:", error);
      });
  }, []);

  return (
    <StartDiv>
      <TitleSvg width="80%" />
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>닉네임</Th>
              <Th>1층</Th>
              <Th>2층</Th>
              <Th>전시장</Th>
            </tr>
          </thead>
          <tbody>
            {adventurers.map((adventurer, index) => (
              <Tr key={index}>
                <Td>
                  {adventurer.complete ? <WinnerText>우승자!</WinnerText> : ""}
                  {adventurer.complete ? <br /> : null}
                  {adventurer.nickname}
                </Td>
                <TreasureStatusTd found={adventurer.treasure1}>
                  {adventurer.treasure1 ? "발견!" : "미발견"}
                </TreasureStatusTd>
                <TreasureStatusTd found={adventurer.treasure2}>
                  {adventurer.treasure2 ? "발견!" : "미발견"}
                </TreasureStatusTd>
                <TreasureStatusTd found={adventurer.treasure3}>
                  {adventurer.treasure3 ? "발견!" : "미발견"}
                </TreasureStatusTd>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <Button
        text="돌아가기"
        onClick={() => {
          navigate("/");
        }}
        fontSize={33}
      />
    </StartDiv>
  );
};

export default LeaderboardPage;
