import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Post from "../../components/Post/Post";

const token = process.env.REACT_APP_ACCESS_TOKEN;
const userId = Number(jwtDecode(token).memberId);

export default function Newspage() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const postsRes = await fetch("http://localhost:3000/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!postsRes.ok) throw postsRes.status;

        const postsData = await postsRes.json();

        const enrichedPosts = await Promise.all(
          postsData.map(async (p) => {
            const likes = await fetch(
              `http://localhost:3000/posts/${p.id}/likes`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).then((r) => r.json());
            const comments = await fetch(
              `http://localhost:3000/posts/${p.id}/comments`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).then((r) => r.json());
            return {
              ...p,
              likes: likes.length,
              comments: comments.map((c) => c.text),
            };
          })
        );
        setPosts(enrichedPosts);

        const usersRes = await fetch("http://localhost:3001/users", {
        });
        if (!usersRes.ok) throw usersRes.status;
        const usersData = await usersRes.json();
        setUsers(usersData);

      } catch (e) {
        setError(`Error: ${e}`);
      }
    }
    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  const likePost = async (id) => {
    const post = posts.find((p) => p.id === id);
    const alreadyLiked = post.likedUsers?.includes(userId);

    const res = await fetch(`http://localhost:3000/posts/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        userId,
      }),
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
      users={users}  // Передаємо користувачів у Post
    />
  ));
}
