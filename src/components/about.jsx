import React, { Component } from "react";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/about.scss";

class about extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="container full-height-grow">
          <div className="about-box">Hi, we're medius research.</div>
        </div>
      </React.Fragment>
    );
  }
}

export default about;
