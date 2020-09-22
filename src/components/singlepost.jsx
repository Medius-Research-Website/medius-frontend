import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost, singlePriceChange } from '../actions';
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
    await this.props.singlePriceChange(this.props.match.params.postID)
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
    const { current, singlePriceChange } = this.props.posts
    const pct = (Math.round(singlePriceChange.change * 100) / 100).toFixed(2);
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
              <div className="percentage-post">
                {!isNaN(pct) ? pct + ' (-2.8%)' : null}
              </div> 
              {!isNaN(pct) ? <div style={{marginLeft: 6}}>since post</div> : null}
            </div>
          </div>
          <div className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut urna semper risus vestibulum tristique. Phasellus viverra tortor ligula. Proin condimentum nibh a ligula dapibus ullamcorper vel non ipsum. Vestibulum pretium libero non pulvinar vulputate. Mauris orci diam, lacinia vel rutrum efficitur, blandit nec mi. Proin vitae mi lorem. Donec porta condimentum massa nec tempor. Praesent rutrum lacinia massa, eu efficitur mauris vulputate ut. Fusce lacus metus, suscipit a facilisis quis, ultricies ac leo. Maecenas nibh libero, aliquam id ultricies vel, aliquam non nulla. Donec felis sapien, finibus ac eros in, suscipit dapibus velit. Pellentesque dapibus elit mauris, vel dignissim odio fermentum sit amet. Proin et turpis vitae felis rhoncus malesuada vitae vel nisl. Nulla metus velit, vestibulum in magna eu, faucibus commodo lacus. Sed neque neque, tempor ac aliquam ac, maximus a tortor. Sed sodales auctor massa non ullamcorper.
          </div>
        </div>
        <div className="comment">
          <div className="addComment">
            <Comments comment="" addComment={this.addComment} />
          </div>
          {
            this.state.comments.map( comment => 
              <div className="listOfComments" style={{marginTop:25}}>
                <Deletecomment className comment={comment} key={comment.id} id={comment.id} removeComment={this.removeComment} />
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
  };
}

export default connect(mapStateToProps, { fetchPost, singlePriceChange })(singlepost);