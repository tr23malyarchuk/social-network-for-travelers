import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import HeartButton from "../HeartButton/HeartButton";
import Comment from "../Comment/Comment";
import "./Post.css";

function Post({ post, onAddComment, userId, likePost, users }) {
  const [zoomed, setZoomed] = useState(false);
  const user = users.find((u) => u.id === post.userId);

  const imageUrl = post.imageUrl ? `http://localhost:3000/uploads/${post.imageUrl}` : null;

  return (
    <>
      <div className="post">
        <p>
          <FaUserCircle style={{ fontSize: 24, marginRight: 8 }} />
          {user ? user.nickname : "Unknown"}
        </p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="post"
            className="post-image"
            onClick={() => setZoomed(true)}
            style={{ cursor: "pointer" }}
          />
        )}
        <p>{post.text}</p>
        <HeartButton
          liked={post.likedUsers?.includes(userId)}
          likesCount={post.likes}
          onClick={() => likePost(post.id)}
        />
        <Comment comments={post.comments || []} onAdd={onAddComment} />
      </div>

      {zoomed && (
        <div className="image-overlay" onClick={() => setZoomed(false)}>
          <img src={imageUrl} alt="zoomed" className="zoomed-image" />
        </div>
      )}
    </>
  );
}

export default Post;
