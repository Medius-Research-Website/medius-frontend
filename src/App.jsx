import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactGA from 'react-ga';
import home from "./components/home";
import about from "./components/about";
import Navbar from "./components/navbar";
import userprofile from "./components/userprofile";
import Signup from "./components/signup";
import Signin from "./components/signin";
import PrivateRoute from './components/privateroute';
import LandingPage from "./pages/landingPage";
import Community from "./pages/communityPage";
import "bootstrap/dist/css/bootstrap.min.css";
import singlepost from "./components/singlepost";

const trackingId = "UA-176041306-1"
ReactGA.initialize(trackingId);



function App() {
  return (
    <Router>
      <div>
        <Navbar />
          <Route exact path="/" component={home} />
          <Route exact path="/about" component={about} />
          <PrivateRoute exact path="/userprofile" component={userprofile} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/signin" component={Signin} />
          <Route exact path="/landingpage" component={LandingPage} />
          <Route exact path="/communitypage" component={Community} />
          <Route exact path="/posts/:postID" component={singlepost} />
      </div>
    </Router>
  );
}

export default App;
