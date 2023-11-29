import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const [formValue, setFormValue] = useState({
    name: "",
    ph_num: "",
  });

  useEffect(() => {
    localStorage.setItem("name", formValue.name);
    localStorage.setItem("ph_num", formValue.ph_num);
  }, [formValue]);

  console.log(formValue);

  return (
    <StartDiv>
      <Text input="모험가님 환영합니다!" fs="30px" />
      <Text input="당신의 정보를 입력해주세요!" fs="25px" />
      <Nickname width="30%" />
      <Button
        plc="이름을 입력해주세요."
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
      <Link to="/explore" style={{ textDecoration: "none" }}>
        <ActionButton text="탐험시작" fontSize={33} />
      </Link>
      <ActionButton text="이어하기" fontSize={33} />
    </StartDiv>
  );
};

export default RegisterPage;
