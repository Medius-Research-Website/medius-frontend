import React, { Component } from "react";
import Feed from "../components/feed";
import Navbar from "../components/navbar";
import "../components/css_files/landingpage.scss";
class LandingPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar  />
        <div className="landing-page">
          <div className="profile--bubble"/>
          <div className="feed">
            <Feed />
          </div>
          <div className="trending"/>
        </div>
        
      </React.Fragment>
    );
  }
}

export default LandingPage;
