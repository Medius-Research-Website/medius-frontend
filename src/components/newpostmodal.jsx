import React, { Component } from "react";

import { connect } from "react-redux";

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
                <div>
                    <input value={this.state.ticker} onChange={(e)=>{this.setState({ticker:e.target.value||""})}} type="text"/>
                    <input value={this.state.insight} onChange={(e)=>{this.setState({insight:e.target.value||""})}} type="text"/>
                    <input value={this.state.idea} onChange={(e)=>{this.setState({idea:e.target.value||""})}} type="text"/>
                    <button onClick={this.onSubmit}>Submit</button>
                </div>
            )
        else
            return <React.Fragment/>;
    }
}

const mapStateToProps = (state)=>({
    show:state.posts.newPostModal,
});

export default connect(mapStateToProps)(NewPostModal);