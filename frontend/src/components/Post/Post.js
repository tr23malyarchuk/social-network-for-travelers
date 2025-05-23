import React, { useState } from "react";
import HeartButton from "../HeartButton/HeartButton";
import "./Post.css";
import Comment from "../Comment/Comment";

function Post({ post, onLike, onAddComment, userId, likePost }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div className="post">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="post"
            className="post-image"
            onClick={() => setZoomed(true)}
            style={{ cursor: "pointer" }}
          />
        )}
        <p className="playpen-sans-post-text">{post.text}</p>

        <HeartButton
          liked={post.likedUsers?.includes(userId)}
          likesCount={post.likes}
          onClick={() => likePost(post.id)}
        />

        <Comment comments={post.comments || []} onAdd={onAddComment} />
      </div>

      {zoomed && (
        <div className="image-overlay" onClick={() => setZoomed(false)}>
          <img src={post.imageUrl} alt="zoomed" className="zoomed-image" />
        </div>
      )}
    </>
  );
}

export default Post;
