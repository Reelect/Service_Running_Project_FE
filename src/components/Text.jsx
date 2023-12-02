import React from "react";
import "../styles/Text.css";

const Text = ({
  input,
  fs,
  bdr = "1.5px black",
  is_title = true,
  is_nick = false,
}) => {
  const buttonStyle = {
    fontSize: `${fs}`, // fontSize props를 받아서 적용합니다.
    WebkitTextStroke: `${bdr}`,
  };
  if (input === "전시관" || is_nick) {
    buttonStyle.color = "#ffef00";
    buttonStyle.WebkitTextStroke = "1.7px black";
  }
  if (is_title) {
    return (
      <span className="text-style" style={buttonStyle}>
        {input}
      </span>
    );
  } else {
    return (
      <span className="descript-style" style={buttonStyle}>
        {input}
      </span>
    );
  }
};

export default Text;
