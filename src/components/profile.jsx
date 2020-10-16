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
    this.props.fetchUser(this.props.match.params.userID)
    //this.props.fetchPosts() => use this to test the rendering of a user's post history
    this.props.fetchUserPosts(this.props.match.params.userID);
    this.props.fetchCurrentUser(localStorage.getItem('userID'))
  }

  // should display a button to follow them if they're not already that calls this
  followUser = () => {
    this.props.followUser(this.props.currentUser.id, this.props.selectedUser.id)
  }

  // if they're already following, should display a button that calls this
  unfollowUser = () => {
    this.props.unfollowUser(this.props.currentUser.id, this.props.selectedUser.id)
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

    !!this.state.editable && this.props.updateUser(localStorage.getItem('userID'), fields);
    
  }

  handleImageChange = (base64, file) => {
    console.log(file)
    uploadFile(file).then(url => {
      this.setState({picture: url})
    }).catch(error => {
      console.log(error)
    })
  }
  // access user through this.props.selectedUser
  // should check if currentUser's username is same as selectedUser's username to determine
  // if the person is viewing their own page. if it's there page add some kind of edit button
  // to change their bio
  render() {
    // console.log(this.props.selectedUser)
    // console.log(this.props.currentUser)
    //console.log(this.props.userPosts)
    if (this.props.selectedUser != null && this.props.currentUser != null) {
    return (
      <div>
        <Navbar />
        <div className="profile-box">
          <Image className="profile-picture" src={(this.state.picture === "") ? (this.props.selectedUser.picture) : (this.state.picture) }/>
          {this.state.editable && (
            <FileUpload accept="image/*" onChange={this.handleImageChange}>
            </FileUpload>
          )

          }
          <div>
            {(this.props.selectedUser.username === this.props.currentUser.username) ? 
            <Button className="edit-button" onClick={this.editProfile}>Edit</Button> : <></>
            }
            <Button className="follow-button" onClick={this.followUser} >Follow</Button>
          </div>
        </div>
        <EditableTextarea className="user-name" isEditing={this.state.editable} onChange={this.onNameChange}>
          {(this.state.name === "") ? (this.props.selectedUser?.firstName + " " + this.props.selectedUser?.lastName) : (this.state.name)}
        </EditableTextarea>
        <div className="user-info">
          2 posts • 0 following • 4952 followers
        </div>
        <div>
          {(this.state.editable) ? 
            <InputGroup style={{width: "1760px", marginLeft: "-250px"}}>
              <FormControl  className="bio" placeholder={(this.state.bio === "") ? (this.props.selectedUser?.bio || "Got an investing idea? voice it!" ) : (this.state.bio)} onChange={this.onBioChange}/>
            </InputGroup> 
            : 
            <InputGroup style={{width: "1760px", marginLeft: "-250px"}}>
              <FormControl  className="bio" placeholder={(this.state.bio === "") ? (this.props.selectedUser?.bio || "Got an investing idea? voice it!") : (this.state.bio)} readOnly/>
            </InputGroup> 
          }
        </div>
        <div>
          {(this.props.selectedUser?.username === this.props.currentUser?.username) ? 
            <div className="reports">
              Research Reports
            </div>
            : 
            <></>
          }
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
    userPosts: reduxState.posts.all.posts || [],   //can test with fetchPosts in case a user doesn't have any posts    // this is the person who's signed in
  };
}

export default connect(mapStateToProps, { fetchUser, fetchCurrentUser, fetchUserPosts, fetchPriceChange, fetchCommentsByPost, updateUser, followUser, unfollowUser})(Profile);
