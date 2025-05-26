import React, { useState } from "react";
import SendButton from "../SendButton/SendButton";
import './PostForm.css';

const PostForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [validImage, setValidImage] = useState(false);

  const handlePost = async () => {
    if (text || imageUrl) {
      await onSubmit({ text, imageUrl });
      setText("");
      setImageUrl("");
      setValidImage(false);
    }
  };

  return (
    <div className="post-form">
      <input
        type="text"
        placeholder="URL картинки"
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value);
          setValidImage(false);
        }}
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          onLoad={() => setValidImage(true)}
          onError={() => setValidImage(false)}
          style={{
            display: validImage ? "block" : "none",
            maxWidth: "100%",
            borderRadius: 10,
            marginTop: 10,
          }}
        />
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
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
