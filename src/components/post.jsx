import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import "./css_files/post.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons'

// this is the small view of a post for the feed page
export default function Post({ post,  fetchComments, fetchPriceChange, likePost }) {
  const [showComment,setShowComment]=useState(false); //using hook to manage simple state
  const [liked,setLike]=useState(false);//need to handle if the current user liked this post or not
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
    fetchComments(post.id);
  },[fetchComments,post])

  const onLiked = (e)=>{
    setLike(prev=>!prev);
    likePost(post.id);
  }

  return (
    // console.log(comments),
    <div className="feed__post">
      <div className="feed__post__right">
        <div className="feed__post__right__content">
          <div className="interaction-stat">
            <div className={`line ${liked?"liked":null}`}>
              <span>{((post.likes?.length)?(post.likes.length):0) + (liked?1:0)/*handle undefine*/} 
              </span>
              <FontAwesomeIcon onClick={onLiked} icon={faThumbsUp} className="icon"/>
            </div>
            <div className="line">
              <span>{comments.length?comments.length:0}</span>
              <FontAwesomeIcon onClick={onCommentToggle} icon={faCommentDots} className="icon"/>
            </div>
          </div>
          <Link to={`posts/${post.id}`}  style={{ textDecoration: 'none' }}>
            <div className="content">
              <p className="post-title">
                {post.idea}
              </p>
              <p className="info">
                {post.insight}
              </p>
            </div>
          </Link>
        </div>
      
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
              <p onClick={onCommentToggle} className="comment-toggle">view more comments</p>
          )}
        </div>
      </div>
      <div className="feed__post__left">
        {
          (post.type==="idea")
          ?(<IdeaBubble post={post} fetchPriceChange={fetchPriceChange}/>)
          :((post.type==="report")
            ?(<ReportBubble post={post}/>)
            :(<ArticleBubble post={post}/>))
        }
      </div>
    </div>
  );
}

const IdeaBubble = ({post,fetchPriceChange}) =>{
  const priceChange = useSelector(state=>{
    if (post.id in state.posts.priceChange)
      return state.posts.priceChange[post.id];
      else return 0;
  });

  useEffect(()=>{
    fetchPriceChange(post.id);
  },[fetchPriceChange,post]);//equivalent with component did mount; only call when post is a idea
  
  return(
    <React.Fragment>
      <p className="ticker">{post.ticker} </p>
      <p className={`price-change price-change--${(priceChange>0)?"positive":((priceChange<0)?"negative":null)}`}>{priceChange>0?"+":""}{Math.round(priceChange*100)/100}% since post</p>
      { post.sell ? ( <div className="bubble--sell">Sell</div> ) : ( <div className="bubble--buy">Buy</div> ) }
      <p className="username">@{post.username}</p>
      <p id="date">{new Date(post.createdAt).toLocaleDateString()}</p>
    </React.Fragment>
  )
};

const ReportBubble = ({post})=>{
  return(
    <React.Fragment>
      <p className="report">Report</p>
      <p className="username">@{post.username}</p>
      <p id="date">{new Date(post.createdAt).toLocaleDateString()}</p>
      {/*preview file here*/}
    </React.Fragment>
  )
}

const ArticleBubble = ({post})=>{
  return(
    <React.Fragment>
      <p className="article">Article</p>
      <p className="username">@{post.username}</p>
      <p id="date">{new Date(post.createdAt).toLocaleDateString()}</p>
    </React.Fragment>
  )
}