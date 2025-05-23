import React from "react";
import "./SendButton.css";
import "../Comment/Comment";

function SendButton({ onClick, active }) {
  return (
    <button className={`button ${active ? "active" : ""}`} onClick={onClick}>
      Send
    </button>
  );
}

export default SendButton;
