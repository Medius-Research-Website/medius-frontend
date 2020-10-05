import React, { Component } from "react";
import "./css_files/profile.scss";
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Navbar from "./navbar";
import { Button } from 'react-bootstrap';
// import { TransferWithinAStation } from "@material-ui/icons";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userID);                 // fetching selectedUser
    this.props.fetchCurrentUser(localStorage.getItem('userID'));          // fetching currentUser
  }


  // access user through this.props.selectedUser
  // should check if currentUser's username is same as selectedUser's username to determine
  // if the person is viewing their own page. if it's their page add some kind of edit button
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

export default connect(mapStateToProps, { fetchUser })(Profile);
