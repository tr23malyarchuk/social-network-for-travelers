import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function HeartButton({ liked, likesCount, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        fontSize: "2rem",
        color: liked ? "#e63946" : "#888",
        textAlign: "center",
      }}
    >
      {liked ? <AiFillHeart /> : <AiOutlineHeart />} {likesCount}
    </div>
  );
}

export default HeartButton;
