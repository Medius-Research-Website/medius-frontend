import React, { Component } from "react";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css files/home.css";

class home extends Component {
  render() {
    return (
      <div class="container full-height-grow">
        <header class="main-header">
          <div class="brand-logo-name">
            <NavLink to=""> medius research </NavLink>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <NavLink to="/signin"> Sign in </NavLink>
              </li>
              <li>
                <NavLink to="/signup"> Get Started </NavLink>
              </li>
              {/* <li>
                <Link to="/communityPage"> Community </Link>
              </li> */}
            </ul>
          </nav>
        </header>
        <Jumbotron className="float-right">
          <h2>
            Bringing <span>Wall St.</span>
            <br />
            to <span1>University Ave.</span1>
          </h2>
          An open forum for sharing high quality investment ideas, stock picks,
          and research from top universities, all for free.
          <br />
          <br />
          <BrowserRouter>
            <Link to="/home">
              <Button type="button" className="btn-primary">
                {" "}
                Get Started
              </Button>
            </Link>
          </BrowserRouter>
        </Jumbotron>
      </div>
    );
  }
}

export default home;
