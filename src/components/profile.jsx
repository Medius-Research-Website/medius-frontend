import React, { Component } from "react";
import "./css_files/profile.scss";
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Navbar from "./navbar";

class Profile extends Component {
  componentDidMount() {
  
  }

  // access user through this.props.selectedUser
  render() {
    return (
      <div>
        <Navbar />
        <div className="profile-box">
          <button className="close-button">x</button>
          <div>
            <p style={{ fontWeight: "bold" }}>Timothy Park</p>
          </div>
          <div className="occupation">
            <p>Student at Boston University</p>
          </div>
          <button className="button">Connect</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    selectedUser: reduxState.auth.selectedUser,
  };
}

export default connect(mapStateToProps, { fetchUser })(Profile);
