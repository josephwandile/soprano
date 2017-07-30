import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css';
import './App.css';
import Recorder from './Recorder.js';
import Participants from './Participants.js';
import Transcript from './Transcript.js';
import TranscriptMock from './TranscriptMock.js';
import 'whatwg-fetch';
import update from 'immutability-helper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcript: TranscriptMock,
      participants: {},
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/reset', {method: 'POST', credentials: 'include'});
    setTimeout(this.fetchObservation, 1000);
  }

  fetchObservation = () => {
    fetch(`http://localhost:5000/observe`, {credentials: 'include'})
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.error && resp.transcripts) {
          this.appendToTranscript(resp.id, resp.transcripts);
        }
        setTimeout(this.fetchObservation, 1000);
      });
  }

  appendToTranscript = (id, transcripts) => {
    let transcript = update(this.state.transcript, {[id]: {$set: transcripts}});
    this.setState({transcript});
  }

  addParticipantHandler = (p) => {
    this.setState({participants: {
      ...this.state.participants,
      [p.email]: p.color,
    }})
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
          <Participants
            participants={this.state.participants}
            onAddParticipant={(p) => this.addParticipantHandler(p)}
          />
        </div>
        <div className="section">
          <Recorder appendToTranscript={this.appendToTranscript}/>
        </div>
        <div className="section">
          <Transcript
            participants={this.state.participants}
            transcript={this.state.transcript}
          />
        </div>
      </div>
    );
  }
}

export default App;
