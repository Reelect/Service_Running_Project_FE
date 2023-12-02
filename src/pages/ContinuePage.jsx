import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import styled from "styled-components";
import Bg from "../assets/register/bg.png";
import { ReactComponent as TitleSvg } from "../assets/continue/title.svg";

import Text from "../components/Text";
import Button from "../components/SquareButton";
import InputButton from "../components/NumButton";

// Styled components 정의
// ...

const TableContainer = styled.div`
  @import url("https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css");
  font-family: "Galmuri11", sans-serif;
  max-height: 60%; // 원하는 높이로 설정
  overflow-y: auto;
  width: 85%;
  margin: auto;
  border-radius: 4px;
`;

const HighlightedBorderDiv = styled.div`
  padding-bottom: 20px; // 내부 여백
  text-align: center; // div 내부의 모든 요소를 가운데 정렬
  display: flex; // Flexbox를 사용
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  padding: 8px;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:nth-child(odd) {
    background-color: #dddddd;
  }
`;

const Th = styled.th`
  background-color: #cc3333;
  color: white;
  position: sticky; // 여기에 position: sticky 추가
  padding: 8px;
  top: 0; // 상단에 고정
  z-index: 10; // 테이블 내용보다 위에 렌더링되도록 z-index 설정
`;

const TableCell = styled.td`
  text-align: center;
  padding: 8px;
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

// UserPage 컴포넌트
const UserPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [enteredPhone, setEnteredPhone] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}list`)
      .then((response) => {
        const transformedData = response.data.map((user) => ({
          nickname: user.nickname,
          ph_number: maskPhoneNumber(user.ph_number), // 전화번호 마스킹
        }));
        setUsers(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  console.log(enteredPhone);

  function maskPhoneNumber(phoneNumber) {
    // 전화번호의 중간 부분을 찾아서 마스킹합니다.
    // 예를 들어, "010-1234-5678", "02-123-4567" 혹은 "031-123456-789" 형식에 대응합니다.
    return phoneNumber.replace(/(\d+)-(\d+)-(\d+)/, (match, p1, p2, p3) => {
      // 중간 부분(p2)을 '*'로 마스킹합니다.
      const maskedMiddle = "*".repeat(p2.length);
      return `${p1}-${maskedMiddle}-${p3}`;
    });
  }

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    const postData = {
      nickname: selectedUser.nickname,
      ph_number: enteredPhone,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}search`, postData)
      .then((response) => {
        localStorage.setItem("ranger_id", response.data);
        alert("환영합니다:) 다시 모험을 시작하죠!");
        navigate("/explore"); // 다음 페이지로 이동
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        alert("입력한 전화번호가 일치하지 않습니다.");
      });
  };

  return (
    <StartDiv>
      <TitleSvg width="80%" />
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>닉네임</Th>
              <Th>전화번호</Th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index} onClick={() => openModal(user)}>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.ph_number}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Phone Verification"
          style={{
            overlay: {
              zIndex: 1000, // 다른 요소들보다 높은 값으로 설정
            },
            content: {
              display: "flex", // Flex 컨테이너 설정
              flexDirection: "column", // 아이템을 세로로 정렬
              justifyContent: "center", // 세로 방향 중앙 정렬
              alignItems: "center", // 가로 방향 중앙 정렬
              height: "80%",
            },
          }}
          ariaHideApp={false}
        >
          <Text input="모험가의 닉네임" fs="25px" />
          <HighlightedBorderDiv>
            <Text input={selectedUser?.nickname} fs="30px" is_nick={true} />
          </HighlightedBorderDiv>
          <Text input="전화번호" fs="30px" />
          <InputButton
            plc="전화번호를 입력해주세요."
            value={enteredPhone}
            setValue={(value) => {
              setEnteredPhone(() => ({
                value,
              }));
            }}
          />
          <br />
          <Button
            text={"확인"}
            onClick={handleSubmit}
            fontSize={32}
            width="100px"
          />
          <Button
            text={"취소"}
            onClick={closeModal}
            fontSize={32}
            width="100px"
          />
        </Modal>
      </TableContainer>
      <Button
        text="돌아가기"
        onClick={() => navigate("/register")}
        fontSize={33}
      />
    </StartDiv>
  );
};

export default UserPage;
