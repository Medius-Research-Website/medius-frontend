import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";

const { Navbar, Nav, Form, FormControl, Button } = ReactBootstrap;

class NavbarInstance extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Medius Research</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#community">Community</Nav.Link>
          <Nav.Link href="#our-story">Our Story</Nav.Link>
          <Button variant="primary">Sign In</Button>{" "}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarInstance;
