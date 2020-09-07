import React from "react";
import "./css_files/post.scss";

export default function Post({ post }) {
  return (
        <div className="main">
          <div>
            
          </div>
          <div className="sidebar">
            <div className="ticker">Ticker: {post.ticker} </div>
            <div className="percentage-change">100%</div>
            <button className="like">
              <i className="arrow-up up" aria-hidden="true"></i>
            </button>
            <button className="dislike">
              <i className="arrow-down down" aria-hidden="true"></i>
            </button>
            <div className="date">Date</div>
          </div>
          <div className="information">
            <div className="title">
              {post.idea}
            </div>
            <p>
              {post.insight}
            </p>
          </div>
        </div>
  );
}
