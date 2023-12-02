import { useZxing } from "react-zxing";
import "../styles/Camera.css";

const BarcodeScanner = ({ SetValue }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      const decodedText = result.getText();
      SetValue(decodedText);
    },
  });

  return (
    <>
      <video ref={ref} className="camera" />
    </>
  );
};

export default BarcodeScanner;
