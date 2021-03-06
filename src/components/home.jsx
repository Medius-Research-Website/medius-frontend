import React, { Component } from "react";
import { NavLink, Link} from "react-router-dom"; //BrowserRouter, Link,
import { Button } from "react-bootstrap";
import Signup from './signup';
import Signin from './signin';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/home.scss";
import DesktopImg from './css_files/images/desktop.png';
import FeedImg from './css_files/images/investment_ideas.png';
// import "./css_files/signUp.css"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: false,
      showSignin: false,
    };
  }

  showSignupModal = () => {
    this.setState({
      showSignup: !this.state.showSignup
    });
  };

  showSigninModal = () => {
    this.setState({
      showSignin: !this.state.showSignin
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
            <Button type="button" id="btn-signin" onClick={this.showSigninModal}>Sign In</Button>
            <Link to="/landingpage" id="mobile-btn-signIn">
              <Button type="button" id="noShowmobile" onClick={this.showSigninModal}>Sign In</Button>
            </Link>
            <Signin history={this.props.history} showSignin={this.state.showSignin} onClose={this.showSigninModal}/>
        </header>

        <div className="page1">
          <div className="monitor"> <img src={DesktopImg} alt="tv logo" /></div>
          <div className="container"> 
            <h2>
              Bringing <span>Wall St.</span>
              <br />
              to <span>University Ave.</span>
            </h2>
                An open forum for sharing high quality investment ideas, stock picks, 
                and research from top universities, all for free.
                <br />
                <br />
                <Button type="button" className="btn-primary signUp" onClick={this.showSignupModal}>
                  Sign up for our Beta launch! 
                </Button>
                <Link to="/landingpage" id="mobile-signUp">
                  <Button type="button" className="btn-primary" onClick={this.showSignupModal}>
                    Sign up for our Beta launch! 
                  </Button>
                </Link>
              <Signup history={this.props.history} showSignup={this.state.showSignup} onClose={this.showSignupModal} />
          </div>
        </div>

        <div className="page2">
          <p id="mobile">Our Core Pillars</p>
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

export default Home;
