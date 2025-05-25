import React, { useState } from "react";
import './PostForm.css';
import SendButton from "../SendButton/SendButton";

const PostForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePost = async () => {
    if (text || imageUrl) {
      await onSubmit({ text, imageUrl });
      setText("");
      setImageUrl("");
    }
  };

  return (
    <div className="post-form">
      <input
        className="post-form-input"
        type="text"
        placeholder="URL картинки"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
      />
      <textarea
        className="post-form-textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Додати текст"
        rows={3}
      />
      <div className="button-center">
        <SendButton onClick={handlePost} active={text.trim() !== ""} />
      </div>
    </div>
  );
};

export default PostForm;
