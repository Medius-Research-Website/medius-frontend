import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost, singlePriceChange, fetchCommentsByPost, addComment } from '../actions';
import Navbar from "./navbar";

// this is the full page for a single post
class singlepost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      nextId: 1,
      comment: ''
    }
  }

  async componentDidMount() {
    await this.props.fetchPost(this.props.match.params.postID);
    await this.props.singlePriceChange(this.props.match.params.postID);
    await this.props.fetchCommentsByPost(this.props.match.params.postID);
    console.log(this.props);
  }

  handleChange = (e, comment) => {
    this.setState({ comment: e.target.value })
    // console.log(comment, 'kir', e.target.value)
  }

  createComment = (comment) => {

    console.log(comment);
    const fields = {
      text: comment,
      author: this.props.user.username,
    };
    console.log(fields);
    this.props.addComment(fields, this.props.match.params.postID);

    /* const { comments } = this.props.posts
    let key = this.props.match.params.postID;
    let data = {text: comment, author: this.props.match.params.postID};
    if (comment.length > 0) {    
      comments[key].push(data);
      this.props.addComment(comment);
      this.setState({ comment: '' })
    }
    console.log(comments[key], 'yuh', comment, 'yeo', data, 'cim', comments, 'ts', this.state, 'commmmmmmmm', comment)
    // let comments = this.state.comments.slice();
    // comments.push({ id: this.state.nextId, comment: comment});
    
    // this.setState(prevState => {
    //   return {comments: comments, nextId: prevState.nextId + 1}
    // })*/
  }
  
  render() {
    const { current, singlePriceChange, comments, singleCurrVal } = this.props.posts
    const pct = Math.round(singlePriceChange).toFixed(2);
    let key = this.props.match.params.postID;
    //console.log(this.props,'p', this.state.comments, comments[key])
    // console.log(comments,'commentsz')
    //console.log(singleCurrVal);
    //console.log(pct);
    console.log(comments)
    return (
      <div className="bgcolor">
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
                  <div className="username">{comment.author} &nbsp;</div> {/*only allow first name*/}
                  <div>{comment.text}</div>
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
  return {
    posts: state.posts,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, { fetchPost, singlePriceChange, fetchCommentsByPost, addComment })(singlepost);