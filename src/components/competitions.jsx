import React, {Component} from 'react';
import "./css_files/competitions.scss";
import { connect } from "react-redux";
import NavBar from "./navbar";


class Competitions extends Component{

    render() {  
        return(
            <div>
                <NavBar />
                <div className="competitions">
                    <h1>Competitions</h1>
                    <hr />
                    <p>We are hard at work preparing research and pitch competitions, recruiting events, 
                        and speaker series to help prepare you for your dream job in the financial sector. 
                        Check back soon!
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(null, {})(Competitions);
