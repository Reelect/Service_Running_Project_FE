import React from "react";
import "../styles/Button.css";

function Button({
  text,
  fontSize,
  onClick,
  width = "100px",
  margin = "137px",
}) {
  // 인라인 스타일을 사용하여 fontSize를 설정합니다.
  const buttonStyle = {
    fontSize: `${fontSize}px`, // fontSize props를 받아서 적용합니다.
    // 나머지 스타일은 CSS 파일에 정의되어 있습니다.
  };
  buttonStyle.width = width;
  if (text === "힌트 보기") {
    buttonStyle.marginBottom = margin;
  }
  // END: ed8c6549bwf9

  return (
    <button
      className="sized-button-style"
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
