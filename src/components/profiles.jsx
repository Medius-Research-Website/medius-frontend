import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Profile from "./profile";
import { fetchUsers } from '../actions';
import "./css files/profiles.css";

class Profiles extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  // need to add links to each profile so we can get id; this.props.allUsers, display iteratively through .map()
  render() {
    return (
      <React.Fragment>
        <div className="suggested-box">
          <Profile />
          <Profile />
          <Profile />
          <Profile />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => (
  {
    allUsers: state.auth.all || [],
  }
);

export default withRouter(connect(mapStateToProps, { fetchUsers })(Profiles));

//   <CardDeck>
//     <Card bsPrefix="marginsCardBody">
//       <Card.Body>
//         <Card.Title bsPrefix="padding">Samuel Crombie</Card.Title>
//         <Card.Text bsPrefix="padding">
//           Student at Darmouth College
//         </Card.Text>
//       </Card.Body>
//       <Card.Footer>
//         <small className="text-muted">Last updated 3 mins ago</small>
//       </Card.Footer>
//     </Card>
//     <Card bsPrefix="marginsCardBody">
//       <Card.Body>
//         <Card.Title bsPrefix="padding">Katie Reisman</Card.Title>
//         <Card.Text bsPrefix="padding">
//           Student at Darmouth College
//         </Card.Text>
//       </Card.Body>
//       <Card.Footer>
//         <small className="text-muted">Last updated 3 mins ago</small>
//       </Card.Footer>
//     </Card>
//   </CardDeck>
