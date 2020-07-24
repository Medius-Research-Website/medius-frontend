import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./customnavbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

class NavbarInstance extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Brand>
          <Link to="/">medius research</Link>
        </Navbar.Brand>
        <Nav class="navbar navbar-expand-sm justify-content-end">
          <button class="btn btn-success ml-auto mr-1">Sign In</button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <button class="btn btn-success ml-auto mr-1">Get Started</button>
        </Nav>
      </Navbar>
    );
  }
}
export default NavbarInstance;
