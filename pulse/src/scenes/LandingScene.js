import React, { Component } from "react";
import logo from '../heart.png';
import Button from '@material-ui/core/Button';
import {LinkContainer} from "react-router-bootstrap";


export default class Home extends Component {

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <LinkContainer to="/signup">
              <Button variant="contained" size="large" color="primary">
              Start Diagnosis
              </Button>
              </LinkContainer>
            </header>
          </div>
        );
    }
}
