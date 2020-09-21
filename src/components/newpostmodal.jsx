import React, { Component } from "react";
import './css_files/newpostmodal.scss';
import { connect } from "react-redux";
import { toggleNewPostModal } from "../actions";
class NewPostModal extends Component{
    constructor(props){
        super(props);
        this.state={
            ticker:"",
            insight:"",
            idea:""
        }
    }
    onSubmit(){
        //handleSubmission
    }
    render(){
        if (this.props.show)
            return(
                <div className="feed__modal">
                    <div onClick={this.props.toggleNewPostModal} className="feed__modal__background"/>
                    <div className="feed__modal__form">
                        <button onClick={this.props.toggleNewPostModal} className="feed__modal__form__close-button">x</button>
                        <p className="feed__modal__form__title">
                             Make a New Post !!
                        </p>
                        <div className="feed__modal__form__main">
                            <div>
                                <label>Ticker :</label>
                                <input value={this.state.ticker} onChange={(e)=>{this.setState({ticker:e.target.value||""})}} type="text"/>
                            </div>
                            <div>
                                <label>Idea :</label>
                                <input value={this.state.idea} onChange={(e)=>{this.setState({idea:e.target.value||""})}} type="text"/>
                            </div>
                            <div>
                                <label>Insight :</label>
                                <input value={this.state.insight} onChange={(e)=>{this.setState({insight:e.target.value||""})}} type="text"/>
                            </div>
                            <button onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )
        else
            return <React.Fragment/>;
    }
}

const mapStateToProps = (state)=>({
    show:state.posts.newPostModal,
});

export default connect(mapStateToProps,{toggleNewPostModal})(NewPostModal);