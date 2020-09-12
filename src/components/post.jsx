import React, { Component } from 'react';
// import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class post extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  render() {
    console.log(this.props.selectedPost);
    return (
      <p>{this.props.selectedPost.ticker}</p>
    );
  };
};

function mapStateToProps(reduxState) {
  return {
    selectedPost: reduxState.posts.current,
  };
}

export default connect(mapStateToProps, { fetchPost })(post);