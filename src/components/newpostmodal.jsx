import React, { Component } from "react";

import { connect } from "react-redux";

class NewPostModal extends Component{
    render(){
        if (this.props.show)
            return(
                <div>
                Modal
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