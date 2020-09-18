import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser, clear } from "../actions";
import { Form, Button, Modal} from "react-bootstrap";
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
      validated: false,
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

  onClickSignUp = (event) => {
    const form = event.currentTarget
    if(form.checkValidity() === false){
      event.preventDefault()
      event.stopPropagation()
    }else{
      this.setState({ validated: true})
      const user = {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
      };

      console.log('calling sign up');
      this.props.signupUser(user, this.props.history);
    }
  }

  xOut() {
    this.setState({ validated: false})
    this.props.onClose();
  }

  render() {
    console.log('user exists: ' +this.props.userExists)
    if(this.props.userExists){
      return (
        <Modal id="sign-up" show={this.props.showSignup} onHide={this.xOut}>
        <Form noValidate validated={this.state.validated} >
          <Form.Label id="modal-title">Sign up!</Form.Label>
          <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
        <Form.Label id="first-to-know">Be the first to know about our beta!</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
          </Form.Group>
          <Form.Group controlId="formBasicFirstName">
            <Form.Control required type="text" placeholder="First Name" onChange={this.onInputChangeFirstName}/>
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Control required type="text" placeholder="Last Name" onChange={this.onInputChangeLastName}/>
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Control required type="text" placeholder="Username" onChange={this.onInputChangeUsername}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control required type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
            {(this.props.incompleteForm && !this.props.userExists) ? (<Form.Control.Feedback type="invalid"> Please fill out the form. </Form.Control.Feedback>)
              :
            (this.props.userExists && <Form.Control.Feedback type="invalid"> User already exists. </Form.Control.Feedback>)}
          </Form.Group>
            <Button id="signUpBtn" variant="primary"  onClick={this.onClickSignUp}>
              Let's go!
            </Button>    
          </Form>
        </Modal>
      );
    } else {
      return(
        <Modal id="sign-up" show={this.props.showSignup} onHide={this.xOut}>
        <Form noValidate validated={this.state.validated} >
          <Form.Label id="modal-title">Sign up!</Form.Label>
          <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
        <Form.Label id="first-to-know">Be the first to know about our beta!</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required type="email" placeholder="Enter email" onChange={this.onInputChangeEmail}/>
          </Form.Group>
          <Form.Group controlId="formBasicFirstName">
            <Form.Control required type="text" placeholder="First Name" onChange={this.onInputChangeFirstName}/>
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Control required type="text" placeholder="Last Name" onChange={this.onInputChangeLastName}/>
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Control required type="text" placeholder="Username" onChange={this.onInputChangeUsername}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control required type="password" placeholder="Password" onChange={this.onInputChangePassword}/>
            {(this.props.incompleteForm && !this.props.userExists) ? (<Form.Control.Feedback type="invalid"> Please fill out the form. </Form.Control.Feedback>)
              :
            (this.props.userExists && <Form.Control.Feedback type="invalid"> User already exists. </Form.Control.Feedback>)}
          </Form.Group>
            <Button id="signUpBtn" variant="primary"  onClick={this.onClickSignUp}>
              Let's go!
            </Button>    
          </Form>
        </Modal>
      );
    }
    
  }
}

const mapStateToProps = (state) => ({
  userExists: state.error.userExists,
  incompleteForm: state.error.incompleteForm,
});

export default connect(mapStateToProps, { signupUser, clear })(SignUp);
