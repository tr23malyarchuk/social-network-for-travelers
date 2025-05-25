import React, { useState } from "react";
import './PostForm.css';
import SendButton from "../SendButton/SendButton";

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

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setValidImage(false);
  };
  
  const onImageLoad = () => setValidImage(true);
  const onImageError = () => setValidImage(false);

  return (
    <div className="post-form">
      <input
        className="post-form-input"
        type="text"
        placeholder="URL картинки"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Preview" 
          onLoad={onImageLoad} 
          onError={onImageError} 
          style={{ 
            display: validImage ? 'block' : 'none', 
            maxWidth: '100%', 
            borderRadius: '10px', 
            marginTop: '10px' 
          }} 
        />
      )}
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
