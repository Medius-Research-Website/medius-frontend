import React, { Component } from "react";
import "./css files/profile.css";
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

// need to discuss implementation of component
class Profile extends Component {
  componentDidMount() {
    // need to confirm where userID is coming from
    // this.props.fetchPost(this.props.match.params.userID);
  }

  // access user through this.props.selectedUser
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

function mapStateToProps(reduxState) {
  return {
    selectedUser: reduxState.auth.selectedUser,
  };
}

export default connect(mapStateToProps, { fetchUser })(Profile);
