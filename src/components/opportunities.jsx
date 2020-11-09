import React, {Component} from 'react';
import "./css_files/opportunities.scss";
import { connect } from "react-redux";
import NavBar from "./navbar";
// import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class Opportunities extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
          opps: [],
        };
      }

    componentDidMount() {
        fetch('https://api.airtable.com/v0/appDQkgslPxjBj3gJ/Table%201?api_key=key6gaOeurH9KePcW')
        .then((resp) => resp.json())
        .then(data => {
          console.log(data);
          this.setState({ opps: data.records });
        }).catch(err => {
          // Error
        });
      }

    render() {  
        console.log(this.state.opps)
        return(
            <div>
                <NavBar />
                <div className="opportunities">
                    <h1>Opportunities</h1>
                    <hr />
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSe4j3oTA2z725HxCnf4cNDIDeN4D18QzhvTsc9bkvzWl4UutQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                        <Button className="btn-primary">Have opportunities to share? Click here!</Button>
                    </a>
                    <div className="cards">
                        {this.state.opps.map(opp => <OppCard {...opp.fields} key={opp.id}/> )}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {})(Opportunities);


const OppCard = ({ firm, position, description, date, deadline, paid }) => {
    console.log(firm);

    return (
        <div className="card">
        <div className="card-body">
            <h2 className="card-title">{position}</h2>
            <h3 className="card-text">{firm}</h3>
            <p className="card-text-dates">
                <small className="text-muted">Date Posted: {date}</small>
                <small className="text-muted">Deadline: {deadline}</small>
                <small className="text-muted">Paid: {paid}</small>
            </p>
            <p className="card-text-description">{description}</p>
        </div>
        </div>
    )
}