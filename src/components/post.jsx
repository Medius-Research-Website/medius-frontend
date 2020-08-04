import React from "react";
import "./css files/post.css";

export default function Post({ post }) {
  return (
        <div className="main">
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
              a title? {post.idea}
            </div>
            <p>
              {post.insight}
              Nikola Corporation designs and manufactures electric and
              hydrogen-electric vehicles. They also design and develop hydrogen
              filling stations. After Nikola went public earlier this month
              through a reverse merger with VectorIQ, the stock has skyrocketed,
              and Nikola is now worth $23.78 billion. With Nikola trading only
              $1 billion away from the current value of Ford and not expecting
              revenue until at least late 2021, I feel everyone can agree this
              company is overvalued.
            </p>
            <p className="read-more">
              <button>Read More</button>
            </p>
          </div>
        </div>
  );
}
