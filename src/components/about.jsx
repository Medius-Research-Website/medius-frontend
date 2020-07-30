import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css files/about.css";

class about extends Component {
  render() {
    return (
      <div class="container full-height-grow">
        <header class= "main-header"> 
          <div class= "brand-logo-name">medius research</div>
        </header>
        ABOUT PAGE
        <div className="about-box">
        Hi, we're medius research.
        </div>
      </div>
    );
  }
}

export default about;
