import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
<<<<<<< HEAD
import { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchUser } from '../actions';
=======
import { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchCurrentUser } from '../actions';
>>>>>>> ed203a195a85068e27a4da4c0e066436df045a42
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import { ThreeSixtySharp } from '@material-ui/icons';

// this is the full page for a single post
class singlepost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  async componentDidMount() {
    await this.props.fetchPost(this.props.match.params.postID);
    await this.props.singlePriceChange(this.props.match.params.postID);
    await this.props.fetchCommentsByPost(this.props.match.params.postID);
    await this.props.fetchCurrentUser(localStorage.getItem('userID'));
  }

  handleChange = (e) => {
    this.setState({ comment: e.target.value })
  }

  createComment = (comment) => {

    const fields = {
      text: comment,
      author: this.props.user.username,
      authorID: this.props.user.id,
    };
    if (fields.author && fields.text) {
      this.props.addComment(fields, this.props.match.params.postID);
    } else {
      console.log('You need to be signed in to comment');
    }
    this.setState({ comment: ''});
  }
  
  render() {
    const { current, singlePriceChange, comments, singleCurrVal } = this.props.posts;
    const pct = Math.round(singlePriceChange).toFixed(2);
    let key = this.props.match.params.postID;
    console.log(this.props, 'props')
    return (
      <div className="bgcolor">
        <Navbar />
        <Link to="/landingpage" >
          <button className="btn btn-primary back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> back to main</button>
          </Link>
        <div className="author">
        {/* hey lol
          {this.props.user.firstName}
          {this.props.user.lastName} */}
        </div>
        <div className="singlepost">
          <div className="header">
            <h3>{current.insight}</h3>
            <div className="ticker-post">{current.ticker}</div>
            <div className="sector">Sector: {current.sector}</div>
            <div className="percent">
              <div className={pct.split('')[0] === '-' ? "negative-percent" : 'positive-percent'} >
                {!isNaN(pct) ? singleCurrVal + ' (' +pct + ' ' : null}
              </div> 
              {!isNaN(pct) ? <div style={{marginLeft: 6}}>since post)</div> : null}
            </div>
            { current.sell ? ( <div className="bubble--sell">Sell</div> ) : ( <div className="bubble--buy">Buy</div> ) }
          </div>
          <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut urna semper risus vestibulum tristique. Phasellus viverra tortor ligula. Proin condimentum nibh a ligula dapibus ullamcorper vel non ipsum. Vestibulum pretium libero non pulvinar vulputate. Mauris orci diam, lacinia vel rutrum efficitur, blandit nec mi. Proin vitae mi lorem. Donec porta condimentum massa nec tempor. Praesent rutrum lacinia massa, eu efficitur mauris vulputate ut. Fusce lacus metus, suscipit a facilisis quis, ultricies ac leo. Maecenas nibh libero, aliquam id ultricies vel, aliquam non nulla. Donec felis sapien, finibus ac eros in, suscipit dapibus velit. Pellentesque dapibus elit mauris, vel dignissim odio fermentum sit amet. Proin et turpis vitae felis rhoncus malesuada vitae vel nisl. Nulla metus velit, vestibulum in magna eu, faucibus commodo lacus. Sed neque neque, tempor ac aliquam ac, maximus a tortor. Sed sodales auctor massa non ullamcorper.
          </div>
        </div>
        <div className="comment">
          <div className="addComment">
            <input
              className="input"
              type="text" 
              value={this.state.comment} 
              onChange={this.handleChange}
              placeholder="Add a comment..."
              style={{padding: 20,borderRadius:20, backgroundColor:'#E0E1DD',border:'none'}}
            />
            <button 
              style={{backgroundColor:'#5A786F',color:'white',marginLeft:10,borderRadius:20,padding:15}} 
                onClick={() => this.createComment(this.state.comment)}> {/* this.props.addComment(comment) */}
                  Add
            </button>
          </div>
          {
            !comments[key] ? null : comments[key].map( comment => 
              <div className="listOfComments" key={comment.id} style={{marginTop:25}}>
                <div className="comments">
                  <Link to={`/users/${comment.authorID}`} ><div className="username">{comment.author}: &nbsp;</div></Link>
                  <div>{comment.text}</div>
                  <div style={{marginLeft:'auto', marginTop:'auto', fontSize:14}}>{new Date(comment.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
<<<<<<< HEAD
  console.log('remapping state to props', state);
=======
>>>>>>> ed203a195a85068e27a4da4c0e066436df045a42
  return {
    posts: state.posts,
    user: state.auth.user,
    authenticated: state.auth.authenticated,
  };
}

<<<<<<< HEAD
export default connect(mapStateToProps, { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchUser })(singlepost);
=======
export default connect(mapStateToProps, { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchCurrentUser })(singlepost);
>>>>>>> ed203a195a85068e27a4da4c0e066436df045a42
