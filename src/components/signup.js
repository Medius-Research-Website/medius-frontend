import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser, clear } from "../actions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      lastName: "",
      firstName: "",
    };
    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangeFirstName = this.onInputChangeFirstName.bind(this);
    this.onInputChangeLastName = this.onInputChangeLastName.bind(this);
    this.onClickSignIn = this.onClickSignIn.bind(this);
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onInputChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  onInputChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  onInputChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  onClickSignIn() {
    this.props.clear()
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    };
    this.props.signupUser(user, this.props.history);
  }

  render() {
    if (this.props.userExists) {
      return (
        <div id="sign-in">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" onChange={this.onInputChangeFirstName}/>
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" onChange={this.onInputChangeLastName}/>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" onChange={this.onInputChangeUsername}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
              <Form.Text className="text-muted">
                A user already exists with one or more of these credentials.
              </Form.Text>
            </Form.Group>
            <Link to="landingpage">
              <Button variant="primary" type="submit" onClick={this.onClickSignIn}>
                Submit
              </Button>
            </Link>
          </Form>
        </div>
      );
    } else {
      return (
        <div id="sign-in">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" onChange={this.onInputChangeFirstName}/>
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" onChange={this.onInputChangeLastName}/>
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" onChange={this.onInputChangeUsername}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
            </Form.Group>
            <Link to="landingpage">
              <Button variant="primary" type="submit" onClick={this.onClickSignIn}>
                Submit
              </Button>
            </Link>
          </Form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  userExists: state.error.userExists,
});

export default connect(mapStateToProps, { signupUser, clear })(SignUp);
