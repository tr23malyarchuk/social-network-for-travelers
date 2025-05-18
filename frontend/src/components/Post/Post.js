import React, { useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import "./Post.css";
import SendButton from "../SendButton/SendButton";

function Post({ post, onLike, onAddComment }) {
  const [commentText, setCommentText] = useState("");
  const forbiddenWords = [
    "бол",
    "мам",
    "хуй",
    "бан",
    "йоб",
    "еб",
    "твою",
    "бля",
    "сук",
  ];

  const handleComment = () => {
    const text = commentText.trim().toLowerCase();
    if (!text) return alert("Коментар не може бути порожнім");
    for (let word of forbiddenWords) {
      if (text.includes(word)) return alert("В коментарі є заборонене слово");
    }
    onAddComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <div className="post">
      {post.imageUrl && (
        <img src={post.imageUrl} alt="post" className="post-image" />
      )}
      <p className="post-text">{post.text}</p>

      <HeartButton
        likesCount={post.likes || 0}
        onLike={() => onLike(post.id)}
      />

      <div className="button-container">
        <input
          className="comment-input"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Додайте коментар..."
        />
        <SendButton onClick={handleComment} />
      </div>

      <div style={{ marginTop: "10px" }}>
        Коментарі ({(post.comments || []).length}):
        <ul className="comments-list">
          {(post.comments || []).map((c, i) => (
            <li key={i} className="comment-item">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Post;
