import React, { Component } from "react";
import { connect } from "react-redux";
import { signinUser } from "../actions";
import { Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onClickSignIn = this.onClickSignIn.bind(this);
    this.xOut = this.xOut.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onClickSignIn() {
    this.props.onClose();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(user, this.props.history);
  }

  xOut() {
    this.props.onClose();
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div id="sign-in">
        <p>Sign Up!</p>
        <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
        <Form>
          <p id="first-to-know">Be the first to know about our beta!</p>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.onClickSignIn}>
            Lets go!
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, { signinUser })(Signin);
