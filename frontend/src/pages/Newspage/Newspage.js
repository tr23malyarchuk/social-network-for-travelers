import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";

function Newspage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const envToken = process.env.REACT_APP_ACCESS_TOKEN;
    const currentToken = Cookies.get("accessToken");
    if (!currentToken && envToken) {
      Cookies.set("accessToken", envToken, { expires: 1 });
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    fetch("http://localhost:3000/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const newToken = res.headers.get("_.Token");
        if (newToken) Cookies.set("accessToken", newToken, { expires: 1 });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(async (data) => {
        const postsWithExtras = await Promise.all(
          data.map(async (post) => {
            const [likes, comments] = await Promise.all([
              fetch(`http://localhost:3000/posts/${post.id}/likes`, {
                headers: { Authorization: `Bearer ${token}` },
              }).then((r) => r.json()),
              fetch(`http://localhost:3000/posts/${post.id}/comments`, {
                headers: { Authorization: `Bearer ${token}` },
              }).then((r) => r.json()),
            ]);
            return {
              ...post,
              likes: likes.length,
              comments: comments.map((c) => c.text),
            };
          })
        );
        setPosts(postsWithExtras);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>{error}</div>;

  const likePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const addComment = (id, comment) => {
    setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, comment] } : p));
  };

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={likePost}
          onAddComment={addComment}
        />
      ))}
    </div>
  );
}

export default Newspage;
