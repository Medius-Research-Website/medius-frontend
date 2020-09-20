import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchPosts,fetchComment } from "../actions";

class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  // access posts through this.props.allPosts; display iteratively through .map()
  render() {
    
    if (this.props.all.length !== 0) {
      return (
        <React.Fragment>
          {this.props.all.map((post) => ( 
              <Post post={post} 
              comments={this.props.comments[post.id]||[]} 
              showCommentsHandler={()=>{//this function is to handle fetching comments to show
                    this.props.fetchComment(post.id);
                }}
              key={post.id}/>
          ))}
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
  comments: state.posts.comments || {}
});


export default withRouter(connect(mapStateToProps, { fetchPosts, fetchComment } )(Feed));
