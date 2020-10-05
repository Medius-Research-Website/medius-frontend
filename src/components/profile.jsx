import React, { Component } from "react";
import "./css_files/profile.scss";
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Navbar from "./navbar";
import { Button } from 'react-bootstrap';
import {followUser, unfollowUser} from '../actions'
// import { TransferWithinAStation } from "@material-ui/icons";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userID);
  }

  followUser = () => {
    this.props.followUser(this.props.currentUser.id, this.props.selectedUser.id)
  }

  // not supported in the backend quite yet
  unfollowUser = () => {
    this.props.unfollowUser(this.props.currentUser.id, this.props.selectedUser.id)
  }


  // access user through this.props.selectedUser
  // should check if currentUser's username is same as selectedUser's username to determine
  // if the person is viewing their own page. if it's there page add some kind of edit button
  // to change their bio
  render() {
    return (
      <div>
        <Navbar />
        <div className="profile-box">
          <button className="close-button">x</button>
          <div>
            {(this.props.selectedUser === this.props.currentUser) ? <Button>Edit</Button> : <></>}
            <p>Timothy Park</p>
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
    selectedUser: reduxState.auth.selectedUser,       // this is the person whose profile we're viewing
    currentUser: reduxState.auth.user,                // this is the person who's signed in
  };
}

export default connect(mapStateToProps, { fetchUser, followUser, unfollowUser })(Profile);
