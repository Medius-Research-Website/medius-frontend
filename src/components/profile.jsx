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
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Post from "./post";
import { ThreeSixtySharp } from "@material-ui/icons";
// import { TransferWithinAStation } from "@material-ui/icons";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      picture: "",
      bio: "",
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


  // access user through this.props.selectedUser
  // should check if currentUser's username is same as selectedUser's username to determine
  // if the person is viewing their own page. if it's their page add some kind of edit button
  // to change their bio
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
    const fields = {
      firstName: this.state.name.split(" ")[0],
      lastName: this.state.name.split(" ")[1],
      bio: this.state.bio,
    }
    !!this.state.editable && this.props.updateUser(localStorage.getItem('userID'), fields);
    
  }
  render() {
    //console.log(this.props.selectedUser)
    //console.log(this.props.currentUser)
    //console.log(this.props.userPosts)
    return (
      <div>
        <Navbar />
        <div className="profile-box">
          <div>
            {(this.props.selectedUser?.username === this.props.currentUser?.username) ? 
            <Button className="edit-button" onClick={this.editProfile}>Edit</Button> : <></>
            }
            <p>Timothy Park</p>
          </div>
          <div className="occupation">
            <p>Student at Boston University</p>
          </div>
        </div>
        <div className="user-name">
          {(this.state.editable) ? 
            (
              <InputGroup >
              <FormControl placeholder={this.props.selectedUser?.firstName + " " + this.props.selectedUser?.lastName} onChange={this.onNameChange}/>
              </InputGroup> 
            ) 
            : 
            (
              ((this.state.name === "") ? (this.props.selectedUser?.firstName + " " + this.props.selectedUser?.lastName) : (this.state.name))
            )}
          
        </div>
        <div className="user-info">
          2 posts • 0 following • 4952 followers
        </div>
        <div>
          {(this.state.editable) ? 
            <InputGroup style={{width: "1760px", marginLeft: "-250px"}}>
              <FormControl  className="bio" placeholder={(this.state.bio === "") ? (this.props.selectedUser?.bio || "Got an investing idea? voice it!" ) : (this.state.bio)}/>
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
  }
}

function mapStateToProps(reduxState) {
  return {
    selectedUser: reduxState.auth.selectedUser, // this is the person whose profile we're viewing
    currentUser: reduxState.auth.user,  // this is the person who's signed in
    userPosts: reduxState.posts.all.posts || [],   //can test with fetchPosts in case a user doesn't have any posts
  };
}

export default connect(mapStateToProps, { fetchUser, fetchCurrentUser, fetchUserPosts, fetchPriceChange, fetchCommentsByPost, updateUser})(Profile);
