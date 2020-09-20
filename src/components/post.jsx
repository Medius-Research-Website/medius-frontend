import React,{useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "./css_files/post.scss";


// this is the small view of a post for the feed page
export default function Post({ post, comments, showCommentsHandler, fetchPriceChange, priceChange }) {
  const [showComment,setShowComment]=useState(false); //using hook to manage simple state
  const onCommentToggle = (e)=>{
    e.stopPropagation();
    setShowComment(prev=>!prev);
  }
  useEffect(()=>{
    fetchPriceChange();
  },[]);//equivalent with component did mount
  return (
    <div className="feed__post">
      <div className="feed__post__left">
        <p className="ticker">{post.ticker} </p>
        <p className="company">Company: {post.industry}</p>
        <p className="company">{priceChange>0?"+":""}{Math.round(priceChange*100)/100}% since post</p>
        <div className="bubble--sell">Sell/Buy</div>
      </div>
      <div className="feed__post__right">
        <Link to={`post/${post.id}`}  style={{ textDecoration: 'none' }}>
          <div className="feed__post__right__content">
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
        </Link>
        <div className="feed__post__right__comment">
          {showComment
            ?(//showing comments//using placeholder since not handle change author id --> author name yet
              <div>
            {comments.map((comment)=>
              <p className="feed__post__right__comment__content" key={comment.id}>
                <span className="feed__post__right__comment__author">{`${"Author placeholder"}`}</span> 
                {`: ${comment.text}`}</p>
              )}
              <p onClick={onCommentToggle} className="comment-toggle">hide comments</p>
            </div>)
            :(//display toggle when hiding
              <p onClick={(e)=>{showCommentsHandler();/*Call to Fetch for comments to show*/
                onCommentToggle(e);}} className="comment-toggle">view more comments</p>
          )}
        </div>
      </div>

    </div>
  );
}

