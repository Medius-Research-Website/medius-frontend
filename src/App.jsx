import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from "./components/home";
import about from "./components/about";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path="/" component={home} />
        <Route exact path="/about" component={about} />
      </div>
    </Router>
  );
}

export default App;
