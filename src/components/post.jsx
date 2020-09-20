import React,{useState} from "react";

import "./css_files/post.scss";


// this is the small view of a post for the feed page
export default function Post({ post, comments, showCommentsHandler }) {
  const [showComment,setShowComment]=useState(false);
  const onCommentToggle = (e)=>{
    e.stopPropagation();
    setShowComment(prev=>!prev);
  }
  return (
    <div className="feed__post">
      <div className="feed__post__left">
        <p className="ticker">{post.ticker} </p>
        <p className="company">Company: {post.industry}</p>
        <div className="bubble--sell">Sell/Buy</div>
      </div>
      
      <div className="feed__post__right">
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
        <div className="feed__post__right__comment">
          {showComment
            ?(<div>
            {comments.map((comment,idx)=><p key={idx}>{comment.text}</p>)}
              <p onClick={onCommentToggle} className="comment-toggle">hide comments</p>
            </div>)
            :(
              <p onClick={(e)=>{showCommentsHandler();/*Call to Fetch for comments if this is the first time show*/
                onCommentToggle(e);}} className="comment-toggle">view more comments</p>
          )}
        </div>
      </div>

    </div>
  );
}
