import React, { Component } from "react";
import { NavLink } from "react-router-dom"; //BrowserRouter, Link,
import { Button } from "react-bootstrap";
// import Signup from './signup';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/home.css";
import DesktopImg from './css_files/images/desktop.png';
import FeedImg from './css_files/images/screen.png';
// import "./css_files/signUp.css"


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
    console.log("rendering home page");
    return (
      // <div class="container full-height-grow">
      <div className="full-height-grow">  
        <header className="main-header">
          <div className="brand-logo-name">
            <NavLink to=""> medius </NavLink>
          </div>
          <nav className="main-nav">
            <ul>
              {/*<li>
                <NavLink to="/signin"> Sign in </NavLink>
              </li>
              <li>
                <NavLink to="/signup"> Get Started </NavLink>
              </li>
              <li>
                <Link to="/communityPage"> Community </Link>
              </li> */}
            </ul>
          </nav>
        </header>

        <div className="page1">
          <div className="monitor"> <img src={DesktopImg} alt="tv logo" /></div>
          <div className="container"> 
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
              <a href="https://mediusresearch.typeform.com/to/sHXy1QbE">
                <Button type="button" className="btn-primary" onClick={this.showModal}>
                  {" "}
                  Sign up for our Beta launch! 
                </Button>
              </a>
              {/*<Signup show={this.state.show} onClose={this.showModal}/>*/}
          </div>
        </div>

        <div className="page2">
          <div id="bubbles">
            <div id="horiz">
              <div id="access"> 
                <p >Accessible.</p>
                <div className="rcorners1">
                  Investment information, data, and research completely free. No paywalls.
                </div>
              </div>

              <div id="collaborate">
                <p>Collaborative.</p>
                <div className="rcorners3">Engage in a community built on reciprocity. Share information, make friends, build a following.</div>
              </div>
            </div>
            
            <div id="reliable">
              <p >Reliable.</p>
              <div className="rcorners2">A safe and reliable platform controlled for quality and consistency.</div>
            </div>
          </div>

          <img src={FeedImg} alt="feed-page" />

        </div>

        <footer className="footer">
            <div className="column">
              <br/>
              <br/>
              <b>medius</b>
            </div>

            <div className="row">
              <div className="column2">
                <b>connect</b>
                <br/>
                <br/>
                <a href="https://mobile.twitter.com/mediusresearch">twitter</a>
                <br/>
                <a href="https://www.instagram.com/mediusresearch/">instagram</a>
                <br/>
                <a href="https://www.linkedin.com/company/medius-research">linkedin</a>
                <br/>
                <a href="https://www.reddit.com/r/Medius/">reddit</a>
              </div>

              <div className="column2">
              <b>company</b>
                  <br/>
                  <br/>
                  <a href="mailto:mediusresearch@gmail.com">contact us</a>
                  <br/>
                  {/*about
                  <br/>
                  terms of service
                  <br/>
                  privacy policy*/}
              </div>
            </div>
        </footer>
      </div>
    );
  }
}

export default home;
