import React, { Component } from "react";
import { connect } from "react-redux";
import { signinUser, clear } from "../actions";
import { Form, Button , Modal} from "react-bootstrap";
import { Link } from "react-router-dom";

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
    this.props.clear()
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
    if (this.props.invalidCredentials) {
      return (
      <Modal id="sign-in" show={this.props.showSignin} onHide={this.xOut}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
            <Form.Text className="text-muted">
              Invalid Credentials.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.onClickSignIn}>
            Lets go!
          </Button>
        </Form>
      </Modal>
      )
    } else {
      return (
        <Modal id="sign-in" show={this.props.showSignin} onHide={this.xOut}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
        </Modal>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  invalidCredentials: state.error.invalidCredentials,
});

export default connect(mapStateToProps, { signinUser, clear })(Signin);
