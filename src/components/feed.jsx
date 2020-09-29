import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchPosts,fetchCommentsByPost, fetchPriceChange } from "../actions";

class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  fetchData(){
    
  }
  // access posts through this.props.allPosts; display iteratively through .map()
  render() {
    // console.log(this.props.all);
    if (this.props.all.length !== 0) {
      return (
        <React.Fragment>
          {this.props.all.map((post) => {return( 
              <Post post={post} 
              //comments={this.props.comments[post.id]||[]} 
              //priceChange={this.props.priceChange[post.id]||0}
              showCommentsHandler={()=>{//this function is to handle fetching comments to show
                    this.props.fetchCommentsByPost(post.id);
                }}
              fetchPriceChange={()=>{
                this.props.fetchPriceChange(post.id);
              }}
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
  //comments: state.posts.comments || {},
  //priceChange: state.posts.priceChange||{}
});


export default withRouter(connect(mapStateToProps, { fetchPosts, fetchCommentsByPost, fetchPriceChange } )(Feed));
