import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./css files/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

class NavbarInstance extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Brand>
          <NavLink to="/">medius research</NavLink>
        </Navbar.Brand>
        <Nav className="navbar navbar-expand-sm justify-content-end">
          <NavLink className="btn btn-success ml-auto mr-1" to="/signin">
            Sign In
          </NavLink>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span classNameName="navbar-toggler-icon"></span>
          </button> */}
          <NavLink className="btn btn-success ml-auto mr-1" to="/signup">
            Get Started
          </NavLink>
          <NavLink className="btn btn-success ml-auto mr-1" to="/about">
            About
          </NavLink>
          <NavLink className="btn btn-success ml-auto mr-1" to="/communitypage">
            Community
          </NavLink>
        </Nav>
      </Navbar>
    );
  }
}
export default NavbarInstance;
