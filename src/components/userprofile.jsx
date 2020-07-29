import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css files/userprofile.css";

class userprofile extends Component {
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

export default userprofile;
