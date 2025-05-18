import React, { useState } from "react";
import "./HeartButton.css";

function HeartButton({ likesCount, onLike }) {
  const [active, setActive] = useState(false);

  return (
    <div className="heart-button-container">
      <svg
        onMouseDown={() => setActive(true)}
        onMouseUp={() => {
          setActive(false);
          onLike();
        }}
        onMouseLeave={() => setActive(false)}
        xmlns="http://www.w3.org/2000/svg"
        fill={active ? "#0056b3" : "none"}
        stroke="#007bff"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        className="heart-svg"
      >
        <path d="M12 21s-8-7.5-8-11a4 4 0 018-3 4 4 0 018 3c0 3.5-8 11-8 11z" />
      </svg>
      <span className="likes-count">{likesCount}</span>
    </div>
  );
}

export default HeartButton;
