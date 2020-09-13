import React from "react";

import "./css_files/post.scss";

export default function Post({ post }) {
  return (
    <div className="feed__post">
      <div className="feed__post__left">
        <p>{post.ticker} </p>
        <p>Company: {post.industry}</p>
        <div className="bubble--sell">Sell/Buy</div>
      </div>
      
      <div className="feed__post__right">
        <h5 className="title">
          {post.idea}
        </h5>
        <p>
        a
          {post.insight}
        </p>
      </div>

    </div>
  );
}
