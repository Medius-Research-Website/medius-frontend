import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { signoutUser } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css_files/navbar.scss";
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
    if (this.props.authenticated){
      return (
        <Navbar default collapseOnSelect>
          <Navbar.Brand>
            <NavLink id="title" to="/landingpage">medius</NavLink>
          </Navbar.Brand>
          <Nav className="navbar navbar-expand-sm justify-content-end">
            {/* <NavLink activeClassName="selected" className="btn ml-auto mr-1 navButtons signInBorder" to="/signin">
              Sign In
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span classNameName="navbar-toggler-icon"></span>
            </button>
            <NavLink activeClassName="selected" className="btn ml-auto mr-1 navButtons" to="/signup">
              Get Started
            </NavLink>
            <NavLink activeClassName="selected" className="btn ml-auto mr-1 navButtons" to="/about">
              About
            </NavLink>
            <NavLink activeClassName="selected" className="btn ml-auto mr-1 navButtons" to="/communitypage">
              Community
            </NavLink>*/}
          </Nav>
        </Navbar>
      );
    }
    else {
      return (
        <Navbar default collapseOnSelect>
          <Navbar.Brand>
            <NavLink id="title" to="landingpage">medius</NavLink>
          </Navbar.Brand>
          <Nav className="navbar navbar-expand-sm justify-content-end">
            {/* <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span classNameName="navbar-toggler-icon"></span>
            </button> 
            <NavLink activeClassName="selected" className="btn ml-auto mr-1 navButtons" to="/about">
              About
            </NavLink>
            <NavLink activeClassName="selected" className="btn ml-auto mr-1 navButtons" to="/communitypage">
              Community
            </NavLink>*/}
            <div activeClassName="selected" className="btn ml-auto mr-1 navButtons signInBorder" onClick={this.onClickSignOut}>
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

