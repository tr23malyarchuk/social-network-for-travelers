import React from 'react';
import PostForm from '../../components/PostForm/PostForm';
import { jwtDecode } from 'jwt-decode';

const token = process.env.REACT_APP_ACCESS_TOKEN;
const userId = Number(jwtDecode(token).memberId);

const Formpage = () => {
  const handleSubmit = (post) => {
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...post, userId }),
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Formpage;
