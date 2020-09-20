import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import Comments from './comments';
import Deletecomment from './deletecomment';
import Navbar from "./navbar";

// this is the full page for a single post
class singlepost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      nextId: 1
    }
  }
  async componentDidMount() {
    await this.props.fetchPost(this.props.match.params.postID)
  }
  handleChange = e => {
    this.setState({ value: e.target.value })
  }
  addComment = comment => {
    let comments = this.state.comments.slice();
    comments.push({ id: this.state.nextId, comment: comment});
    this.setState(prevState => {
      return {comments: comments, nextId: prevState.nextId + 1}
   })
  }
  removeComment = id => {
    this.setState({
      comments: this.state.comments.filter( comment => comment.id !== id)
    });
  }
  render() {
    const { current } = this.props.posts
    return (
      <div>
        <Navbar />
        <div className="singlepost">
          <div className="graph">
            Graph goes here
          </div>
          <div className="header">
            <h3>Brief intro</h3>
            <div className="ticker-post">{current.ticker}</div>
            <div className="company">Company: Tesla{}</div>
            <div className="sector">Sector: Automotive {current.sector}</div>
            <div className="percent">
              <div className="percentage-post">+1.76 (2.80%)</div> 
              <div style={{marginLeft: 6}}>since post</div>
            </div>
          </div>
          <div className="description">
            description
          </div>
        </div>
        <div className="comment">
          <div className="addComment">
            <Comments comment="" addComment={this.addComment} />
          </div>
          <ul className="listOfComments">
            {
              this.state.comments.map( comment => 
                <li style={{marginTop:15}}>
                  <Deletecomment className comment={comment} key={comment.id} id={comment.id} removeComment={this.removeComment} />
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, { fetchPost })(singlepost);