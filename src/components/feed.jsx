import React, { Component } from "react";
import Post from "./post";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchPosts } from "../actions";
/* 
const testData=[
  {
    ticker:"TSN",//symbol
    industry:"Tyson",//company
    sector:"Test sector",
    insight:"tyson received a price target of$83 per share ty ispan asd jasdadk sadks asd saj ajcajs  adjakhas sadsakjhs adaskhsa dsajhdaksdjh sdasdasskd skdjasdk asds",
    idea:"Tyson remains a secure investment as the stock prize has not improved much due to ..",
    oldPrice:3
  },
  {
    ticker:"TSN",//symbol
    industry:"Tyson",//company
    sector:"Test sector",
    insight:"tyson received a price target of$83 per share ty ispan asd jasdadk sadks asd saj ajcajs  adjakhas sadsakjhs adaskhsa dsajhdaksdjh sdasdasskd skdjasdk asds",
    idea:"Tyson remains a secure investment as the stock prize has not improved much due to ..",
    oldPrice:3
  },
  {
    ticker:"TSN",//symbol
    industry:"Tyson",//company
    sector:"Test sector",
    insight:"tyson received a price target of$83 per share ty ispan asd jasdadk sadks asd saj ajcajs  adjakhas sadsakjhs adaskhsa dsajhdaksdjh sdasdasskd skdjasdk asds",
    idea:"Tyson remains a secure investment as the stock prize has not improved much due to ..",
    oldPrice:3
  }
] */
class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  // access posts through this.props.allPosts; display iteratively through .map()
  render() {
    console.log(this.props.all.length);
    if (this.props.all.length !== 0) {
      return (
        <React.Fragment>
          {this.props.all.map((post) => ( 
            <Link to={`posts/${post.id}`} style={{ textDecoration: 'none' }} key={post.id}>
              <Post post={post} />
            </Link>
          ))}
        </React.Fragment>
      );
    }
    else {
      return (
        <div>
          No posts to see yet!
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  all: state.posts.all || [],
});


export default withRouter(connect(mapStateToProps, { fetchPosts } )(Feed));
