import React, { useState } from "react";
import Camera from "../components/Camera"; // 카메라 컴포넌트 임포트

function App() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [result, SetResult] = useState(""); // 바코드 결과를 저장할 상태 변수

  const handleStartButtonClick = () => {
    setIsCameraActive(true); // 카메라를 활성화합니다.
  };

  return (
    <div>
      {isCameraActive ? (
        <Camera SetValue={SetResult} />
      ) : (
        <button onClick={handleStartButtonClick}>시작하기</button>
      )}
      <span>{result}</span>
    </div>
  );
}

export default App;
