import React, { useState } from 'react';
import '../Post/Post.css';

function PostForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (text || image) {
      onSubmit({ text, imageUrl: image });
      setText('');
      setImage(null);
    }
  };

  return (
    <div className="post">
      <input type="file" onChange={handleUpload} />
      {image && <img src={image} alt="preview" className="post-image" />}
      <textarea
        className="comment-input"
        placeholder="Додати текст..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="button-container">
        <button onClick={handleSubmit}>Опублікувати</button>
      </div>
    </div>
  );
}

export default PostForm;
