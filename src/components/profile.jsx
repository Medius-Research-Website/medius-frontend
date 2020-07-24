import React, { Component } from "react";
import "./css files/profile.css";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div className="profile-box">
        <button className="close-button">x</button>
        <div>
          <span style={{ fontWeight: "bold" }}>Timothy Park</span>
        </div>
        <div className="occupation">
          <span>Student at Boston University</span>
        </div>
        <button className="button">Connect</button>
      </div>
    );
  }
}

export default Profile;
