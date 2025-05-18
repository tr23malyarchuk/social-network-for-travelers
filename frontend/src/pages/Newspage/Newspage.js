import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";

function Newspage() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => {
          localStorage.setItem("accessToken", data.accessToken);
          setToken(data.accessToken);
        })
        .catch((err) => setError(err.message));
      return;
    }

    fetch("http://localhost:3000/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
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
  }, [token]);

  if (error) return <div>{error}</div>;

  const likePost = (id) => {
    fetch(`http://localhost:3000/posts/${id}/like`, {
      method: "POST",
    }).then(() => {
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        )
      );
    });
  };

  const addComment = (id, comment) => {
    fetch(`http://localhost:3000/posts/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ text: comment }),
    }).then(() => {
      setPosts(
        posts.map((post) =>
          post.id === id
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      );
    });
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
