
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css_files/userBubble.scss";
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';
import blankProfile from './css_files/images/blankPortrait.png';
import { Link } from 'react-router-dom';


class userBubble extends Component {

    componentDidMount() {
        this.props.fetchCurrentUser(localStorage.getItem('userID'));
    }

    renderBubble = () => {
        const pic = this.props.user.hasOwnProperty('picture') && this.props.user.picture !== '';
        const numFollowers = this.props.user.followers.length;
        const numFollowing = this.props.user.following.length;

        return (
            <div>
                <Link to={`/users/${this.props.user.id}`}>
                    { pic ? (<img src={this.props.user.picture} alt="profile" /> ) : ( <img src={blankProfile} alt="profile" /> )}
                    <p id="name">{this.props.user.firstName} {this.props.user.lastName}</p>
                    <div className="followers">
                        <p>{numFollowing} following &#8226; {numFollowers} followers</p>
                    </div>
                </Link>
            </div>
        )
    }


  // access through this.props.user
  render() {
    if (this.props.user != null){
        return (
            <div className="userBubble">
                {this.renderBubble()}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
  }
}

function mapStateToProps(reduxState) {
    return {
      user: reduxState.auth.user,
    };
  }
  
  export default connect(mapStateToProps, { fetchCurrentUser  })(userBubble);