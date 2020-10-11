import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchPosts,fetchCommentsByPost, fetchPriceChange, likePost } from "../actions";

class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  
  fetchData(){
    
  }

  // access posts through this.props.allPosts; display iteratively through .map()
  render() {
    console.log(this.props.userId);
    // console.log(this.props.all);
    if (this.props.all.length !== 0) {
      return (
        <React.Fragment>
          {this.props.all.map((post) => {return( 
              <Post post={post} 
              fetchComments={(id)=>{//this function is to handle fetching comments to show
                    this.props.fetchCommentsByPost(id);
                }}
              fetchPriceChange={(id)=>{
                this.props.fetchPriceChange(id);
              }}
              likePost={(postId,userId)=>{
                this.props.likePost(postId,userId);
              }}
              userId={this.props.userId}
              key={post.id}/>
          )})}
        </React.Fragment>
      );
    }
    else {
      return (
        <div>
          No posts to see yet!
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  all: state.posts.all || [],
  userId: (state.auth.authenticated)?(state.auth.user.id):("0")
});


export default withRouter(connect(mapStateToProps, { fetchPosts, fetchCommentsByPost, fetchPriceChange,likePost } )(Feed));
