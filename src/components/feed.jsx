import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchPosts } from "../actions";

class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  // access posts through this.props.allPosts; display iteratively through .map()
  render() {
    return (
      <React.Fragment>
        <Post />
        <Post />
        <Post />
        <Post />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  allPosts: state.posts.all || [],
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(Feed));
