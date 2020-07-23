import React, { Component } from "react";
import Profile from "./profile";
import "./css files/profiles.css";

class Profiles extends Component {
  state = {};
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

export default Profiles;

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
