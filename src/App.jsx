import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import ReactGA from 'react-ga';
import Home from "./components/home";
import history from './history'
import about from "./components/about";
// import PrivateRoute from './components/privateroute';
import LandingPage from "./pages/landingPage";
import Community from "./pages/communityPage";
import "bootstrap/dist/css/bootstrap.min.css";
import singlepost from "./components/singlepost";
import profile from "./components/profile";
import PrivateRoute from "./components/privateroute";

const trackingId = "UA-176041306-1"
ReactGA.initialize(trackingId);

function App() {
  return (
    <Router history={history}>
      <div>
        {/* <Navbar /> */}
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/about" component={about} />
          <PrivateRoute exact path="/landingpage" component={LandingPage}/>
          <PrivateRoute exact path="/communitypage" component={Community} />
          <PrivateRoute exact path="/posts/:postID" component={singlepost} />
          <PrivateRoute exact path="/users/:userID" component={profile} />
      </div>
    </Router>
  );
}

export default App;
