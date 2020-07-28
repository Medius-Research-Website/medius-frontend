import React, { Component } from "react";
import Post from "./post";

class Feed extends Component {
  state = {};

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

export default Feed;
