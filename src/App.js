import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes';

class App extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
