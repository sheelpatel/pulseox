import React, { Component } from 'react';
import logo from './heart.png';
import Button from '@material-ui/core/Button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button variant="contained" size="large" color="#ff4400">
          Start Diagnosis
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
