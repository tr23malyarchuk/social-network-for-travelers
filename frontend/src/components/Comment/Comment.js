import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Comment.css";
import SendButton from "../SendButton/SendButton";

const Comment = ({ comments, onAdd }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAdd(newComment);
      setNewComment("");
    }
  };

  const displayedComments = expanded ? comments : comments.slice(0, 2);

  return (
    <div className="comment-box">
      <h3>Коментарі ({comments.length})</h3>
      <div className="comment-input">
        <textarea
          placeholder="Напишіть коментар..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SendButton
          onClick={handleAddComment}
          active={newComment.trim() !== ""}
        />
      </div>
      <div className="comments-list">
        {displayedComments.map((comment, index) => (
          <div key={index} className="comment playpen-sans-post-text">
            {comment}
          </div>
        ))}

        {comments.length > 2 && (
          <button
            className="toggle-comments-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
