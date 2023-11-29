import React, { useState } from "react";
import "../styles/Button.css";
import "../styles/Input.css";

function oninputPhone(target) {
  target.value = target.value
    .replace(/[^0-9]/g, "")
    .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
}

function ImageTextInput({ plc, setValue }) {
  return (
    <div>
      <input
        type="text"
        placeholder={plc}
        className="input-style"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onInput={(e) => oninputPhone(e.target)}
        // 필요한 경우 추가 스타일 또는 이벤트 핸들러를 추가하세요.
      />
    </div>
  );
}

export default ImageTextInput;
