import React, { Component } from "react";
import NavbarInstance from "../components/navbar";
import Feed from "../components/feed";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarInstance />
        <Feed />
      </React.Fragment>
    );
  }
}

export default LandingPage;
