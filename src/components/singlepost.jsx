import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchCurrentUser } from '../actions';
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
    this.props.addComment(fields, this.props.match.params.postID);
    this.setState({ comment: ''});
  }

  renderInvestment = () => {
    const { current, singlePriceChange, singleCurrVal } = this.props.posts;
    const pct = Math.round(singlePriceChange).toFixed(2);

    return (
      <div className="singlepost">
          <div className="header">
            <h3>{current.idea}</h3>
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
            {current.insight}
          </div>
      </div>
    )
  }

  renderArticle = () => {
    const { current } = this.props.posts;
    console.log(current)

    return (
      <div className="singlepost">
          <div className="header">
            <h3>{current.idea}</h3>
          </div>
          <div className="description">
            {current.insight}
          </div>
      </div>

    )
  }

  renderComments = () => {
    const { comments } = this.props.posts;
    let key = this.props.match.params.postID;

    return (
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
                </div>
              </div>
            )
          }
        </div>
    )

  }
  
  render() {
    const { current } = this.props.posts;
    // const pct = Math.round(singlePriceChange).toFixed(2);
    // let key = this.props.match.params.postID;

    if (current.type === "idea") {
      return (
        <div className="bgcolor">
          <Navbar />
          <Link to="/landingpage" >
            <button className="btn btn-primary back-button">
              <FontAwesomeIcon icon={faArrowLeft} /> back to main</button>
            </Link>

          {this.renderInvestment()}
          {this.renderComments()}
        </div>
      );
    } else {
        return (
          <div className="bgcolor">
            <Navbar />
            <Link to="/landingpage" >
              <button className="btn btn-primary back-button">
                <FontAwesomeIcon icon={faArrowLeft} /> back to main</button>
              </Link>

            {this.renderArticle()}
            {this.renderComments()}
          </div>
        );
    }
  };
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    user: state.auth.user,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchCurrentUser })(singlepost);