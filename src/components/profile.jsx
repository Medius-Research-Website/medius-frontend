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
          <p style={{ fontWeight: "bold" }}>Timothy Park</p>
        </div>
        <div className="occupation">
          <p>Student at Boston University</p>
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
