import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'


class home extends Component {
    render() {
        return (
                <Jumbotron className="float-right">
                    <h2>Bringing <span>Wall St.</span> 
                    <br/>
                    to <span1>University Ave.</span1></h2>
                    <p>An open forum for sharing high quality investment ideas, stock picks, 
                        and research from top universities, all for free.</p>
                    <Link to="/home">
                        <Button type="button" className="btn-primary"> Get Started</Button>
                    </Link>
                </Jumbotron>
        );
    }
}

export default home;