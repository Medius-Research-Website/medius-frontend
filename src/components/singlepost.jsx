import React, { Component } from 'react';
import "./css_files/singlepost.scss";
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class singlepost extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  async componentDidMount() {
    await this.props.fetchPost(this.props.match.params.postID)
  }
  render() {
    const { current } = this.props.posts
    return (
      <div>
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
        <div className="comment">
          <input placeholder="Add a comment..."></input>
          <button>Send</button>
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