import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser, clear } from "../actions";
import { Form, Button, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css_files/signUp.scss";

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
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.xOut = this.xOut.bind(this);
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

  onClickSignUp() {
    this.props.onClose();

    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
    };
    this.props.signupUser(user, this.props.history);
  }

  xOut() {
    this.props.onClose();
  }

  render() {

    return (
        <Modal id="sign-up" show={this.props.showSignup} onHide={this.xOut}>
        <Form>
          <Form.Label id="modal-title">Sign up!</Form.Label>
          <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
        <Form.Label id="first-to-know">Be the first to know about our beta!</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
          </Form.Group>
          <Form.Group controlId="formBasicFirstName">
            <Form.Control type="text" placeholder="First Name" onChange={this.onInputChangeFirstName}/>
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Control type="text" placeholder="Last Name" onChange={this.onInputChangeLastName}/>
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Control type="text" placeholder="Username" onChange={this.onInputChangeUsername}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
          </Form.Group>
          <Link to="landingpage">
            <Button id="signUpBtn" variant="primary" type="submit" onClick={this.onClickSignUp}>
              Let's go!
            </Button>
          </Link>
        </Form>
        </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  userExists: state.error.userExists,
});

export default connect(mapStateToProps, { signupUser, clear })(SignUp);
