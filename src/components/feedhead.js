import React from 'react';
import "./css_files/feedhead.scss";
import { connect } from "react-redux";
import { toggleNewPostModal } from "../actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


function FeedHead(props){//contain the title and the input box
    return(
        <div className="feed-head">
            <div className="feed-head__component-wrapper">
                <div className="feed-head__title">
                    {"What's New"}
                </div>
            </div>
            <div className="feed-head__component-wrapper">
                <div onClick={(e)=>{props.toggleNewPostModal();}} className="feed-head__input">
                    <p><FontAwesomeIcon icon={faEdit} />     got an investment idea? voice it!</p>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        toggleNewPostModal: reduxState.posts.toggleNewPostModal,
    };
  }

export default connect(mapStateToProps, {toggleNewPostModal})(FeedHead);
