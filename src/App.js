import React from "react";
import "./App.css";
import LandingPage from "./components/landingPage";
import NavbarInstance from "./components/navbar";

function App() {
  return (
    <React.Fragment>
      <NavbarInstance />
      <div className="App">
        <LandingPage />
      </div>
    </React.Fragment>
  );
}

export default App;
