import React, { Component } from "react";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/about.css";

class about extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div class="container full-height-grow">
          <header class="main-header">
            <div class="brand-logo-name">medius research</div>
          </header>
          ABOUT PAGE
          <div className="about-box">Hi, we're medius research.</div>
        </div>
      </React.Fragment>
    );
  }
}

export default about;
