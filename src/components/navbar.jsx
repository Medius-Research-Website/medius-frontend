import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { signoutUser } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css_files/navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

class NavbarInstance extends Component {
  constructor(props) {
    super(props);

    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  onClickSignOut() {
    this.props.signoutUser(this.props.history);
  }

  render() {
    if (!this.props.authenticated){
      return (
        <Navbar default collapseOnSelect>
          <Navbar.Brand>
            <NavLink to="landingpage">medius research</NavLink>
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
    else {
      return (
        <Navbar default collapseOnSelect>
          <Navbar.Brand>
            <NavLink to="landingpage">medius research</NavLink>
          </Navbar.Brand>
          <Nav className="navbar navbar-expand-sm justify-content-end">
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span classNameName="navbar-toggler-icon"></span>
            </button> */}
            <NavLink className="btn btn-success ml-auto mr-1" to="/about">
              About
            </NavLink>
            <NavLink className="btn btn-success ml-auto mr-1" to="/communitypage">
              Community
            </NavLink>
            <div className="btn btn-success ml-auto mr-1" onClick={this.onClickSignOut}>
              Sign Out
            </div>
          </Nav>
        </Navbar>
      );
    } 
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(NavbarInstance));

