import React, { Component } from "react";
import Profiles from "../components/profiles";
import NavbarInstance from "../components/navbar";
import * as ReactBootstrap from "react-bootstrap";
import "./communityPage.css";

const { DropdownButton } = ReactBootstrap;

class Community extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarInstance />
        <div className="title">Our Community</div>
        <button className="button-community">People</button>
        <button className="button-community">Organizations</button>
        <button className="button-community">My Account</button>
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort By"
          bsPrefix="dropdown-button"
        ></DropdownButton>
        <Profiles />
      </React.Fragment>
    );
  }
}

export default Community;
