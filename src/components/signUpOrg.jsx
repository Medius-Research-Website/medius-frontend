import React, { Component } from "react";
import { connect } from "react-redux";
import { signupUser, clear } from "../actions";
import { Form, Button, Modal, Spinner} from "react-bootstrap";
import "./css_files/signUp.scss";
// import { wait } from "@testing-library/react";

class SignUpOrg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      orgName: "",
      orgWebsite: "",
      validated: false,
      loading:false
    };

    this.onInputChangeEmail = this.onInputChangeEmail.bind(this);
    this.onInputChangePassword = this.onInputChangePassword.bind(this);
    this.onInputChangeUsername = this.onInputChangeUsername.bind(this);
    this.onInputChangeOrgName = this.onInputChangeOrgName.bind(this);
    this.onInputChangeOrgWebsite = this.onInputChangeOrgWebsite.bind(this);
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.xOut = this.xOut.bind(this);
  }

  componentDidMount (){
    // console.log('sign up', this.props);
  }

  onInputChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onInputChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onInputChangeOrgName(event) {
    this.setState({ orgName: event.target.value });
  }

  onInputChangeOrgWebsite(event) {
    this.setState({ orgWebsite: event.target.value });
  }

  onInputChangeUsername(event) {
    this.setState({ username: event.target.value });
  }


  onClickSignUp = (event) => {
    this.setState({loading:true});
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
        firstName: this.state.orgName,
        lastName: this.state.orgWebsite,
        type: 'org',
      };
      this.props.signupUser(user, this.props.history,()=>{
        this.setState({loading:false});
      });
    }
  }

  xOut() {
    this.setState({ validated: false})
    this.props.stateChange();
  }

  render() {
    if (this.props.userExists){
      return (
        <Modal id="sign-up" show={this.props.show} onHide={this.xOut}>
        <Form noValidate validated={!this.props.userExists && this.state.validated} >
          <Form.Label id="modal-title">Sign up!</Form.Label>
          <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
        <Form.Label id="first-to-know">Be the first to know about our beta!</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required type="email" placeholder="Enter email" onChange={this.onInputChangeEmail} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formOrgNameName">
            <Form.Control required type="text" placeholder="Organization Name" onChange={this.onInputChangeOrgName} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formOrgWebsite">
            <Form.Control required type="text" placeholder="Organization Website" onChange={this.onInputChangeOrgWebsite} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formOrgUsername">
            <Form.Control required type="text" placeholder="Username" onChange={this.onInputChangeUsername} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control required type="password" placeholder="Password" onChange={this.onInputChangePassword} isInvalid={this.props.userExists}/>
            {(this.props.incompleteForm && !this.props.userExists) ? (<Form.Control.Feedback type="invalid"> Please fill out the form. </Form.Control.Feedback>)
              :
            (this.props.userExists && <Form.Control.Feedback type="invalid"> User already exists. </Form.Control.Feedback>)}
          </Form.Group>
            <Button disabled={this.state.loading} id="signUpBtn" variant="primary"  onClick={this.onClickSignUp}>
              Let's go!
            </Button>    
            <Form.Group>
              {this.state.loading?<Spinner className="spinner" animation="border" />:null}
              </Form.Group>
          </Form>
        </Modal>
      );
    } else {
      return(
        <Modal id="sign-up" show={this.props.show} onHide={this.xOut}>
        <Form noValidate validated={!this.props.userExists && this.state.validated} >
          <Form.Label id="modal-title">Sign up!</Form.Label>
          <button type="button" id="close-button" onClick={this.xOut}>&times;</button>
        <Form.Label id="first-to-know">Be the first to know about our beta!</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required type="email" placeholder="Enter email" onChange={this.onInputChangeEmail} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formOrgNameName">
            <Form.Control required type="text" placeholder="Organization Name" onChange={this.onInputChangeOrgName} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formOrgWebsite">
            <Form.Control required type="text" placeholder="Organization Website" onChange={this.onInputChangeOrgWebsite} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formOrgUsername">
            <Form.Control required type="text" placeholder="Username" onChange={this.onInputChangeUsername} isInvalid={this.props.userExists}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control required type="password" placeholder="Password" onChange={this.onInputChangePassword} isInvalid={this.props.userExists}/>
            {(this.props.incompleteForm && !this.props.userExists) ? (<Form.Control.Feedback type="invalid"> Please fill out the form. </Form.Control.Feedback>)
              :
            (this.props.userExists && <Form.Control.Feedback type="invalid"> User already exists. </Form.Control.Feedback>)}
          </Form.Group>
            <Button disabled={this.state.loading} id="signUpBtn" variant="primary"  onClick={this.onClickSignUp}>
              Let's go!
            </Button>    
            <Form.Group>
              {this.state.loading?<Spinner className="spinner" animation="border" />:null}
              </Form.Group>
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

export default connect(mapStateToProps, { signupUser, clear })(SignUpOrg);