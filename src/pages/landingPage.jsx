import React, { Component } from "react";
import Feed from "../components/feed";
import Navbar from "../components/navbar";
import "../components/css_files/landingpage.scss";
import FeedHead from "../components/feedhead";
import NewPostModal from "../components/newpostmodal";
import UserBubble from '../components/userBubble';

class LandingPage extends Component {
  state = {};

  componentDidMount() {
    // console.log('launching landing page')
  }

  render() {
    // console.log("rendering landing page");
    return (
      <React.Fragment>
        <Navbar  />
        <NewPostModal/>
        <div className="landing-page">
          <UserBubble />
          <div className="feed">
            <FeedHead/>
            <Feed />
          </div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default LandingPage;
