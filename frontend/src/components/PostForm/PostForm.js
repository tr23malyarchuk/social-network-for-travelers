import React, { useState } from 'react';
import UploadImageButton from '../UploadImageButton/UploadImageButton';
import SendButton from '../SendButton/SendButton';
import './PostForm.css';

const PostForm = ({ onSubmit }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (text || image) {
      onSubmit({ text, image });
      setText('');
      setImage(null);
    }
  };

  return (
    <div className="post">
      {!image && <UploadImageButton onChange={handleImageUpload} />}
      {image && <img src={image} alt="uploaded" className="post-image" />}
      <textarea
        className="comment-input"
        placeholder="Додати коментар..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="button-container">
        <SendButton onClick={handlePost} />
      </div>
    </div>
  );
};

export default PostForm;
