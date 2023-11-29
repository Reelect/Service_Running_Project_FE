import "../styles/Button.css";
import "../styles/Input.css";

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
        // 필요한 경우 추가 스타일 또는 이벤트 핸들러를 추가하세요.
      />
    </div>
  );
}

export default ImageTextInput;
