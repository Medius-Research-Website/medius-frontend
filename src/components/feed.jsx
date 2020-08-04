import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchPosts } from "../actions";


class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  // access posts through this.props.allPosts; display iteratively through .map()
  render() {
    if (this.props.all !== []) {
      return (
        <React.Fragment>
          {this.props.all.map((post) => (
            <Link to={`posts/${post.id}`} style={{ textDecoration: 'none' }}>
              <Post post={post} />
            </Link>
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
});


export default withRouter(connect(mapStateToProps, { fetchPosts } )(Feed));
