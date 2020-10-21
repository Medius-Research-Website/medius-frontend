import React, { Component } from "react";
import "./css_files/profile.scss";
import { connect } from 'react-redux';
import { 
  fetchUser, 
  fetchCurrentUser, 
  fetchUserPosts, 
  fetchPriceChange, 
  fetchCommentsByPost, 
  updateUser,
  followUser, 
  unfollowUser} from '../actions';
import { uploadFile } from '../actions/s3';
import FileUpload from './FileUpload';
import EditableTextarea from './EditableTextarea';
import Navbar from "./navbar";
import { Button, FormControl, InputGroup, Image} from 'react-bootstrap';
import Post from "./post";
import blankProfile from './css_files/images/blankPortrait.png';
// import { TransferWithinAStation } from "@material-ui/icons";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      picture: "",
      bio: "",
      file: "",
      editable: false,
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onBioChange = this.onBioChange.bind(this)
    this.onPictureChange = this.onPictureChange.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchUser(this.props.match.params.userID);
    this.props.fetchUserPosts(this.props.match.params.userID);
    this.props.fetchCurrentUser(localStorage.getItem('userID'));
  }

  // used when you route from one profile directly to another because
  // component will update but not re-mount
  componentDidUpdate(nextProps, nextState) { 
    if (nextProps.match.params.userID !== this.props.match.params.userID){
      this.props.fetchUser(this.props.match.params.userID);
      this.props.fetchUserPosts(this.props.match.params.userID);
      this.props.fetchCurrentUser(localStorage.getItem('userID'));
    }
  }

  // should display a button to follow them if they're not already that calls this
  followUser = () => {
    const fields = {
      id: this.props.selectedUser.id
    }
    this.props.followUser(this.props.currentUser.id, fields)
  }

  // if they're already following, should display a button that calls this
  unfollowUser = () => {
    const fields = {
      id: this.props.selectedUser.id
    }
    this.props.unfollowUser(this.props.currentUser.id, fields)
  }

  onNameChange(event){
    this.setState({name: event.target.value})
  }

  onBioChange(event){
    this.setState({bio: event.target.value})
  }

  onPictureChange(event){
    this.setState({picture: event.target.value})
  }

  editProfile = () => {
    this.setState({editable: !this.state.editable})
    const firstName = (this.state.name.split(" ")[0] !== "") ? (this.state.name.split(" ")[0]) : (this.props.selectedUser.firstName)
    const lastName = (this.state.name.split(" ")[1] !== undefined) ? (this.state.name.split(" ")[1]) : (this.props.selectedUser.lastName)
    const bio = (this.state.bio !== "") ? (this.state.bio) : (this.props.selectedUser.bio)
    const picture = (this.state.picture !== "") ? (this.state.picture) : (this.props.selectedUser.picture)
    const fields = {
      firstName: firstName,
      lastName: lastName,
      picture: picture,
      bio: bio,
    }    

    // console.log(fields);
    !!this.state.editable && this.props.updateUser(localStorage.getItem('userID'), fields);
    
  }

  handleImageChange = (base64, file) => {
    // console.log(file)
    uploadFile(file).then(url => {
      this.setState({picture: url})
    }).catch(error => {
      console.log(error)
    })
  }

  renderImage = () =>{
    if (this.state.picture === "" && this.props.selectedUser.hasOwnProperty('picture') && this.props.selectedUser.picture !== null){
      return (
        <Image className="profile-picture" src={this.props.selectedUser.picture} />
      )
    } else if (this.state.picture !== ""){
      return (
        <Image className="profile-picture" src={this.state.picture} />
      )
    } else {
      return (
        <Image className="profile-picture" src={blankProfile} />
      )
    }
  }

  // access user through this.props.selectedUser
  // should check if currentUser's username is same as selectedUser's username to determine
  // if the person is viewing their own page. if it's there page add some kind of edit button
  // to change their bio
  render() {
    // console.log('selected', this.props.selectedUser);
    // console.log('current', this.props.currentUser);
    // console.log(this.props.userPosts)
    
    if (this.props.selectedUser != null && this.props.currentUser != null && this.props.selectedUser.hasOwnProperty('username') && this.props.currentUser.hasOwnProperty('username')) {
    return (
      <div className="profile-fullPage">
        <Navbar />
          <div className="header">
            <div className="image-box">
              {this.renderImage()}
              {this.state.editable && (
                <FileUpload accept="image/*" onChange={this.handleImageChange}>
                </FileUpload>
              )}
              <div>
                {(this.props.selectedUser.username === this.props.currentUser.username) ? 
                <Button className="edit-button" onClick={this.editProfile}>
                  <svg style={{'display': 'block', 'marginLeft': '-5px'}}width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                </Button> 
                : 
                <></>
                }
                {
                  (this.props.selectedUser.username !== this.props.currentUser.username) ? 
                  ((this.props.selectedUser?.followers && this.props.selectedUser?.followers.includes(this.props.currentUser?.id)) ?
                  <Button className="unfollow-button" onClick={this.unfollowUser}>Unfollow</Button> 
                  :
                  <Button className="follow-button" onClick={this.followUser}>Follow</Button>
                  ) 
                  :
                  <></>
                }
              </div>
            </div>
          
          <div className="user-following">
            <EditableTextarea className="user-name" isEditing={this.state.editable} onChange={this.onNameChange}>
              {(this.state.name === "") ? (this.props.selectedUser?.firstName + " " + this.props.selectedUser?.lastName) : (this.state.name)}
            </EditableTextarea>
            <div className="user-info">
              {this.props.selectedUser?.following.length} following • {this.props.selectedUser?.followers.length} followers
            </div>
          </div>
        </div>

        <div className="bio-holder">
          {(this.state.editable) ? 
            <InputGroup className="bio">
              <FormControl placeholder={(this.state.bio === "") ? (this.props.selectedUser?.bio || "write a bio!" ) : (this.state.bio)} onChange={this.onBioChange}/>
            </InputGroup> 
            : 
            <InputGroup className="bio">
              <FormControl placeholder={(this.state.bio === "") ? (this.props.selectedUser?.bio || "no bio yet...") : (this.state.bio)} readOnly/>
            </InputGroup> 
          }
        </div>
        
        {(this.props.userPosts.length !== 0) ? (
            <React.Fragment>
              {this.props.userPosts.map((post) => {return( 
                  <Post post={post} 
                  fetchComments={(id)=>{//this function is to handle fetching comments to show
                        this.props.fetchCommentsByPost(id);
                    }}
                  fetchPriceChange={(id)=>{
                    this.props.fetchPriceChange(id);
                  }}
                  likePost={(postId,userId)=>{
                    this.props.likePost(postId,userId);
                  }}
                  userId={this.props.currentUser?.id?(this.props.currentUser.id):("")}
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
      } else {
        return(
          <div />
        )
      }
  }
}

function mapStateToProps(reduxState) {
  return {
    selectedUser: reduxState.auth.selectedUser, // this is the person whose profile we're viewing
    currentUser: reduxState.auth.user,  // this is the person who's signed in
    userPosts: reduxState.posts.all || [],   //can test with fetchPosts in case a user doesn't have any posts    // this is the person who's signed in
  };
}

export default connect(mapStateToProps, { fetchUser, fetchCurrentUser, fetchUserPosts, fetchPriceChange, fetchCommentsByPost, updateUser, followUser, unfollowUser})(Profile);
