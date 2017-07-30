import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import Recorder from './Recorder.js';

class App extends Component {

  render() {
    return (
      <div>
        <div className="hero is-primary is-bold has-text-centered">
          <div className="hero-body">
            <div className="title">
              Soprano
            </div>
            <div className="subtitle">
              Speech-to-text meeting assistant
            </div>
          </div>
        </div>
        <div className="section">
          <Recorder/>
        </div>
      </div>
    );
  }
}

export default App;
