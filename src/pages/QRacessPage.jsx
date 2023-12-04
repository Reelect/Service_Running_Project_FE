import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import GrayHintBox from "../components/GrayHintBox";
import Button from "../components/SquareButton";
import Text from "../components/Text";

import Chest from "../assets/explore/suprise.png";
import Bg from "../assets/start/bg.png";
import "../styles/Hint.css";

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

const QRacessPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("ranger_id")) {
      axios
        .get(process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id"))
        .then((response) => {
          if (response.status === 404) {
            alert("아직 모험가가 아니군요... 등록하고 모험을 떠나보죠!");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching treasure status:", error);
          alert("아직 모험가가 아니군요... 등록하고 모험을 떠나보죠!");
          navigate("/");
        });
    }
  }, [navigate]);
  return (
    <StartDiv>
      <Text input="보물 기습 발견!" bdr="2.5px black" fs="50px" />
      <br />
      <img src={Chest} alt="" width="50%" />
      <br />
      <GrayHintBox
        text={
          "보물을 먼저 발견했군요! \n 보물리스트에서 어떤 보물인지 \n 다시 확인해 주세요!"
        }
      />
      <br />
      <Button
        text="확인하러 가기"
        fontSize={25}
        onClick={() => {
          navigate("/explore");
        }}
      />
    </StartDiv>
  );
};

export default QRacessPage;
