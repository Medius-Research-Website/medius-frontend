import React, { Component } from "react";
import { connect } from "react-redux";
import { signinUser, clear } from "../actions";
import { Form, Button , Modal} from "react-bootstrap";
// import { Link } from "react-router-dom";
import "./css_files/signIn.scss";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validated: false,
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

  onClickSignIn = (event) => {
    const form = event.currentTarget
    if(form.checkValidity() === false){
      event.preventDefault()
      event.stopPropagation()
    }else{
      this.setState({ validated: true})
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
        this.props.signinUser(user, this.props.history);
    }
  }

  xOut = () => {
    this.setState({ validated: false})
    this.props.onClose();
  }
  
  render() {
    
    if (this.props.invalidCredentials) {
      return (
      <Modal id="sign-in" show={this.props.showSignin} onHide={this.xOut}>
        <Form noValidate validated={this.state.validated}>
          <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control required type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
            {(this.props.incompleteForm && !this.props.invalidCredentials) ? (<Form.Control.Feedback type="invalid"> Please fill out the form. </Form.Control.Feedback>)
              :
            (this.props.invalidCredentials && <Form.Control.Feedback type="invalid"> Email and password don't match. </Form.Control.Feedback>)}
          </Form.Group>

          <Button id="signInBtn" variant="primary" onClick={this.onClickSignIn}>
            Lets go!
          </Button>
        </Form>
      </Modal>
      )
    } else {
      return (
        <Modal id="sign-in" show={this.props.showSignin} onHide={this.xOut}>
          <Form noValidate validated={this.state.validated}>
            <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
              {(this.props.incompleteForm && !this.props.invalidCredentials) ? (<Form.Control.Feedback type="invalid"> Please fill out the form. </Form.Control.Feedback>)
              :
              (this.props.invalidCredentials && <Form.Control.Feedback type="invalid"> Email and password don't match. </Form.Control.Feedback>)}
            </Form.Group>
              <Button id="signInBtn" variant="primary"  onClick={this.onClickSignIn}>
                Submit
              </Button>
          </Form>
        </Modal>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  invalidCredentials: state.error.invalidCredentials,
  incompleteForm: state.error.incompleteForm,
});

export default connect(mapStateToProps, { signinUser, clear })(Signin);
