import React, { Component } from "react";
import { NavLink } from "react-router-dom"; //BrowserRouter, Link,
import { Button } from "react-bootstrap";
import Signin from './signin';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/home.css";
import "./css_files/signIn.css"


class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      // <div class="container full-height-grow">
      <div className="full-height-grow">  
        <header className="main-header">
          <div className="brand-logo-name">
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
            <Button type="button" className="btn-primary" onClick={this.showModal}>
              {" "}
              Sign up for our Beta launch! 
            </Button>
            <Signin show={this.state.show} onClose={this.showModal}/>
          </div>
        </div>

        {/* <div class="jumbotron jumbotron-fluid float-left"> */}
        <div className="float-left page2">
        <p id="access">Accesible</p>
        <div className="rcorners1">
          Investment information, data, and research completely free. No paywalls.
          </div>
        <br/>
        <p id="collaborate">Collaborative</p>
        <div className="rcorners3">Engage in a community built on reciprocity. Share information, make friends, build a following.</div>
        
        <p id="reliable">Reliable</p>
        <div className="rcorners2">A safe and reliable platform controlled for quality and consistency.</div>
        <br/>
        <img src="images/investment_ideas.png" alt="investment dashboard" />
          <div className="container">
          <br/>
          </div>
        </div>

        <footer className="footer">
          <div className="row">
              <div className="column">
                <br/>
                <br/>
                <b>medius</b>
              </div>

              <div className="column2">
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

              <div className="column2">
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
