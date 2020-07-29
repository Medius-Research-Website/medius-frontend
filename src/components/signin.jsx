import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Signin extends Component {
  state = {};
  render() {
    return <NavLink to="/LandingPage">Sign Up</NavLink>;
  }
}

export default Signin;
