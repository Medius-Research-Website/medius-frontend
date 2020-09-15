import React from "react";

import "./css_files/post.scss";


// this is the small view of a post for the feed page
export default function Post({ post }) {
  return (
    <div className="feed__post">
      <div className="feed__post__left">
        <p className="ticker">{post.ticker} </p>
        <p className="company">Company: {post.industry}</p>
        <div className="bubble--sell">Sell/Buy</div>
      </div>
      
      <div className="feed__post__right">
        <div className="interaction-stat">
          Like/Comment placeholder
        </div>
        <div className="content">
          <p className="post-title">
            {post.idea}
          </p>
          <p className="info">
            {post.insight}
          </p>
        </div>
      </div>

    </div>
  );
}
