import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "../components/InputButton";
import InputButton from "../components/NumButton";
import Text from "../components/Text";
import Bg from "../assets/register/bg.png";
import { ReactComponent as Nickname } from "../assets/register/nickname.svg";
import { ReactComponent as Phnumber } from "../assets/register/ph_num.svg";
import ActionButton from "../components/SquareButton";

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

const RegisterPage = () => {
  const navigate = useNavigate();

  const fetchUserStatus = () => {
    axios
      .get(process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id"))
      .then((response) => {
        if (response.status === 404) {
          localStorage.removeItem("ranger_id");
          alert("등록되지 않은 사용자 정보입니다. 다시 입력해주세요!");
        }
        return true;
      })
      .catch((error) => {
        console.error("Error fetching treasure status:", error);
        return false;
      });
  };

  useEffect(() => {
    if (!!localStorage.getItem("ranger_id")) {
      fetchUserStatus();
    }
  }, []);

  const handleButtonClick = () => {
    const postData = {
      nickname: localStorage.getItem("name"),
      ph_number: localStorage.getItem("ph_num"),
    };
    console.log(process.env.REACT_APP_API_URL + "create");
    console.log("trying to send data:");
    axios
      .post(process.env.REACT_APP_API_URL + "create", postData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Data successfully sent:", response.data);
          localStorage.setItem("ranger_id", response.data);
          alert("등록이 완료되었습니다! 도서관 보물을 찾아볼까요?");
          navigate("/explore");
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        alert("이미 등록된 사용자 정보입니다. 이어하기를 진행해주세요!");
      });
  };

  const [formValue, setFormValue] = useState({
    name: "",
    ph_num: "",
  });

  useEffect(() => {
    localStorage.setItem("name", formValue.name);
    localStorage.setItem("ph_num", formValue.ph_num);
  }, [formValue]);

  useEffect(() => {
    const is_registered = localStorage.getItem("ranger_id");
    if (is_registered) {
      alert("등록되신 모험가님이군요! 환영합니다!");
      navigate("/explore");
    }
  }, [navigate]);

  console.log(formValue);

  return (
    <StartDiv>
      <Text input="모험가님 환영합니다!" fs="30px" />
      <Text input="당신의 정보를 입력해주세요!" fs="25px" />
      <Nickname width="30%" />
      <Button
        plc="닉네임을 입력해주세요."
        value={formValue.name}
        setValue={(value) => {
          setFormValue((state) => ({
            ...state,
            name: value,
          }));
        }}
      />
      <Phnumber width="80%" />
      <InputButton
        plc="전화번호를 입력해주세요."
        value={formValue.ph_num}
        setValue={(value) => {
          setFormValue((state) => ({
            ...state,
            ph_num: value,
          }));
        }}
      />
      <br></br>
      <br></br>
      <ActionButton onClick={handleButtonClick} text="탐험시작" fontSize={33} />
      <ActionButton
        onClick={() => {
          navigate("/continue");
        }}
        text="이어하기"
        fontSize={33}
      />
    </StartDiv>
  );
};

export default RegisterPage;
