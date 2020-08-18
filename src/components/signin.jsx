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
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onClickSignIn() {

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(user, this.props.history);
  }

  render() {

    return (
      <div id="sign-in">
        <Form>
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
