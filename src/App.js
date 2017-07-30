import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import Recorder from './Recorder.js';
import Participants from './Participants.js';
import Transcript from './Transcript.js';
import 'whatwg-fetch';
import update from 'immutability-helper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: {}
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/reset', {method: 'POST', credentials: 'include'});
  }

  appendToTranscript = (id, transcripts) => {
    let transcript = update(this.state.transcript, {[id]: {$set: transcripts}});
    console.log(transcript);
    this.setState({transcript});
  }

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
          <Recorder appendToTranscript={this.appendToTranscript}/>
        </div>
        <div className="section">
          <Participants/>
        </div>
        <div className="section">
          <Transcript transcript={this.state.transcript}/>
        </div>
      </div>
    );
  }
}

export default App;
