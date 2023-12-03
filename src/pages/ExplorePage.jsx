import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Camera from "../components/Camera";
import GrayHintBox from "../components/GrayHintBox";
import HiddenHintComponent from "../components/Hint";
import InputButton from "../components/InputButton";
import Button from "../components/SquareButton";
import Text from "../components/Text";

import F1 from "../assets/explore/1F.png";
import F2 from "../assets/explore/2F.png";
import Chest from "../assets/explore/chest.png";
import questionBox from "../assets/explore/questionbox.png";
import { ReactComponent as TList } from "../assets/explore/treasure_list.svg";
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

const handleButtonClick = async (whatTreasure) => {
  const patchData = {
    [whatTreasure]: 1,
  };
  let complete = 0;
  console.log(patchData);
  await axios
    .patch(
      process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id"),
      patchData
    )
    .then((response) => {
      console.log("You got treasure!", whatTreasure);
      complete = response.data.complete;
    })
    .catch((error) => {
      console.error("Error patch data:", error);
      alert("보물 발견에 실패했습니다. 다시 시도해주세요!");
    });
  return complete;
};

const ExplorePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem("ranger_id")) {
      axios
        .get(process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id"))
        .then((response) => {
          if (response.status === 404) {
            alert("등록되지 않은 사용자 정보입니다. 다시 입력해주세요!");
            navigate("/register");
          }
          return true;
        })
        .catch((error) => {
          console.error("Error fetching treasure status:", error);
        });
    }
  }, [navigate]);

  useEffect(() => {
    // localStorage에서 ranger_id 값을 가져옵니다.
    const rangerId = localStorage.getItem("ranger_id");

    // ranger_id 값이 없으면 /register로 이동합니다.
    if (!rangerId) {
      alert("등록된 모험가 정보가 없습니다! 등록 페이지로 이동합니다:)");
      navigate("/register");
    }
    fetchTreasureStatus();
  }, [navigate]); // 의존성 배열에 navigate를 추가합니다.

  const [number, setNumber] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false); // 카메라 활성화 여부를 저장할 상태 변수
  const [result, SetResult] = useState(""); // 바코드 결과를 저장할 상태 변수
  const [treasureStatus, setTreasureStatus] = useState({
    treasure1: 0,
    treasure2: 0,
    treasure3: 0,
    complete: 0,
  });

  const fetchTreasureStatus = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id")
      );
      console.log(response.data);
      setTreasureStatus(response.data);
    } catch (error) {
      console.error("Error fetching treasure status:", error);
    }
  };

  useEffect(() => {
    if (treasureStatus.complete > 0) {
      alert("모든 보물을 찾으셨습니다! 축하드립니다!");
      clickHandler(7);
    }
  }, [treasureStatus.complete]);

  const handleStartButtonClick = () => {
    setIsCameraActive(!isCameraActive); // 카메라 상태를 토글
  };

  const clickHandler = (next) => {
    setNumber(next);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(result);
      if (result.endsWith("haedong")) {
        setIsCameraActive(false);
        SetResult("");
        const is_complete = await handleButtonClick("treasure1");
        await fetchTreasureStatus();
        if (is_complete === 1) {
          clickHandler(7);
        } else {
          clickHandler(4);
        }
      } else if (result.endsWith("gold")) {
        setIsCameraActive(false);
        SetResult("");
        const is_complete = await handleButtonClick("treasure2");
        await fetchTreasureStatus();
        if (is_complete === 1) {
          clickHandler(7);
        } else {
          clickHandler(5);
        }
      } else if (result.endsWith("secret")) {
        setIsCameraActive(false);
        SetResult("");
        const is_complete = await handleButtonClick("treasure3");
        await fetchTreasureStatus();
        if (is_complete === 1) {
          clickHandler(7);
        } else {
          clickHandler(6);
        }
      }
    };

    fetchData();
  }, [result]);

  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    localStorage.setItem("name", userAddress.name);
  }, [userAddress]);

  const submitUserAddress = () => {
    const submitData = {
      complete: 2,
      address: userAddress,
    };

    axios
      .patch(
        process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id"),
        submitData
      )
      .then((response) => {
        console.log("Data successfully sent:", response.data);
        alert("입력하신 정보로 상품을 전달하겠습니다!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        alert("주소 입력에 실패했습니다. 다시 시도해주세요!");
      });
  };

  return (
    <StartDiv>
      {number === 0 ? (
        <>
          <TList width="80%" style={{ marginBottom: "", marginTop: "0" }} />
          <img src={Chest} alt="" width="50%" />
          <Button
            text={treasureStatus.treasure1 === 1 ? "완료!" : "1 층"}
            fontSize={33}
            onClick={
              treasureStatus.treasure1 === 1 ? null : () => clickHandler(1)
            }
            style={{
              opacity: treasureStatus.treasure1 === 1 ? 0.5 : 1,
              pointerEvents: treasureStatus.treasure1 === 1 ? "none" : "auto",
            }}
          />
          <br />
          <Button
            text={treasureStatus.treasure2 === 1 ? "완료!" : "2 층"}
            fontSize={33}
            onClick={
              treasureStatus.treasure2 === 1 ? null : () => clickHandler(2)
            }
            style={{
              opacity: treasureStatus.treasure2 === 1 ? 0.5 : 1,
              pointerEvents: treasureStatus.treasure2 === 1 ? "none" : "auto",
            }}
          />
          <br />
          <Button
            text={treasureStatus.treasure3 === 1 ? "완료!" : "전시관"}
            fontSize={33}
            onClick={
              treasureStatus.treasure3 === 1 ? null : () => clickHandler(3)
            }
            style={{
              opacity: treasureStatus.treasure3 === 1 ? 0.5 : 1,
              pointerEvents: treasureStatus.treasure3 === 1 ? "none" : "auto",
            }}
          />
        </>
      ) : number === 1 ? (
        <>
          <Text input="보물 탐색" bdr="2.5px black" fs="50px" />
          <Text input="1층" bdr="2.5px black" fs="40px" />
          <img src={F1} alt="" width="80%" style={{ margin: "10px" }} />
          <HiddenHintComponent
            hint={"대덕전자 故김정식 회장님의 기부로 지어진 공간"}
          />
          <Button
            text={"보물 QR 인식"}
            fontSize={20}
            onClick={handleStartButtonClick}
            width="100px"
            margin={0}
          />
          <Modal
            isOpen={isCameraActive}
            style={{
              content: {
                display: "flex", // Flex 컨테이너 설정
                flexDirection: "column", // 아이템을 세로로 정렬
                justifyContent: "center", // 세로 방향 중앙 정렬
                alignItems: "center", // 가로 방향 중앙 정렬
                height: "70%",
              },
            }}
            ariaHideApp={false}
            onRequestClose={handleStartButtonClick}
          >
            <Text input="탐색중..." bdr="1.5px black" fs="30px" />
            <Camera SetValue={SetResult} />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                text={"종료"}
                fontSize={20}
                onClick={handleStartButtonClick}
                width="10px"
                margin={0}
              />
            </div>
          </Modal>
          <br />
          <Button
            text="돌아가기"
            fontSize={33}
            onClick={() => {
              clickHandler(0);
            }}
          />
        </>
      ) : number === 2 ? (
        <>
          <Text input="보물 탐색" bdr="2.5px black" fs="50px" />
          <Text input="2층" bdr="2.5px black" fs="40px" />
          <img src={F2} alt="" width="80%" style={{ margin: "10px" }} />
          <HiddenHintComponent
            hint={"GIST 중앙도서관의 자원봉사자를 위한 공간"}
            margin="123px"
          />
          <Button
            text={"보물 QR 인식"}
            fontSize={20}
            onClick={handleStartButtonClick}
            width="100px"
            margin={0}
          />
          <Modal
            isOpen={isCameraActive}
            style={{
              content: {
                display: "flex", // Flex 컨테이너 설정
                flexDirection: "column", // 아이템을 세로로 정렬
                justifyContent: "center", // 세로 방향 중앙 정렬
                alignItems: "center", // 가로 방향 중앙 정렬
                height: "70%",
              },
            }}
            ariaHideApp={false}
            onRequestClose={handleStartButtonClick}
          >
            <Text input="탐색중..." bdr="1.5px black" fs="30px" />
            <Camera SetValue={SetResult} />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                text={"종료"}
                fontSize={20}
                onClick={handleStartButtonClick}
                width="10px"
                margin={0}
              />
            </div>
          </Modal>
          <br />
          <Button
            text="돌아가기"
            fontSize={33}
            onClick={() => {
              clickHandler(0);
            }}
          />
        </>
      ) : number === 3 ? (
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
          <Button
            text={"보물 QR 인식"}
            fontSize={20}
            onClick={handleStartButtonClick}
            width="100px"
            margin={0}
          />
          <Modal
            isOpen={isCameraActive}
            style={{
              content: {
                display: "flex", // Flex 컨테이너 설정
                flexDirection: "column", // 아이템을 세로로 정렬
                justifyContent: "center", // 세로 방향 중앙 정렬
                alignItems: "center", // 가로 방향 중앙 정렬
                height: "70%",
              },
            }}
            ariaHideApp={false}
            onRequestClose={handleStartButtonClick}
          >
            <Text input="탐색중..." bdr="1.5px black" fs="30px" />
            <Camera SetValue={SetResult} />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                text={"종료"}
                fontSize={20}
                onClick={handleStartButtonClick}
                width="10px"
                margin={0}
              />
            </div>
          </Modal>
          <br />
          <Button
            text="돌아가기"
            fontSize={33}
            onClick={() => {
              clickHandler(0);
            }}
          />
        </>
      ) : number === 4 ? (
        <>
          <Text input="1층 보물 발견!" bdr="2.5px black" fs="50px" />
          <Text
            input="이미지 넣어줘용~"
            isTitle={false}
            bdr="2.5px black"
            fs="40px"
          />
          <br />
          <Button
            text="다른 보물 찾으러 가기"
            fontSize={18}
            onClick={() => {
              clickHandler(0);
            }}
          />
        </>
      ) : number === 5 ? (
        <>
          <Text input="2층 보물 발견!" bdr="2.5px black" fs="50px" />
          <Text input="이미지 넣어줘용~" bdr="2.5px black" fs="40px" />
          <br />
          <Button
            text="다른 보물 찾으러 가기"
            fontSize={18}
            onClick={() => {
              clickHandler(0);
            }}
          />
        </>
      ) : number === 6 ? (
        <>
          <Text input="전시장 보물 발견!" bdr="2.5px black" fs="50px" />
          <Text input="이미지 넣어줘용~" bdr="2.5px black" fs="40px" />
          <br />
          <Button
            text="다른 보물 찾으러 가기"
            fontSize={18}
            onClick={() => {
              clickHandler(0);
            }}
          />
        </>
      ) : number === 7 ? (
        <>
          <Text input="🥳모든 보물 발견!" bdr="2.5px black" fs="45px" />
          <GrayHintBox
            text={
              treasureStatus.complete === 1
                ? "축하합니다!모든 보물을 발견했어요! 마지막으로 아래 칸에 받으실 주소를 입력해주세요! \n (원내 주소는 간단히!)"
                : "축하합니다!모든 보물을 발견했어요! 곧 입력한 주소로 전리품이 모험가님을 찾아갈거에요!"
            }
          />
          <br />
          {treasureStatus.complete === 1 ? (
            <InputButton
              plc="주소를 입력해주세요."
              value={userAddress}
              setValue={(value) => {
                setUserAddress((address) => address + value);
              }}
            />
          ) : null}
          <Button
            text={treasureStatus.complete === 1 ? "입력 완료" : "시작 화면으로"}
            fontSize={24}
            onClick={() => {
              if (treasureStatus.complete === 1) {
                submitUserAddress();
              } else {
                navigate("/");
              }
            }}
          />
        </>
      ) : (
        <></>
      )}
    </StartDiv>
  );
};

export default ExplorePage;
