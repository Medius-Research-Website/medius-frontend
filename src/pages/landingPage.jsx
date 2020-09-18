import React, { Component } from "react";
import Feed from "../components/feed";
import Navbar from "../components/navbar";

class LandingPage extends Component {
  state = {};

  componentDidMount() {
    console.log('launching landing page')
  }

  render() {
    console.log("rendering landing page");
    return (
      <React.Fragment>
        <Navbar />
        <Feed />
      </React.Fragment>
    );
  }
}

export default LandingPage;
