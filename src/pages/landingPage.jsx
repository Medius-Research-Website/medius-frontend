import React, { Component } from "react";
import Feed from "../components/feed";
import Navbar from "../components/navbar";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Feed />
      </React.Fragment>
    );
  }
}

export default LandingPage;
