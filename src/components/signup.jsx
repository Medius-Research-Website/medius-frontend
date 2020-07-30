import React, { Component } from "react";
import { connect } from 'react-redux';
import { signupUser } from '../actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',

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
        Input fields here
      </div>
    );
  }
}

export default connect(null, { signupUser })(Signup);
