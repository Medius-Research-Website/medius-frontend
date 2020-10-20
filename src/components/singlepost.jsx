import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost, singlePriceChange, fetchCommentsByPost, addComment, fetchCurrentUser } from '../actions';
import Navbar from "./navbar";
import UserBubble from '../components/userBubble';
import { Document, Page, pdfjs } from 'react-pdf';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
            <h3>{current.insight}</h3>
            <Link to={`/users/${current.author}`}>@{current.username}</Link>
            <p>{new Date(current.createdAt).toLocaleDateString()}</p>
            <div className="ticker-post">{current.ticker}</div>
            <div className="percent">
              <div className={pct.split('')[0] === '-' ? "negative-percent" : 'positive-percent'} >
                {!isNaN(pct) ? singleCurrVal + ' (' +pct + ' ' : null}
              </div> 
              {!isNaN(pct) ? <div style={{marginLeft: 6}}>since post)</div> : null}
            </div>
            { current.sell ? ( <div className="bubble--sell">Sell</div> ) : ( <div className="bubble--buy">Buy</div> ) }
          </div>
          <div className="description">
            {current.idea}
          </div>
      </div>
    )
  }

  renderArticle = () => {
    const { current } = this.props.posts;

    return (
      <div className="singlepost">
          <div className="header">
            <h3>{current.insight}</h3>
            <Link to={`/users/${current.author}`}>@{current.username}</Link>
            <p>{new Date(current.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="description">
            {current.idea}
          </div>
      </div>

    )
  }

  renderUpload = () => {
    const { current } = this.props.posts;

    return (
      <div className="singlepost upload">
          <div className="header">
            <h3>{current.insight}</h3>
            <Link to={`/users/${current.author}`}>@{current.username}</Link>
            <p>{new Date(current.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="description">
            {current.idea}
          </div>
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            <PDFRender file={current.file} />
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
                  <div className="comments__row">
                    <Link to={`/users/${comment.authorID}`} ><div className="username">{comment.author}: &nbsp;</div></Link>
                    <p>{comment.text}</p>
                  </div>
                  <p id="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</p>
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
        <div className="bgcolor invest">
          <Navbar />
          <div className="sideBar" >
            <UserBubble />
            <Link to="/landingpage" id="back">
                <button className="btn btn-primary back-button">
                <FontAwesomeIcon icon={faArrowLeft} /> back to main</button>
              </Link>
            </div>

          {this.renderInvestment()}
          {this.renderComments()}
        </div>
      );
    } else if (current.type === "article"){
        return (
          <div className="bgcolor">
            <Navbar />
            <div className="sideBar">
              <UserBubble />
              <Link to="/landingpage" id="back">
                  <button className="btn btn-primary back-button">
                  <FontAwesomeIcon icon={faArrowLeft} /> back to main</button>
              </Link>
            </div>

            {this.renderArticle()}
            {this.renderComments()}
          </div>
        );
    } else {
      return (
        <div className="bgcolor">
          <Navbar />
          <div className="sideBar">
            <UserBubble />
            <Link to="/landingpage" id="back">
                <button className="btn btn-primary back-button">
                <FontAwesomeIcon icon={faArrowLeft} /> back to main</button>
            </Link>
          </div>

          {this.renderUpload()}
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



/* Need to have this so that the PDF doesn't try to rerender everytime
 * someone wants to write a comment. This way it only re-renders when the filename
 * gets passed in for the first time. 
 */
class PDFRender extends Component{
  shouldComponentUpdate(nextProps, nextState) { 
    if (nextProps.file === this.props.file) return false;

    return true;
  }

  render () {
    return(
      <a href={this.props.file} target="_blank" rel="noopener noreferrer">
      <Document file={{ url: this.props.file }}>
          <Page size="A10" pageNumber={1} />
      </Document>
    </a>

    )
  }
}