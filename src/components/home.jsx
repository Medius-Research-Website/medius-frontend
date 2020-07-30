import React, { Component, Fragment } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css files/home.css";

class home extends Component {
  render() {
    return (
      <div class="container full-height-grow">
        <header class= "main-header"> 
        <div class= "brand-logo-name"><a href=""> medius research </a></div>
            <nav className="main-nav">
                <ul>
                    <li><a href=""> Sign in </a></li>
                    <li><a href=""> Get Started </a></li>
                    <li><Link to="/communityPage"> Community  </Link></li>
                </ul>
            </nav>
        </header>
        <Jumbotron className="float-right">
            <h2>
              Bringing <span>Wall St.</span>
              <br/>
              to <span1>University Ave.</span1>
            </h2>
              An open forum for sharing high quality investment ideas, stock picks,
              and research from top universities, all for free.
            <br/>
            <br/>
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
