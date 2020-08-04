import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser } from "../actions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",

      // information needed for init signup:
      // username: { type: String },
      // firstName: { type: String },
      // lastName: { type: String },
      // email: { type: String },
      // password: { type: String },
    };
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onClickSignUp() {
    const user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    this.props.signupUser(user, this.props.history);
  }

  render() {
    return (
      <div id="sign-up">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              // onChange={this.onInputChangeEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Username"
              // onChange={this.onInputChangeUsername}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              // onChange={this.onInputChangePassword}
            />
          </Form.Group>
          <Link to="landingpage">
            <Button
              variant="primary"
              type="submit"
              // onClick={() => this.onClickSignUp}
            >
              Submit
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default connect(null, { signupUser })(Signup);
