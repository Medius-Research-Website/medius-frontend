import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from "./components/home";
import about from "./components/about";
// import Navbar from "./components/navbar";
import userprofile from "./components/userprofile";
import Signup from "./components/signup";
import Signin from "./components/signin";
import PrivateRoute from './components/privateroute';
import LandingPage from "./pages/landingPage";
import Community from "./pages/communityPage";
import "bootstrap/dist/css/bootstrap.min.css";

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Route exact path="/" component={home} />
        <Route exact path="/about" component={about} />
        <PrivateRoute exact path="/userprofile" component={userprofile} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/landingpage" component={LandingPage} />
        <Route exact path="/communitypage" component={Community} />
        <Route component={FallBack} />
      </div>
    </Router>
  );
}

export default App;
