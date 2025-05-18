import React from "react";
import "./SendButton.css";

function SendButton({ onClick }) {
  return (
    <button
      className="send-button"
      onClick={onClick}
      aria-label="Відправити коментар"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    </button>
  );
}

export default SendButton;
