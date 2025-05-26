import React from "react";
import PostForm from "../../components/PostForm/PostForm";

const Formpage = () => {
  const handleSubmit = async ({ text, imageUrl }) => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: 11,
        text,
        imageUrl,
      }),
    });
  };
  return <PostForm onSubmit={handleSubmit} />;
};

export default Formpage;
