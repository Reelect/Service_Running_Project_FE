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
import Haedong from "../assets/explore/haedong.jpeg";
import Gold from "../assets/explore/gold.jpeg";
import Exhibit from "../assets/explore/exhibit.webp";
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

const canIGetGift = async () => {
  let get_count = 0;
  await axios
    .get(process.env.REACT_APP_API_URL + "today_list")
    .then((response) => {
      get_count = response.data.count;
      console.log("Aleready taken gifts!", get_count);
    })
    .catch((error) => {
      console.error("Error patch data:", error);
      alert("보물 발견에 실패했습니다. 다시 시도해주세요!");
    });
  return get_count;
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
  const [giftCount, setGiftCount] = useState(null);

  const fetchTreasureStatus = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + localStorage.getItem("ranger_id")
      );
      setTreasureStatus(response.data);
    } catch (error) {
      console.error("Error fetching treasure status:", error);
    }
  };

  useEffect(() => {
    if (treasureStatus.complete > 0 && number === 0) {
      alert("모든 보물을 찾으셨습니다! 축하드립니다!");
      clickHandler(7);
    }
  }, [treasureStatus.complete, number]);

  const handleStartButtonClick = () => {
    setIsCameraActive(!isCameraActive); // 카메라 상태를 토글
  };

  const clickHandler = (next) => {
    setNumber(next);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (result.endsWith("haedong")) {
        alert("해동관 보물 발견!");
        setIsCameraActive(false);
        SetResult("");
        await handleButtonClick("treasure1");
        await fetchTreasureStatus();
        clickHandler(4);
      } else if (result.endsWith("gold")) {
        alert("G.L.O.D. 보물 발견!");
        setIsCameraActive(false);
        SetResult("");
        await handleButtonClick("treasure2");
        await fetchTreasureStatus();
        clickHandler(5);
      } else if (result.endsWith("secret")) {
        alert("전시관 보물 발견!");
        setIsCameraActive(false);
        SetResult("");
        await handleButtonClick("treasure3");
        await fetchTreasureStatus();
        clickHandler(6);
      }
    };

    fetchData();
  }, [result]);

  useEffect(() => {
    const fetchCount = async () => {
      const count_temp = await canIGetGift();
      setGiftCount(count_temp);
    };
    fetchCount();
  }, []);

  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    localStorage.setItem("name", userAddress.name);
  }, [userAddress]);

  const submitUserAddress = () => {
    const submitData = {
      complete: giftCount >= 5 ? 3 : 2,
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
            hint={"전시장의 작품들을 시간을 갖고 천천히 감상해보세요!"}
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
          <img
            className="framed-image"
            src={Haedong}
            alt=""
            style={{ width: "80%" }}
          />
          <br />
          <GrayHintBox text="이곳은 해동과학문화재단에서 5억원을 기부받아 지스트 학생들이 벤처 창업에 힘쓸 수 있도록 구성된 공간입니다!" />
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
          <img
            className="framed-image"
            src={Gold}
            alt=""
            style={{ width: "80%" }}
          />
          <br />
          <GrayHintBox text="이곳은 GIST 구성원이라면 누구나 자원봉사자로 참여할 수 있는 G.O.L.D. 입니다! 샘솟는 재능을 이곳에서 뽐내주세요!" />
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
          <img
            className="framed-image"
            src={Exhibit}
            alt=""
            style={{ width: "80%" }}
          />
          <br />
          <GrayHintBox text="전시를 자세히 살펴봐 주셨군요! 나머지 다른 전시 작품도 천천히 즐기고, 기말고사 준비기간 조금이나마 기분 환기하길 바랍니다!" />
          <br />
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
              giftCount >= 5
                ? treasureStatus.complete === 1
                  ? "오늘은 이미 모든 보물을 찾으셨어요! 그래도 주소를 입력해주시면 추첨을 통해 상품을 보내드릴게요!"
                  : "모든 보물을 발견한 당신은 우승자! 메인 페이지에서 현황확인 버튼을 눌러보세요!"
                : treasureStatus.complete === 1
                ? "축하합니다! 모든 보물을 발견했어요! 마지막으로 아래 칸에 받으실 주소를 입력해주세요! \n (원내 주소는 간단히!)"
                : "축하합니다! 모든 보물을 발견했어요! 곧 입력한 주소로 전리품이 모험가님을 찾아갈거에요!"
            }
          />
          <br />
          {treasureStatus.complete === 1 ? (
            <InputButton
              plc="주소를 입력해주세요."
              value={userAddress}
              setValue={(value) => {
                setUserAddress(value);
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
