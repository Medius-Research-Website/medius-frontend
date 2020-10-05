import React, { Component } from "react";
import "./css_files/profile.scss";
import { connect } from 'react-redux';
import { 
  fetchUser, 
  fetchCurrentUser, 
  fetchUserPosts, 
  fetchPriceChange, 
  fetchCommentsByPost, 
  updateUser} from '../actions';
import Navbar from "./navbar";
import { Button } from 'react-bootstrap';
import Post from "./post";
// import { TransferWithinAStation } from "@material-ui/icons";

class Profile extends Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userID);
    //this.props.fetchPosts() => use this to test the rendering of a user's post history
    this.props.fetchUserPosts(this.props.match.params.userID);
    this.props.fetchCurrentUser(localStorage.getItem('userID'));
  }


  // access user through this.props.selectedUser
  // should check if currentUser's username is same as selectedUser's username to determine
  // if the person is viewing their own page. if it's there page add some kind of edit button
  // to change their bio
  render() {
    console.log(this.props.selectedUser)
    console.log(this.props.currentUser)
    console.log(this.props.userPosts)
    return (
      <div>
        <Navbar />
        <div className="profile-box">
          <div>
            {(this.props.selectedUser?.username === this.props.currentUser?.username) ? <Button className="edit-button" >Edit</Button> : <></>}
            <p>Timothy Park</p>
          </div>
          <div className="occupation">
            <p>Student at Boston University</p>
          </div>
        </div>
        <p className="username">John Doe</p>
        <div className="user-info">
          <p>2 posts • 0 following • 4952 followers</p>
        </div>
        <div className="investment-idea">
          Got an investing idea? voice it!
        </div>
        {(this.props.userPosts.length !== 0) ? (
            <React.Fragment>
              {this.props.userPosts.map((post) => {return( 
                  <Post post={post} 
                  //comments={this.props.comments[post.id]||[]} 
                  //priceChange={this.props.priceChange[post.id]||0}
                  showCommentsHandler={()=>{//this function is to handle fetching comments to show
                        this.props.fetchCommentsByPost(post.id);
                    }}
                  fetchPriceChange={()=>{
                    this.props.fetchPriceChange(post.id);
                  }}
                  key={post.id}/>
              )})}
            </React.Fragment>
          )
        :
          (
            <div>
              No posts to see yet!
            </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    selectedUser: reduxState.auth.selectedUser, // this is the person whose profile we're viewing
    currentUser: reduxState.auth.user,  // this is the person who's signed in
    userPosts: reduxState.posts.all.posts || [],   //can test with fetchPosts in case a user doesn't have any posts
  };
}

export default connect(mapStateToProps, { fetchUser, fetchCurrentUser, fetchUserPosts, fetchPriceChange, fetchCommentsByPost})(Profile);
