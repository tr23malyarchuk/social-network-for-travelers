import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Post from "../../components/Post/Post";

const token = process.env.REACT_APP_ACCESS_TOKEN;
const userId = Number(jwtDecode(token).memberId);

export default function Newspage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data) => Promise.all(data.map(async (p) => {
        const likes = await fetch(`http://localhost:3000/posts/${p.id}/likes`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
        const comments = await fetch(`http://localhost:3000/posts/${p.id}/comments`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
        return { ...p, likes: likes.length, comments: comments.map(c => c.text) };
      })))
      .then(setPosts)
      .catch(e => setError(`Error: ${e}`));
  }, []);

  if (error) return <div>{error}</div>;

  const likePost = (id) => {
    fetch(`http://localhost:3000/posts/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, userId }),
    });
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const addComment = (id, comment) => {
    fetch(`http://localhost:3000/posts/${id}/comments`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, userId, text: comment }),
    });
    setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, comment] } : p));
  };

  return posts.map(post => <Post key={post.id} post={post} onLike={likePost} onAddComment={addComment} />);
}
