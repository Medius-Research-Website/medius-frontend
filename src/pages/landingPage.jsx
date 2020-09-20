import React, { Component } from "react";
import Feed from "../components/feed";
import Navbar from "../components/navbar";
import "../components/css_files/landingpage.scss";
import FeedHead from "../components/feedhead";
class LandingPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar  />
        <div className="landing-page">
          <div className="profile--bubble"/>
          <div className="feed">
            <FeedHead/>
            <Feed />
          </div>
          <div className="trending"/>
        </div>
        
      </React.Fragment>
    );
  }
}

export default LandingPage;
