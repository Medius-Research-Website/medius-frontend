import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import SignUpInd from './signUpInd'
import SignUpOrg from './signUpOrg'
import "./css_files/signUp.scss";
// import { wait } from "@testing-library/react";

class SignUp extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            showInd: false,
            showOrg: false,
        };
    }

    xOut = () => {
        this.props.onClose();
    }

    changeInd = () => {
        this.setState({
            showInd: !this.state.showInd,
        });
        this.props.onClose();
    }
    
    changeOrg = () => {
        this.setState({
            showOrg: !this.state.showOrg
        });
        this.props.onClose();
    }

    render(){
      // console.log('signup', this.props)
        if (this.props.showSignup) {
            return(
                <div className="signUp__modal">
                    <div onClick={this.xOut.bind(this)} className="signUp__modal__background"/>
                    <div className="signUp__modal__form">
                        <button onClick={this.xOut.bind(this)} className="signUp__modal__form__close-button">x</button>
                        <p className="signUp__modal__form__title">
                             Who are you?
                        </p>      
                        
                        <div className="signUp__modal__form__main">
                            <div className="signUp__modal__form__main__ind" onClick={this.changeInd}>
                                <FontAwesomeIcon icon={faUser} className="fa-7x icon"/> 
                                <span>individual</span>
                            </div>
                            <div className="signUp__modal__form__main__org" onClick={this.changeOrg}>
                                <FontAwesomeIcon icon={faUsers} className="fa-7x icon"/>
                                <span>organization</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.showInd)
            return <SignUpInd show={this.state.showInd} stateChange={this.changeInd} history={this.props.history} />;
        else if (this.state.showOrg) {
            return <SignUpOrg show={this.state.showOrg} stateChange={this.changeOrg} history={this.props.history}/>;
        }
        else
            return null
    }
}

export default SignUp;