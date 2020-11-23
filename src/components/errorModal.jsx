import React, {Component} from 'react';
import { connect } from "react-redux";
import { clearErrorMessages } from '../actions';

import './css_files/errormodal.scss';
class ErrorModal extends Component{
    render(){
        return(
        <div className={`error-modal ${this.props.isError?"null":"error-modal--hidden"}`}>
            <ul>
                {this.props.messages.map((message,idx)=>
                    <li>
                        {message}
                    </li>)}
            </ul>
            <button 
            className="btn"
            onClick={(e)=>{this.props.clearErrorMessages();}}>Close</button>
        </div>);
    }
}

const mapStateToProps = (state)=>({
    isError: state.error.isError,
    messages: state.error.messages
});

export default connect(mapStateToProps, {clearErrorMessages})(ErrorModal);