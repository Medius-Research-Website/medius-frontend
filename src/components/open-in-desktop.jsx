import React, { Component } from "react";
import "./css_files/open-in-desktop.scss";
import logo from './css_files/images/desktop.png';

class Desktop extends Component {
  render() {
    return (
      <div className="desktop">
        <p>MEDIUS RESEARCH</p>
        <img src={logo} alt="logo" />
        <p>This page is best viewed in desktop. Check us out on your computer!</p>
      </div>
    );
  }
}

export default Desktop;