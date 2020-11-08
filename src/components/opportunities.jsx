import React, {Component} from 'react';
import "./css_files/opportunities.scss";
import { connect } from "react-redux";
import NavBar from "./navbar";
// import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class Opportunities extends Component{

    render() {  
        return(
            <div>
                <NavBar />
                <div className="opportunities">
                    <h1>Opportunities</h1>
                    <hr />
                    <a href="https://www.googleform.com" target="_blank" rel="noopener noreferrer">
                        <Button className="btn-primary">Have opportunities to share? Click here!</Button>
                    </a>
                    <p> airtable integration tbd</p>
                </div>
            </div>
        )
    }
}

export default connect(null, {})(Opportunities);
