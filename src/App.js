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
      transcript: {},
      testTranscript: {
        "1": [
          {
            "final": false,
            "last": null,
            "new": true,
            "speaker": "SPEAKER_0",
            "transcript": [
              "indicates"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": false,
            "speaker": "SPEAKER_0",
            "transcript": [
              "whether"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": false,
            "speaker": "SPEAKER_0",
            "transcript": [
              "the"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": false,
            "speaker": "SPEAKER_0",
            "transcript": [
              "service"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": false,
            "speaker": "SPEAKER_0",
            "transcript": [
              "is"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": false,
            "speaker": "SPEAKER_0",
            "transcript": [
              "to"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": false,
            "speaker": "SPEAKER_0",
            "transcript": [
              "return"
            ]
          },
          {
            "final": false,
            "last": 0,
            "new": true,
            "speaker": "SPEAKER_1",
            "transcript": [
              "interim"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "results"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": true,
            "speaker": "SPEAKER_2",
            "transcript": [
              "if"
            ]
          },
          {
            "final": false,
            "last": 2,
            "new": false,
            "speaker": "SPEAKER_2",
            "transcript": [
              "true"
            ]
          },
          {
            "final": false,
            "last": 2,
            "new": true,
            "speaker": "SPEAKER_1",
            "transcript": [
              "interim"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "results"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "are"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "returned"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "as"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "a"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "stream"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "of"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "trace"
            ]
          },
          {
            "final": false,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "on"
            ]
          },
          {
            "final": true,
            "last": 1,
            "new": false,
            "speaker": "SPEAKER_1",
            "transcript": [
              "objects"
            ]
          },
        ]
      }
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
          <Participants/>
        </div>
        <div className="section">
          <Recorder appendToTranscript={this.appendToTranscript}/>
        </div>
        <div className="section">
          <Transcript transcript={this.state.testTranscript}/>
        </div>
      </div>
    );
  }
}

export default App;
