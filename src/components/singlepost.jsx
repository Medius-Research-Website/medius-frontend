import React, { Component } from 'react';
// import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class singlepost extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {

  }
  render() {
    console.log(this.props)
    return (
      <hr/>
    );
  };
};

function mapStateToProps(reduxState) {
  return {
    selectedPost: reduxState.auth.selectedPost,
  };
}

export default connect(mapStateToProps, { fetchPost })(singlepost);