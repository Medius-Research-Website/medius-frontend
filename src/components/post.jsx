import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "./css_files/post.scss";
import { useSelector } from "react-redux";

// this is the small view of a post for the feed page
export default function Post({ post,  showCommentsHandler, fetchPriceChange }) {
  const [showComment,setShowComment]=useState(false); //using hook to manage simple state
  
  const priceChange = useSelector(state=>{
    if (post.id in state.posts.priceChange)
      return state.posts.priceChange[post.id];
      else return 0;
  });

  const comments = useSelector(state=>{
    if (post.id in state.posts.comments)
      return state.posts.comments[post.id];
      else return [];
  });

  const onCommentToggle = (e)=>{
    e.stopPropagation();
    setShowComment(prev=>!prev);
  }

  useEffect(()=>{
    fetchPriceChange();
  },[fetchPriceChange]);//equivalent with component did mount

  return (
    // console.log(comments),
    <div className="feed__post">
      <div className="feed__post__right">
        <Link to={`posts/${post.id}`}  style={{ textDecoration: 'none' }}>
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
                <Link to={`/users/${comment.authorID}`} ><span className="feed__post__right__comment__author">{`${comment.author}`}</span> </Link>
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
      <div className="feed__post__left">
        <p className="ticker">{post.ticker} </p>
        <p className="company">Industry: {post.industry}</p>
        <p className={`price-change price-change--${(priceChange>0)?"positive":((priceChange<0)?"negative":null)}`}>{priceChange>0?"+":""}{Math.round(priceChange*100)/100}% since post</p>
        { post.sell ? ( <div className="bubble--sell">Sell</div> ) : ( <div className="bubble--buy">Buy</div> ) }
      </div>
    </div>
  );
}

