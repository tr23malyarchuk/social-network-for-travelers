import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Post from "../../components/Post/Post";

export default function Newspage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      setError("No token found");
      return;
    }
    try {
      const decoded = jwtDecode(savedToken);
      setUserId(Number(decoded.memberId));
      setToken(savedToken);
    } catch {
      setError("Invalid token");
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        const postsRes = await fetch("http://localhost:3000/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!postsRes.ok) throw new Error(postsRes.status);

        const postsData = await postsRes.json();

        const enrichedPosts = await Promise.all(
          postsData.map(async (p) => {
            const likesRes = await fetch(
              `http://localhost:3000/posts/${p.id}/likes`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const likes = await likesRes.json();

            const commentsRes = await fetch(
              `http://localhost:3000/posts/${p.id}/comments`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            const comments = await commentsRes.json();

            return {
              ...p,
              likes: likes.length,
              comments: comments.map((c) => c.text),
              likedUsers: likes.map((like) => like.userId),
            };
          })
        );
        setPosts(enrichedPosts);

        const usersRes = await fetch("http://localhost:3001/users");
        if (!usersRes.ok) throw new Error(usersRes.status);
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (e) {
        setError(`Error: ${e.message}`);
      }
    }

    fetchData();
  }, [token]);

  if (error) return <div>{error}</div>;
  if (!userId) return <div>Loading...</div>;

  const likePost = async (id) => {
    const post = posts.find((p) => p.id === id);
    const alreadyLiked = post.likedUsers?.includes(userId);

    const res = await fetch(`http://localhost:3000/posts/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id, userId }),
    });

    if (res.ok) {
      setPosts(
        posts.map((p) =>
          p.id === id
            ? {
                ...p,
                likes: p.likes + (alreadyLiked ? -1 : 1),
                likedUsers: alreadyLiked
                  ? p.likedUsers.filter((uid) => uid !== userId)
                  : [...(p.likedUsers || []), userId],
              }
            : p
        )
      );
    }
  };

  const addComment = (id, comment) => {
    fetch(`http://localhost:3000/posts/${id}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: id, userId, text: comment }),
    });
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
  };

  return posts.map((post) => (
    <Post
      key={post.id}
      post={post}
      likePost={likePost}
      onAddComment={(text) => addComment(post.id, text)}
      userId={userId}
      users={users}
    />
  ));
}
