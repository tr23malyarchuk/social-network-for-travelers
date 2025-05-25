import React, { useState } from "react";

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
        type="text"
        placeholder="URL картинки"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
      />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Текст поста"
        rows={3}
      />
      <button onClick={handlePost}>Опублікувати</button>
    </div>
  );
};

export default PostForm;
