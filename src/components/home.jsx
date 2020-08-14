import React, { Component } from "react";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
import { Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/home.css";


class home extends Component {
  render() {
    return (
      // <div class="container full-height-grow">
      <div class="full-height-grow">  
        <header class="main-header">
          <div class="brand-logo-name">
            <NavLink to=""> medius </NavLink>
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

        <div className="float-left page1">
          <div className="container"> 
            <div className="monitor">
            </div>
          <h2>
            A modern
              <br/>
              <h2_1>finance community</h2_1>
              <br/>
              built on collaboration
          </h2>
              An open forum for sharing high quality investment ideas, stock picks,
              <br/>
              and research from top universities, all for free.
              <br />
              <br />
              <BrowserRouter>
            <Link to="/home">
              <Button type="button" className="btn-primary">
                {" "}
                Join the Waitlist 
              </Button>
            </Link>
          </BrowserRouter>
          </div>
        </div>

        {/* <div class="jumbotron jumbotron-fluid float-left"> */}
        <div class="float-left page2">
        <div className="rcorners1">Investment information, data, and research completely free. No paywalls.</div>
        <br/>
        <div className="rcorners3">Engage in a community built on reciprocity. Share information, make friends, build a following.</div>

        <div className="rcorners2">A safe and reliable platform controlled for quality and consistency.</div>
        <br/>
          <div className="container">
          <br/>
          </div>
        </div>

        <footer className="footer">
          <div class="row">
              <div class="column">
                <br/>
                <br/>
                <b>medius</b>
              </div>

              <div class="column2">
                <b>connect</b>
                <br/>
                <br/>
                twitter
                <br/>
                facebook
                <br/>
                linkedin
                <br/>
                facebook
              </div>

              <div class="column2">
              <b>company</b>
                  <br/>
                  <br/>
                  contact us
                  <br/>
                  about
                  <br/>
                  terms of service
                  <br/>
                  privacy policy
              </div>
            </div>
        </footer>
      </div>
    );
  }
}

export default home;
