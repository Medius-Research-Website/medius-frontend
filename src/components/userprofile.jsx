import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/userprofile.css";
import { connect } from 'react-redux';
import { updateUser } from '../actions';

class userprofile extends Component {
  // needs method to call updateUser action

  // access through this.props.user
  render() {
    return (
      <div>
        PROFILE
        <div className="profile-box">
          <div class="profile-photo"></div>
          <div class="profile-info">
            <h1>Tim Cui</h1>
            <p>tim_medius</p>
            <p>
              Economics enthusiast from Dartmouth. I also like building fintech
              startups.
            </p>
          </div>
        </div>
        <div className="user-posts-box">
          <h1 className="box-title">Posts</h1>
          <div className="posts">post1</div>
          <div className="posts">post2</div>
        </div>
        <div className="stats-box">stats</div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    user: reduxState.auth.user,
  };
}

export default connect(mapStateToProps, { updateUser })(userprofile);
