import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";

const Post = () => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="kimyb" />
        <h3>Dummy name</h3>
      </div>

      <img
        className="post__image"
        src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=400&q=80"
      />
      <h4 className="post__text">
        <strong>dummy username:</strong> dummy caption
      </h4>
    </div>
  );
};

export default Post;
